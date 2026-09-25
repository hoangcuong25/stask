package com.fpt.framework.data.fql.support.builder.criteria.impl;

import com.fpt.framework.utility.TokenizerUtils;
import com.fpt.framework.utility.expression.model.ExpressionModel;
import com.fpt.framework.utility.expression.model.ExpressionOperator;
import com.fpt.framework.utility.expression.resolver.AbstractCriteriaResolver;
import com.fpt.framework.data.fql.support.builder.criteria.CriteriaBuilder;
import com.fpt.framework.utility.expression.utility.TemplateBuilder;
import com.fpt.framework.utility.expression.ExpressionBuilder;
import com.fpt.framework.utility.expression.ExpressionBuilderConfiguration;
import com.fpt.framework.utility.expression.ExpressionNode;
import com.fpt.framework.utility.expression.OperatorModel;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.mongodb.core.query.Criteria;
import reactor.core.publisher.Mono;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Log4j2
public class CriteriaBuilderImpl extends AbstractCriteriaResolver<Criteria> implements CriteriaBuilder {

    public CriteriaBuilderImpl(TemplateBuilder templateBuilder, ExpressionBuilderConfiguration configuration) {
        super(templateBuilder, configuration);
    }


    @Override
    public Mono<Criteria> parserCriteria(String fql) {

        if (Objects.nonNull(fql) && Objects.nonNull(configuration)) {
            ExpressionNode expressionTree = ExpressionBuilder.configuration(configuration, null).build(fql);
            if (Objects.nonNull(expressionTree)) {
                return this.convertToCriteria(expressionTree);
            }
        }
        return Mono.just(new Criteria());
    }

    private Mono<Criteria> convertToCriteria(ExpressionNode tree) {
        Mono<Criteria> criteriaMono = Mono.just(new Criteria());
        Map<String, OperatorModel<ExpressionOperator>> operatorConfigMap = this.getOperatorConfig();
        if (Objects.nonNull(tree)) {
            List<ExpressionNode> child = tree.getChild();
            ExpressionNode.ElementData elementData = tree.getData();
            if (Objects.nonNull(elementData)) {
                String elementContent = elementData.getData();
                ExpressionNode.ElementData.Type elementType = elementData.getElement().getType();
                if (ExpressionNode.ElementData.Type.ELEMENT.equals(elementType)) {
                    Mono<ExpressionModel> criteriaConfigMono = this.buildCriteriaConfig(elementContent);
                    criteriaMono = criteriaConfigMono.map(
                            criteriaConfig -> {
                                String key = criteriaConfig.getKey();
                                ExpressionOperator operator = criteriaConfig.getOperator();
                                Object value = criteriaConfig.getValue();
                                ExpressionOperator.OperatorBuildFunction<Criteria> operatorBuildFunction = getCriteriaResolver(operator);
                                if (null != operatorBuildFunction) {
                                    return operatorBuildFunction.build(key, value);
                                }
                                throw new RuntimeException("Could not found Criteria Function. Add new for handle operator");
                            }
                    );

                } else if (ExpressionNode.ElementData.Type.OPERATOR.equals(elementType) && child.size() > 1) {
                    ExpressionNode leftChild = child.get(0);
                    ExpressionNode rightChild = child.get(1);
                    Mono<Criteria> leftChildCriteriaMono = convertToCriteria(leftChild);
                    Mono<Criteria> rightChildCriteriaMono = convertToCriteria(rightChild);
                    criteriaMono = Mono.zip(
                            leftChildCriteriaMono,
                            rightChildCriteriaMono
                    ).flatMap(
                            combinedValue -> {
                                Criteria leftChildCriteria = combinedValue.getT1();
                                Criteria rightChildCriteria = combinedValue.getT2();
                                String operatorValue = elementContent.trim().toUpperCase();
                                if (operatorConfigMap.containsKey(operatorValue)) {
                                    OperatorModel<ExpressionOperator> operatorConfig = operatorConfigMap.get(operatorValue);
                                    ExpressionOperator operator = operatorConfig.getOperator();
                                    return Mono.just(getCriteriaResolver(operator).build("",List.of(leftChildCriteria, rightChildCriteria)));
                                }
                                return Mono.empty();
                            }
                    );
                }
            }
        }
        return criteriaMono;
    }


    @Override
    public Map<ExpressionOperator, ExpressionOperator.OperatorBuildFunction<Criteria>> initializeResolver(){
        Map<ExpressionOperator, ExpressionOperator.OperatorBuildFunction<Criteria>> resolverMap = new ConcurrentHashMap<>();
        resolverMap.put(ExpressionOperator.IN, (key, value) -> Criteria.where(key).in((Collection<Object>) value));
        resolverMap.put(ExpressionOperator.NOT_IN, (key, value) -> Criteria.where(key).nin((Collection<Object>) value));
        resolverMap.put(ExpressionOperator.IS, (key, value) -> Criteria.where(key).is(value));
        resolverMap.put(ExpressionOperator.EQ, (key, value) -> Criteria.where(key).is(value));
        resolverMap.put(ExpressionOperator.IS_NOT, (key, value) -> Criteria.where(key).ne(value));
        resolverMap.put(ExpressionOperator.NEQ, (key, value) -> Criteria.where(key).ne(value));
        resolverMap.put(ExpressionOperator.LT, (key, value) -> Criteria.where(key).lt(value));
        resolverMap.put(ExpressionOperator.LTE, (key, value) -> Criteria.where(key).lte(value));

        resolverMap.put(ExpressionOperator.GT, (key, value) -> Criteria.where(key).gt(value));
        resolverMap.put(ExpressionOperator.GTE, (key, value) -> Criteria.where(key).gte(value));
        resolverMap.put(ExpressionOperator.REGEX, (key, value) -> {
            String pattern = URLDecoder.decode(value.toString(), StandardCharsets.UTF_8);
            String searchPattern = pattern.replaceAll("^/|/[^/]*$", "");
            searchPattern = decodeSearchPattern(searchPattern);
            
            String flag = pattern.replaceAll("\\/.+\\/\\s*", "");
            if (!flag.isBlank()) {
                return Criteria.where(key).regex(searchPattern, flag);
            }
            return Criteria.where(key).regex(searchPattern);
        });
        resolverMap.put(ExpressionOperator.MATCH, (key, value) -> {
            Criteria subCriteria = (Criteria) value;
            return Criteria.where(key).elemMatch(subCriteria);
        });
        resolverMap.put(ExpressionOperator.AND, (key, value)->{
            Collection<Criteria> childCriteria = (Collection<Criteria>) value;
            return new Criteria().andOperator(childCriteria);
        });
        resolverMap.put(ExpressionOperator.OR, (key, value)->{
            Collection<Criteria> childCriteria = (Collection<Criteria>) value;
            return new Criteria().orOperator(childCriteria);
        });
        resolverMap.put(ExpressionOperator.TEXT_MATCH, (key, value) -> {
            String valueString = String.valueOf(value);
            List<String> valueTokenizers = TokenizerUtils.generateTokens(valueString);
            List<String> searchToken = new ArrayList<>();
            if (valueTokenizers.size() == 1) {
                searchToken.addAll(valueTokenizers);
            } else if (valueTokenizers.size() > 1) {
                List<String> shingleTokens = valueTokenizers.stream().filter(token -> token.split(" ").length > 1).toList();
                searchToken.addAll(shingleTokens);
            }
            return Criteria.where(key).all(searchToken);
        });
        return resolverMap;
    }

    private String decodeSearchPattern(String searchPattern) {
        searchPattern = new String(Base64.getDecoder().decode(searchPattern.getBytes(StandardCharsets.UTF_8)));
        String regex = "(?<=^\\.\\*)(.*?)(?=\\.\\*$)"; // special character
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(searchPattern);

        if (matcher.find()) {
            String middle = matcher.group(1);
            String escapedMiddle = middle.replaceAll("([\\\\*+\\[\\](){}\\$.?\\^|])", "\\\\$1");
            return matcher.replaceFirst(Matcher.quoteReplacement(escapedMiddle));
        }
        return searchPattern;
    }
}
