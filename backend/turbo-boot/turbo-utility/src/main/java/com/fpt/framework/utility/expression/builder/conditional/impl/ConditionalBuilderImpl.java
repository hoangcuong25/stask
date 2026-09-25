package com.fpt.framework.utility.expression.builder.conditional.impl;

import com.fpt.framework.utility.TokenizerUtils;
import com.fpt.framework.utility.expression.builder.conditional.ConditionalBuilder;
import com.fpt.framework.utility.expression.model.ExpressionModel;
import com.fpt.framework.utility.expression.model.ExpressionOperator;
import com.fpt.framework.utility.expression.resolver.AbstractCriteriaResolver;
import com.fpt.framework.utility.ObjectUtility;
import com.fpt.framework.utility.expression.utility.TemplateBuilder;
import com.fpt.framework.utility.expression.ExpressionBuilder;
import com.fpt.framework.utility.expression.ExpressionBuilderConfiguration;
import com.fpt.framework.utility.expression.ExpressionNode;
import com.fpt.framework.utility.expression.OperatorModel;
import org.apache.commons.lang3.StringUtils;
import reactor.core.publisher.Mono;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.regex.Pattern;

public class ConditionalBuilderImpl extends AbstractCriteriaResolver<ExpressionModel> implements ConditionalBuilder {

    private  Map<ExpressionOperator, ConditionalBuilder.ConditionalFunction> conditionalResolverMap = new ConcurrentHashMap<>();

    public ConditionalBuilderImpl(TemplateBuilder templateBuilder, ExpressionBuilderConfiguration configuration) {
        super(templateBuilder, configuration);
        initializeConditionalResolver();
    }

    @Override
    public Mono<ExpressionModel> parserCriteria(String fql) {
        if (Objects.nonNull(fql) && Objects.nonNull(configuration)) {
            ExpressionNode expressionTree = ExpressionBuilder.configuration(configuration, null).build(fql);
            if (Objects.nonNull(expressionTree)) {
                return this.convertToCriteria(expressionTree);
            }
        }
        return Mono.just(new ExpressionModel());
    }

    @Override
    public Mono<Boolean> resolveCondition(String fql, Object data) {
        if(Objects.nonNull(fql)){
            return this.parserCriteria(fql).map(
                    conditionModel->resolveCondition(conditionModel, data)
            );
        }
        return Mono.just(true);
    }

    public Boolean resolveCondition(ExpressionModel criteria, Object value){
        Boolean isValid = false;
        if(Objects.nonNull(criteria)){
            ExpressionOperator operator = criteria.getOperator();
            String key = criteria.getKey();
            List<ExpressionModel> child = criteria.getChild();
            if(Objects.nonNull(operator) && Objects.nonNull(value) && value instanceof  Map ){
                Map<String, Object> valueMap = (Map<String, Object>) value;
                if(Objects.nonNull(child)){
                    isValid = conditionalResolverMap.get(operator).resolve(child, value);
                }
                else if(valueMap.containsKey(key)){
                    Object sourceValue = ObjectUtility.readAttributeByPath(valueMap,key);
                    Object compareValue = criteria.getValue();
                    if(sourceValue instanceof  Number){
                        sourceValue = Double.parseDouble(compareValue.toString());
                    }
                    isValid = conditionalResolverMap.get(operator).resolve(compareValue, sourceValue);
                }
            }
        }
        return isValid;
    }


    private Mono<ExpressionModel> convertToCriteria(ExpressionNode tree) {
        Mono<ExpressionModel> criteriaMono = Mono.just(new ExpressionModel());
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
                                ExpressionOperator.OperatorBuildFunction<ExpressionModel> operatorBuildFunction = getCriteriaResolver(operator);
                                if (null != operatorBuildFunction) {
                                    return operatorBuildFunction.build(key, value);
                                }
                                throw new RuntimeException("Could not found Criteria Function. Add new for handle operator");
                            }
                    );

                } else if (ExpressionNode.ElementData.Type.OPERATOR.equals(elementType) && child.size() > 1) {
                    ExpressionNode leftChild = child.get(0);
                    ExpressionNode rightChild = child.get(1);
                    Mono<ExpressionModel> leftChildCriteriaMono = convertToCriteria(leftChild);
                    Mono<ExpressionModel> rightChildCriteriaMono = convertToCriteria(rightChild);
                    criteriaMono = Mono.zip(
                            leftChildCriteriaMono,
                            rightChildCriteriaMono
                    ).flatMap(
                            combinedValue -> {
                                ExpressionModel leftChildCriteria = combinedValue.getT1();
                                ExpressionModel rightChildCriteria = combinedValue.getT2();
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
    public Map<ExpressionOperator, ExpressionOperator.OperatorBuildFunction<ExpressionModel>> initializeResolver(){
        Map<ExpressionOperator, ExpressionOperator.OperatorBuildFunction<ExpressionModel>> resolverMap = new ConcurrentHashMap<>();
        resolverMap.put(ExpressionOperator.IN, (key, value) -> ExpressionModel.builder().operator(ExpressionOperator.IN).key(key).value(value).build());
        resolverMap.put(ExpressionOperator.NOT_IN, (key, value) -> ExpressionModel.builder().operator(ExpressionOperator.NOT_IN).key(key).value(value).build());
        resolverMap.put(ExpressionOperator.IS, (key, value) -> ExpressionModel.builder().operator(ExpressionOperator.IS).key(key).value(value).build());
        resolverMap.put(ExpressionOperator.EQ, (key, value) -> ExpressionModel.builder().operator(ExpressionOperator.EQ).key(key).value(value).build());
        resolverMap.put(ExpressionOperator.IS_NOT, (key, value) -> ExpressionModel.builder().operator(ExpressionOperator.IS_NOT).key(key).value(value).build());
        resolverMap.put(ExpressionOperator.NEQ, (key, value) -> ExpressionModel.builder().operator(ExpressionOperator.NEQ).key(key).value(value).build());
        resolverMap.put(ExpressionOperator.LT, (key, value) -> ExpressionModel.builder().operator(ExpressionOperator.LT).key(key).value(value).build());
        resolverMap.put(ExpressionOperator.LTE, (key, value) -> ExpressionModel.builder().operator(ExpressionOperator.LTE).key(key).value(value).build());

        resolverMap.put(ExpressionOperator.GT, (key, value) -> ExpressionModel.builder().operator(ExpressionOperator.GT).key(key).value(value).build());
        resolverMap.put(ExpressionOperator.GTE, (key, value) -> ExpressionModel.builder().operator(ExpressionOperator.GTE).key(key).value(value).build());
        resolverMap.put(ExpressionOperator.REGEX, (key, value) -> ExpressionModel.builder().operator(ExpressionOperator.REGEX).key(key).value(value).build());
        resolverMap.put(ExpressionOperator.MATCH, (key, value) -> ExpressionModel.builder().operator(ExpressionOperator.MATCH).key(key).value(value).build());
        resolverMap.put(ExpressionOperator.TEXT_MATCH, (key, value) -> ExpressionModel.builder().operator(ExpressionOperator.TEXT_MATCH).key(key).value(value).build());
        resolverMap.put(ExpressionOperator.AND, (key, value)->{
            List<ExpressionModel> childCriteria = (List<ExpressionModel>) value;
            return ExpressionModel.builder().operator(ExpressionOperator.AND).key(key).child(childCriteria).build();
        });
        resolverMap.put(ExpressionOperator.OR, (key, value)->{
            List<ExpressionModel> childCriteria = (List<ExpressionModel>) value;
            return ExpressionModel.builder().operator(ExpressionOperator.OR).key(key).child(childCriteria).build();
        });
        return resolverMap;
    }


    public void initializeConditionalResolver() {
        conditionalResolverMap.put(ExpressionOperator.IN, (compareValue, sourceValue) ->{
            boolean isValid = true;
            if(Objects.nonNull(compareValue)){
                if(Objects.nonNull(sourceValue) && sourceValue instanceof Collection){
                    Collection<Object> values = (Collection<Object>) sourceValue;
                    return values.contains(compareValue);
                }else{
                    isValid = false;
                }
            }
            return isValid;
        });
        conditionalResolverMap.put(ExpressionOperator.NOT_IN, (compareValue, sourceValue) -> {
            boolean isValid = true;
            if(Objects.nonNull(compareValue)){
                if(Objects.nonNull(sourceValue) && sourceValue instanceof Collection){
                    Collection<Object> values = (Collection<Object>) sourceValue;
                    return !values.contains(compareValue);
                }else{
                    isValid = false;
                }
            }
            return isValid;
        });
        conditionalResolverMap.put(ExpressionOperator.IS, Object::equals);
        conditionalResolverMap.put(ExpressionOperator.EQ, Object::equals);
        conditionalResolverMap.put(ExpressionOperator.IS_NOT, (compareValue, sourceValue) -> !compareValue.equals(sourceValue) );
        conditionalResolverMap.put(ExpressionOperator.NEQ, (compareValue, sourceValue) -> !compareValue.equals(sourceValue));
        conditionalResolverMap.put(ExpressionOperator.LT, (compareValue, sourceValue) -> {
            boolean isValid = true;
            try{
                BigDecimal compareNumberValue = BigDecimal.valueOf(Long.parseLong(compareValue.toString()));
                BigDecimal sourceNumberValue = BigDecimal.valueOf(Long.parseLong(sourceValue.toString()));
                isValid = compareNumberValue.compareTo(sourceNumberValue) > 0;
            }catch(NumberFormatException e){
                isValid = false;
            }
            return isValid;
        });
        conditionalResolverMap.put(ExpressionOperator.LTE, (compareValue, sourceValue) -> {
            boolean isValid = true;
            try{
                BigDecimal compareNumberValue = BigDecimal.valueOf(Long.parseLong(compareValue.toString()));
                BigDecimal sourceNumberValue = BigDecimal.valueOf(Long.parseLong(sourceValue.toString()));
                isValid = compareNumberValue.compareTo(sourceNumberValue) >= 0;
            }catch(NumberFormatException e){
                isValid = false;
            }
            return isValid;
        });

        conditionalResolverMap.put(ExpressionOperator.GT, (compareValue, sourceValue) -> {
            boolean isValid = true;
            try{
                BigDecimal compareNumberValue = BigDecimal.valueOf(Long.parseLong(compareValue.toString()));
                BigDecimal sourceNumberValue = BigDecimal.valueOf(Long.parseLong(sourceValue.toString()));
                isValid = compareNumberValue.compareTo(sourceNumberValue) < 0;
            }catch(NumberFormatException e){
                isValid = false;
            }
            return isValid;
        });
        conditionalResolverMap.put(ExpressionOperator.GTE, (compareValue, sourceValue) ->{
            boolean isValid = true;
            try{
                BigDecimal compareNumberValue = BigDecimal.valueOf(Long.parseLong(compareValue.toString()));
                BigDecimal sourceNumberValue = BigDecimal.valueOf(Long.parseLong(sourceValue.toString()));
                isValid = compareNumberValue.compareTo(sourceNumberValue) <= 0;
            }catch(NumberFormatException e){
                isValid = false;
            }
            return isValid;
        });
        conditionalResolverMap.put(ExpressionOperator.REGEX, (compareValue, sourceValue) ->{
            Pattern pattern = Pattern.compile(compareValue.toString());
            return pattern.matcher(sourceValue.toString()).find();
        });
        conditionalResolverMap.put(ExpressionOperator.TEXT_MATCH, ((compareValue, sourceValue) -> {
            if ((compareValue != null && StringUtils.isBlank(compareValue.toString()))
                    || (sourceValue != null && StringUtils.isBlank(sourceValue.toString()))) {
                return false;
            }
            List<String> sourceValueTokenizers = TokenizerUtils.generateTokens(sourceValue.toString());
            List<String> compareValueTokenizers = TokenizerUtils.generateTokens(compareValue.toString());

            if (compareValueTokenizers.size() == 1) {
                return sourceValueTokenizers.containsAll(compareValueTokenizers);
            }

            List<String> shingleTokens = compareValueTokenizers.stream().filter(item -> item.split(" ").length > 1).toList();
            return sourceValueTokenizers.containsAll(shingleTokens);
        }));
        conditionalResolverMap.put(ExpressionOperator.MATCH, (compareValue, sourceValue) ->{
            ExpressionModel subCriteria = (ExpressionModel) compareValue;
            boolean isValid = true;
            if(Objects.nonNull(sourceValue) && sourceValue instanceof Collection<?>){
                Collection<Object> values = (Collection<Object>) sourceValue;
                isValid = !values.stream().filter(
                       value->this.resolveCondition(subCriteria, value)
                ).toList().isEmpty();
            }
            return isValid;
        });
        conditionalResolverMap.put(ExpressionOperator.AND, (compareValue, sourceValue)->{
            boolean isValid = true;
            Collection<ExpressionModel> childCriteria = (Collection<ExpressionModel>) compareValue;
            if(Objects.nonNull(childCriteria)){
                for(ExpressionModel criteria: childCriteria){
                    isValid = isValid && this.resolveCondition(criteria, sourceValue);
                    if(!isValid){
                        break;
                    }
                }
            }
            return isValid;
        });
        conditionalResolverMap.put(ExpressionOperator.OR, (compareValue, sourceValue)->{
            boolean isValid = true;
            Collection<ExpressionModel> childCriteria = (Collection<ExpressionModel>) compareValue;
            if(Objects.nonNull(childCriteria)){
                for(ExpressionModel criteria: childCriteria){
                    isValid = this.resolveCondition(criteria, sourceValue);
                    if(isValid){
                        break;
                    }
                }
            }
            return isValid;
        });
    }
}
