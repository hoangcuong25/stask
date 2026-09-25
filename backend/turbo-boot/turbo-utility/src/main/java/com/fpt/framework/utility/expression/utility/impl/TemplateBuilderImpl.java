package com.fpt.framework.utility.expression.utility.impl;

import com.fpt.framework.utility.expression.utility.TemplateBuilder;
import com.fpt.framework.utility.expression.ExpressionOperator;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.regex.Pattern;

public class TemplateBuilderImpl implements TemplateBuilder {
    @Override
    public  String getValidParenthesisPattern(int level) {
        if (level <= 1) {
            return "\\([^()]*\\)";
        } else {
            return "\\(([^()]*|" + getValidParenthesisPattern(level - 1) + ")*\\)";
        }
    }

    @Override
    public int getParenthesisDepth(String query) {
        int depth = 0;
        if (Objects.nonNull(query)) {
            depth = query.split("\\(").length + 1;
        }
        return depth;
    }

    @Override
    public String buildOperandsTemplate(Map<String, ExpressionOperator> operands) {
        String template = "";
        if (Objects.nonNull(operands) && !operands.isEmpty()) {
            Set<String> operators = operands.keySet();
            String valueOperands = String.join("|",
                    operators.stream().map(op -> op.trim().replaceAll("\\s+", "\\\\s+")).toList());
            template = "(%s)"
                    .formatted(valueOperands);
        }
        return template;
    }


    @Override
    public Pattern buildPatternFromTemplate(String template, String prefix, String postfix) {
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

    @Override
    public String buildNestedContextElementTemplate(Set<String> functions, String validParenthesisTemplate) {
        String template = "";
        if (Objects.nonNull(functions) && Objects.nonNull(validParenthesisTemplate)) {
            String functionIndicatorTemplate = "(?<functionName>".concat(String.join("|", functions)).concat(")");
            String functionParamTemplate = "(?<functionParam>".concat(validParenthesisTemplate).concat(")");
            String functionTemplate = "(?<function>".concat(functionIndicatorTemplate).concat(functionParamTemplate).concat(")");
            String nestedContentTemplate = "(?<nested>".concat(validParenthesisTemplate).concat(")");
            template = "(".concat(nestedContentTemplate).concat("|").concat(functionTemplate).concat(")");
        }
        return template;
    }

    @Override
    public String buildPrimitiveValueTemplate() {
        String template = "";
        String dateTimeTemplate = "(?<datetime>\\d{4}-\\d{2}-\\d{2}(\\s*|T)\\d{2}:\\d{2}:\\d{2})";
        String dateTemplate = "(?<date>\\d{4}-\\d{2}-\\d{2})";
        String timeTemplate = "(?<time>\\d{2}:\\d{2}:\\d{2})";
        String numberTemplate = "(?<number>-?((\\d*\\.\\d+)|(\\d+)))";
        String booleanTemplate = "(?<boolean>true|false|True|False)";
        String textTemplate = "(?<text>([\\w-]+)|(\"((\\\\\")|[^\"])*\")|('((\\\\')|[^'])*'))";
        String regexPatternTemplate = "(?<regex>\\/(?<pattern>[^\\/]*)\\/(?<options>\\w*)?)";
        List<String> elements = new ArrayList<>();
        elements.add(dateTimeTemplate);
        elements.add(dateTemplate);
        elements.add(timeTemplate);
        elements.add(numberTemplate);
        elements.add(booleanTemplate);
        elements.add(textTemplate);
        elements.add(regexPatternTemplate);
        template = "(".concat(String.join("|", elements)).concat(")");
        return template;
    }
}
