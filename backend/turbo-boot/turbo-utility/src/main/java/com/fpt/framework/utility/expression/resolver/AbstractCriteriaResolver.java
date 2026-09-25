package com.fpt.framework.utility.expression.resolver;

import com.fpt.framework.utility.expression.model.ExpressionModel;
import com.fpt.framework.utility.expression.model.ExpressionOperator;
import com.fpt.framework.utility.expression.model.ExpressionOperatorModel;
import com.fpt.framework.utility.expression.utility.TemplateBuilder;
import com.fpt.framework.utility.expression.ExpressionBuilder;
import com.fpt.framework.utility.expression.ExpressionBuilderConfiguration;
import com.fpt.framework.utility.expression.OperatorModel;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public abstract class AbstractCriteriaResolver <T> implements CriteriaResolver<T>{

    private final DateTimeFormatter dateTimeFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
    private final DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("HH:mm:ss");
    private final DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    protected final TemplateBuilder templateBuilder;
    protected final ExpressionBuilderConfiguration configuration;

    private Map<ExpressionOperator, ExpressionOperator.OperatorBuildFunction<T>> criteriaMapResolver = new ConcurrentHashMap<>();

    public AbstractCriteriaResolver(TemplateBuilder templateBuilder, ExpressionBuilderConfiguration configuration) {
        this.templateBuilder = templateBuilder;
        this.configuration = configuration;
        criteriaMapResolver = initializeResolver();
    }

    protected abstract  Map<ExpressionOperator, ExpressionOperator.OperatorBuildFunction<T>> initializeResolver();

    protected Map<String, OperatorModel<ExpressionOperator>> getOperatorConfig() {
        Map<String, OperatorModel<ExpressionOperator>> operatorConfigMap = this.configuration.getCompositeOperators();
        if(Objects.isNull(operatorConfigMap) || operatorConfigMap.isEmpty()){
            operatorConfigMap = new HashMap<>();
            operatorConfigMap.put("AND", new ExpressionOperatorModel(ExpressionOperator.AND, 1, "AND"));
            operatorConfigMap.put("OR", new ExpressionOperatorModel(ExpressionOperator.OR, 1, "OR"));
            operatorConfigMap.put("and", new ExpressionOperatorModel(ExpressionOperator.AND, 1, "and"));
            operatorConfigMap.put("or", new ExpressionOperatorModel(ExpressionOperator.OR, 1, "or"));
            operatorConfigMap.put("&&", new ExpressionOperatorModel(ExpressionOperator.AND, 1, "and"));
            operatorConfigMap.put("||", new ExpressionOperatorModel(ExpressionOperator.OR, 1, "or"));
        }
        return operatorConfigMap;
    }

    protected Mono<ExpressionModel> buildCriteriaConfig(String expression) {
        Mono<ExpressionModel>  criteriaConfigMono = Mono.empty();
        if (Objects.nonNull(expression) && Objects.nonNull(configuration)) {
            String keyTemplate = "(\"|')?(?<key>([\\w-]+)|([\\w\\s\\.-]+))(\"|')?";
            String operandTemplate = "(?<operand>" + templateBuilder.buildOperandsTemplate(configuration.getOperators()) + ")";
            String valueTemplate = "(?<value>.*)";
            String criteriaTemplate = "^\\s*" + keyTemplate + "\\s*" + operandTemplate + "\\s*" + valueTemplate;
            Map<String, ExpressionOperator> criteriaOperatorMap = configuration.getOperators();
            Pattern pattern = Pattern.compile(criteriaTemplate, Pattern.CASE_INSENSITIVE | Pattern.MULTILINE);
            Matcher matchObject = null;

            if ((matchObject = pattern.matcher(expression)).find()) {
                String key = matchObject.group("key").trim();
                String operand = matchObject.group("operand").trim().toLowerCase();
                String valueExpression = matchObject.group("value").trim();
                ExpressionOperator operator = criteriaOperatorMap.get(operand);
                Mono<Object> valueMono = this.resolveValueExpression(valueExpression, configuration);

                criteriaConfigMono = valueMono.map(
                        value->{
                            return  ExpressionModel.builder()
                                    .key(key)
                                    .operator(operator)
                                    .value(value)
                                    .build();
                        }
                );
            }

        }
        return criteriaConfigMono;
    }

    protected Mono<Object> resolveValueExpression(String valueExpression, ExpressionBuilderConfiguration configuration) {
        Set<String> functions = configuration.getFunctionResolver().keySet();
        int maxDepth = templateBuilder.getParenthesisDepth(valueExpression);
        Mono<Object> value = Mono.empty();
        String validParenthesisTemplate = templateBuilder.getValidParenthesisPattern(maxDepth);
        String primitiveValueTemplate = templateBuilder.buildPrimitiveValueTemplate();
        String nestedValueTemplate = templateBuilder.buildNestedContextElementTemplate(functions, validParenthesisTemplate);

        Pattern primitiveValuePattern = templateBuilder.buildPatternFromTemplate(primitiveValueTemplate, "^\\s*", "\\s*$");
        Pattern nestedValuePattern = templateBuilder.buildPatternFromTemplate(nestedValueTemplate, "^\\s*", "\\s*$");

        Matcher matcher = null;
        if((matcher = primitiveValuePattern.matcher(valueExpression)).find()){
            value = resolvePrimitiveValue(valueExpression);
        }else if((matcher = nestedValuePattern.matcher(valueExpression)).find()){
            value = resolveNestedValue(valueExpression, validParenthesisTemplate, configuration);
        }
        return value;
    }


    protected Mono<Object> resolveNestedValue(String valueExpression, String validParenthesisTemplate, ExpressionBuilderConfiguration configuration) {
        return Mono.just(valueExpression)
                .flatMap(
                        expression->{
                            Set<String> functions = configuration.getFunctionResolver().keySet();
                            Map<String, ExpressionBuilderConfiguration.FunctionResolver> resolvers = configuration.getFunctionResolver();
                            String nestedValueTemplate = templateBuilder.buildNestedContextElementTemplate(functions, validParenthesisTemplate);
                            Pattern nestedValuePattern = templateBuilder.buildPatternFromTemplate(nestedValueTemplate, "^\\s*", "\\s*$");
                            Matcher matcher = nestedValuePattern.matcher(expression);

                            if (matcher.find()) {
                                if (Objects.nonNull(matcher.group("function"))) {
                                    String functionName = matcher.group("functionName").trim();
                                    String functionParameter = matcher.group("functionParam").trim();
                                    ExpressionBuilderConfiguration.FunctionResolver resolver = resolvers.get(functionName);
                                    List<Mono<Object>> params = this.resolveNestedValueParam(functionParameter,validParenthesisTemplate,configuration);
                                    Mono<List<Object>>paramsFlux = Flux.concat(params).collectList();
                                    return paramsFlux.flatMap(
                                            resolver::execute
                                    );
                                } else if (Objects.nonNull(matcher.group("nested"))) {
                                    String subExpressionValue = expression.replaceAll("(^\\s*\\()|(\\)\\s*$)","");
                                    if (ExpressionBuilder.configuration(configuration, null).isValidExpression(subExpressionValue)) {
                                        return this.parserCriteria(subExpressionValue);
                                    } else {
                                        String nestedValue = matcher.group("nested").trim();
                                        List<Mono<Object>> params = this.resolveNestedValueParam(nestedValue,validParenthesisTemplate,configuration);
                                        return Flux.concat(params).collectList();
                                    }
                                }
                            }
                            return Mono.empty();
                        }
                );
    }


    protected List<Mono<Object>> resolveNestedValueParam(String functionParameter, String validParenthesisTemplate, ExpressionBuilderConfiguration configuration) {
        Pattern validParenthesisPattern = Pattern.compile(validParenthesisTemplate);
        Matcher matcher = validParenthesisPattern.matcher(functionParameter);
        String primitiveValueTemplate = templateBuilder.buildPrimitiveValueTemplate();
        String nestedValueTemplate = templateBuilder.buildNestedContextElementTemplate(configuration.getFunctionResolver().keySet(), validParenthesisTemplate);
        String elementTemplate = "(?<element>" + nestedValueTemplate + "|" + primitiveValueTemplate + ")\\s*,?\\s*";
        Pattern elementPattern = Pattern.compile(elementTemplate);
        List<Mono<Object>>  paramsMono = new ArrayList<>();
        if (matcher.find()) {
            String params = matcher.group();
            params = params.trim().replaceAll("((^\\s*\\()|(\\s*\\)$))", "");
            Matcher paramMatcher = elementPattern.matcher(params);
            while (paramMatcher.find()) {
                String paramValue = paramMatcher.group("element");
                paramsMono.add(this.resolveValueExpression(paramValue, configuration));
            }
        }
        return paramsMono;
    }


    protected Mono<Object>  resolvePrimitiveValue(String valueExpression) {
        return Mono.just(valueExpression).map(
                expression->{
                    Object value = null;
                    String primitiveValueTemplate = templateBuilder.buildPrimitiveValueTemplate();
                    Pattern primitiveValuePattern = templateBuilder.buildPatternFromTemplate(primitiveValueTemplate, "^\\s*", "\\s*$");
                    Matcher matcher = primitiveValuePattern.matcher(expression);
                    if (matcher.find()) {
                        if (Objects.nonNull(matcher.group("datetime"))) {
                            String matchValue = matcher.group("datetime").trim();
                            LocalDateTime datetime = LocalDateTime.parse(matchValue, dateTimeFormat);
                            Instant instant = datetime.atZone(ZoneId.systemDefault()).toInstant();
                            value = instant;
                        } else if (Objects.nonNull(matcher.group("date"))) {
                            String matchValue = matcher.group("date").trim();
                            LocalDate date = LocalDate.parse(matchValue, dateFormat);
                            LocalDateTime datetime = date.atStartOfDay();
                            Instant instant = datetime.atZone(ZoneId.systemDefault()).toInstant();
                            value = instant;
                        } else if (Objects.nonNull(matcher.group("time"))) {
                            String matchValue = matcher.group("time").trim();
                            LocalTime time = LocalTime.parse(matchValue, timeFormat);
                            LocalDateTime datetime = time.atDate(LocalDate.now());
                            Instant instant = datetime.atZone(ZoneId.systemDefault()).toInstant();
                            value = instant;
                        } else if (Objects.nonNull(matcher.group("number"))) {
                            String matchValue = matcher.group("number").trim();
                            value = Double.parseDouble(matchValue);
                        } else if(Objects.nonNull(matcher.group("boolean"))){
                            String matchValue = matcher.group("boolean").trim();
                            value = Boolean.valueOf(matchValue.toLowerCase());
                        }
                        else if (Objects.nonNull(matcher.group("text"))) {
                            String matchValue = matcher.group("text").trim();
                            value = matchValue.replaceAll("(^('|\"))|(('|\")$)", "");
                        } else if (Objects.nonNull(matcher.group("regex"))) {
                            String matchValue = matcher.group("regex").trim();
                            value = Pattern.compile(matchValue);
                        }
                    }
                    return value;
                }
        );
    }

    protected ExpressionOperator.OperatorBuildFunction<T> getCriteriaResolver(ExpressionOperator operator){
        return criteriaMapResolver.get(operator);
    }
}
