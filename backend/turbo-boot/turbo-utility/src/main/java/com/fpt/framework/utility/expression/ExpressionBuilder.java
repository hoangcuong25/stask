package com.fpt.framework.utility.expression;

import jakarta.annotation.Nullable;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.Stack;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Slf4j
public class ExpressionBuilder<T extends ExpressionOperator, E> {


    private final Pattern compositeOperatorPattern;
    private final Pattern parenthesisPattern;
    private final Map<String, OperatorModel> compositeOperatorConfigMap;
    private final Map<String, T> operatorConfigMap;
    private final Map<String, ExpressionBuilderConfiguration.FunctionResolver> functionResolver;

    private final BuildNodeFunction functionBuildNode;

    private ExpressionBuilder(ExpressionBuilderConfiguration configuration, @Nullable BuildNodeFunction functionBuildNode) {
        if (null == configuration) {
            throw new RuntimeException("configuration is null. must have a configuration");
        }
        this.functionBuildNode = functionBuildNode;
        this.operatorConfigMap = configuration.getOperators();
        this.compositeOperatorConfigMap = configuration.getCompositeOperators();
        this.functionResolver = configuration.getFunctionResolver();
        String boundTemplate = this.getParenthesisRegex();
        String compositeOperatorRegex = this.buildOperatorRegex(compositeOperatorConfigMap.keySet());
        compositeOperatorPattern = this.buildPatternFromRegex(compositeOperatorRegex, "^", "");
        parenthesisPattern = this.buildPatternFromRegex(boundTemplate, "^", "");
    }

    public static ExpressionBuilder configuration(ExpressionBuilderConfiguration configuration,
                                                  BuildNodeFunction functionBuildNode) {
        return new ExpressionBuilder(configuration, functionBuildNode);
    }

    public ExpressionNode build(String expression) {
        if (null == expression) {
            throw new RuntimeException("String expression must be not null");
        }
        return this.buildExpressionTree(expression);
    }

    private ExpressionNode buildExpressionTree(String expression) {
        if (StringUtils.isBlank(expression)) {
            return null;
        }
        Stack<ExpressionNode> nodeStack = new Stack<>();
        Stack<ExpressionNode.ElementData> operatorStack = new Stack<>();
        int maxDepth = this.getParenthesisDepth(expression);
        String validParenthesisTemplate = this.buildParenthesisPattern(maxDepth);
        String elementTemplate = this.buildElementPattern(validParenthesisTemplate);
        Pattern elementPattern = this.buildPatternFromRegex(elementTemplate, "^", "");

        String tempExpression = "(%s)".formatted(expression);
        while (!tempExpression.isBlank()) {
            ExpressionNode.ElementData.ElementType elementType = null;
            Matcher matcher;
            if ((matcher = parenthesisPattern.matcher(tempExpression)).find()) {
                elementType = new ExpressionNode.ElementData.ElementType(ExpressionNode.ElementData.Type.PARENTHESIS);
            } else if ((matcher = compositeOperatorPattern.matcher(tempExpression)).find()) {
                elementType = new ExpressionNode.ElementData.ElementType(ExpressionNode.ElementData.Type.OPERATOR, matcher.group());
            } else if ((matcher = elementPattern.matcher(tempExpression)).find()) {
                elementType = new ExpressionNode.ElementData.ElementType(ExpressionNode.ElementData.Type.ELEMENT);
            }
            if (null == matcher || null == elementType) {
                break;
            }
            String data = matcher.group();
            if (Objects.nonNull(data)) {
                tempExpression = tempExpression.substring(data.length());
                if (Objects.nonNull(data)) {
                    data = data.trim();
                }
                ExpressionNode.ElementData matchObject = ExpressionNode.ElementData.builder()
                        .data(data)
                        .element(elementType)
                        .build();

                var type = matchObject.getElement().getType();

                if (ExpressionNode.ElementData.Type.PARENTHESIS.equals(type)) {
                    handleParenthesisNode(matchObject, operatorStack, nodeStack);
                } else if (ExpressionNode.ElementData.Type.OPERATOR.equals(type)) {
                    handleOperatorNode(matchObject, operatorStack, nodeStack);
                } else if (ExpressionNode.ElementData.Type.ELEMENT.equals(type)) {
                    handleElementNode(matchObject, nodeStack);
                } else {
                    break;
                }
            }
        }
        if (!nodeStack.isEmpty()) {
            return nodeStack.pop();
        }
        throw new RuntimeException("Could not convert string {} to expression".formatted(expression));
    }

    public boolean isValidExpression(String expression){
        boolean isValid = false;
        if(Objects.nonNull(expression)){
            int maxDepth = this.getParenthesisDepth(expression);
            String validParenthesisTemplate = this.buildParenthesisPattern(maxDepth);
            String elementTemplate = this.buildElementPattern(validParenthesisTemplate);
            Pattern elementPattern = this.buildPatternFromRegex(elementTemplate, "^", "");
            if(elementPattern.matcher(expression).find()){
                isValid = true;
            }
        }
        return isValid;
    }

    private static void handleElementNode(ExpressionNode.ElementData matchObject, Stack<ExpressionNode> nodeStack) {
        ExpressionNode elementNode = ExpressionNode.builder()
                .data(matchObject)
                .build();
//        E node = this.functionBuildNode.execute()
        nodeStack.push(elementNode);
    }

    private void handleOperatorNode(ExpressionNode.ElementData matchObject,
                                    Stack<ExpressionNode.ElementData> operatorStack,
                                    Stack<ExpressionNode> nodeStack) {
        String operator = matchObject.getData();
        OperatorModel operatorConfig = compositeOperatorConfigMap.get(operator);
        if (Objects.nonNull(operatorConfig)) {
            int priority = operatorConfig.getPriority();
            if (priority > 0) {
                while (
                        !operatorStack.isEmpty() &&
                                !"(".equals(operatorStack.peek().getData())
                ) {
                    ExpressionNode.ElementData previousOperator = operatorStack.peek();
                    int previousOperatorPriority = this.getOperatorPriority(previousOperator.getData());
                    if (previousOperatorPriority < priority) {
                        break;
                    }

                    ExpressionNode operatorNode = ExpressionNode.builder()
                            .data(previousOperator)
                            .build();

                    operatorStack.pop();

                    ExpressionNode rightChildNode = nodeStack.pop();
                    ExpressionNode leftChildNode = nodeStack.pop();
                    rightChildNode.setParent(operatorNode);
                    leftChildNode.setParent(operatorNode);

                    operatorNode.setChild(List.of(leftChildNode, rightChildNode));

                    nodeStack.push(operatorNode);
                }
                operatorStack.push(matchObject);
            }
        }
    }

    private static void handleParenthesisNode(ExpressionNode.ElementData matchObject,
                                              Stack<ExpressionNode.ElementData> operatorStack,
                                              Stack<ExpressionNode> nodeStack) {
        if ("(".equalsIgnoreCase(matchObject.getData())) {
            operatorStack.push(matchObject);
        } else if (")".equalsIgnoreCase(matchObject.getData())) {
            while (
                    !operatorStack.isEmpty() &&
                            !"(".equals(operatorStack.peek().getData())
            ) {
                ExpressionNode.ElementData operator = operatorStack.pop();
                ExpressionNode operatorNode = ExpressionNode.builder()
                        .data(operator)
                        .build();

                ExpressionNode rightChild = nodeStack.pop();
                rightChild.setParent(operatorNode);

                ExpressionNode leftChild = nodeStack.pop();
                leftChild.setParent(operatorNode);

                operatorNode.setChild(List.of(leftChild, rightChild));
                nodeStack.push(operatorNode);
            }
            operatorStack.pop();
        }
    }


    private int getOperatorPriority(String operator) {
        int priority = -1;
        if (Objects.nonNull(operator) && Objects.nonNull(compositeOperatorConfigMap)) {
            OperatorModel operatorConfig = compositeOperatorConfigMap.get(operator);
            if (Objects.nonNull(operatorConfig)) {
                priority = operatorConfig.getPriority();
            }
        }
        return priority;
    }

    private Pattern buildPatternFromRegex(String template, String prefix, String postfix) {
        Pattern pattern = null;
        if (Objects.nonNull(template)) {
            String prefixTemplate = prefix;
            String postfixTemplate = postfix;
            if (Objects.isNull(prefixTemplate)) {
                prefixTemplate = "";
            }
            if (Objects.isNull(postfixTemplate)) {
                postfixTemplate = "";
            }
            String formattedTemplate = prefixTemplate + template + postfixTemplate;

            pattern = Pattern.compile(formattedTemplate);
        }
        return pattern;
    }

    private String getParenthesisRegex() {
        String template = "(\\s*[\\(\\)]\\s*)";
        return template;
    }

    private String buildOperatorRegex(Set<String> operators) {
        String template = "";
        if (Objects.nonNull(operators)) {
            template = "(\\s*(%s)\\s*)".formatted(String.join("|", operators.stream().map(this::escapeSpecialCharacter).collect(Collectors.toSet())));
        }
        return template;
    }

    private String escapeSpecialCharacter(String operator){
        String resolvedValue = operator;
        if(Objects.nonNull(operator)){
            resolvedValue = operator.replaceAll("([\\|\\*\\$\\^\\(\\)\\[\\]\\-\\.])","\\\\$1");
        }
        return resolvedValue;
    }



    private String buildElementPattern(String validParenthesisTemplate) {
        String keyTemplate = "(((\"|')?[\\w\\.-]+(\"|')?)|([\\w-]+))";
        String operandsRegex = this.buildOperandsRegex(operatorConfigMap.keySet());
        String valueNodeRegex = this.buildExpressionValueRegex(validParenthesisTemplate);
        String elementTemplate = "%s\\s+%s\\s+%s".formatted(keyTemplate, operandsRegex, valueNodeRegex);
        return elementTemplate;
    }

    private int getParenthesisDepth(String expression) {
        int depth = 0;
        if (Objects.nonNull(expression)) {
            depth = expression.split("\\(").length + 1;
        }
        return depth;
    }

    private String buildParenthesisPattern(int level) {
        if (level < 2) {
            return "\\([^()]*\\)";
        } else {
            return "\\(([^()]*|%s)*\\)".formatted(buildParenthesisPattern(level - 1));
        }
    }

    private String buildOperandsRegex(Set<String> operators) {
        String template = "";
        if (Objects.nonNull(operators) && !operators.isEmpty()) {
            String valueOperands = String.join("|",
                    operators.stream().map(op -> op.trim().replaceAll("\\s+", "\\\\s+")).toList());
            template = "(%s)"
                    .formatted(valueOperands);
        }
        return template;
    }

    private String buildFunctionRegex(Set<String> functions, String validParenthesisTemplate) {
        String functionTemplate = "";
        if (Objects.nonNull(validParenthesisTemplate) && Objects.nonNull(functions) && !functions.isEmpty()) {

            functionTemplate = "(%s)\\s*%s".formatted(String.join("|", functions), validParenthesisTemplate);
        }
        return functionTemplate;
    }

    private String buildExpressionValueRegex(String validParenthesisTemplate) {
        List<String> templates = this.buildValueNodeDataRegex(validParenthesisTemplate);
        String valueTemplate = "(%s)".formatted(String.join("|", templates));
        return valueTemplate;
    }

    private List<String> buildValueNodeDataRegex(String validParenthesisTemplate) {
        List<String> templates = new ArrayList<>();
        String functionTemplate = this.buildFunctionRegex(this.functionResolver.keySet(), validParenthesisTemplate);
        String dateTimeTemplate = "(\\d{4}[\\/-]\\d{2}[\\/-]\\d{2}\\s+\\d{2}:\\d{2}:\\d{2})";
        String dateTemplate = "(\\d{4}[\\/-]\\d{2}[\\/-]\\d{2})";
        String timeTemplate = "(\\d{2}:\\d{2}:\\d{2})";
        String patternValueTemplate = "(\\/[^\\/]+\\/\\w*)";
        String realNumberValueTemplate = "(-?\\d*\\.\\d+)";
        String numberValueTemplate = "(-?\\d+)";
        String textValueTemplate = "(((\"|')[^\\\"']+(\"|'))|([^\\s\\)]+))";
        templates.add(validParenthesisTemplate);
        templates.add(functionTemplate);
        templates.add(dateTimeTemplate);
        templates.add(dateTemplate);
        templates.add(dateTemplate);
        templates.add(timeTemplate);
        templates.add(patternValueTemplate);
        templates.add(realNumberValueTemplate);
        templates.add(numberValueTemplate);
        templates.add(textValueTemplate);
        return templates;
    }

    @FunctionalInterface
    private interface BuildNodeFunction<E> {
        E execute(Object left, String operator, Object right);
    }
}
