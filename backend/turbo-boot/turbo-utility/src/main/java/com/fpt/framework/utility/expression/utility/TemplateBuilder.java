package com.fpt.framework.utility.expression.utility;

import com.fpt.framework.utility.expression.ExpressionOperator;

import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.regex.Pattern;

public interface TemplateBuilder {
    String getValidParenthesisPattern(int level);

    int getParenthesisDepth(String query);

    String buildOperandsTemplate(Map<String, ExpressionOperator> operands);

    Pattern buildPatternFromTemplate(String template, String prefix, String postfix);

    String buildPrimitiveValueTemplate();

    String buildNestedContextElementTemplate(Set<String> functions, String validParenthesisTemplate);
}
