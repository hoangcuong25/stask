package com.fpt.framework.utility.expression;

import org.springframework.expression.Expression;
import org.springframework.expression.ExpressionParser;
import org.springframework.expression.spel.standard.SpelExpressionParser;
import org.springframework.expression.spel.support.StandardEvaluationContext;
import org.springframework.context.expression.MapAccessor;
import org.springframework.expression.AccessException;
import org.springframework.expression.EvaluationContext;
import org.springframework.expression.TypedValue;
import org.springframework.util.Assert;

import java.util.Map;


public class ExpressionEvaluation {

    public static Object evaluate(Object rootContext, String expression) {
        ExpressionParser parser = new SpelExpressionParser();

        StandardEvaluationContext context = new StandardEvaluationContext();
        context.addPropertyAccessor(new MapAccessorCustom());
        context.setRootObject(rootContext);
        // Access properties of the custom object
        Expression exp = parser.parseExpression(expression);
        return exp.getValue(context);

    }

    public static Object evaluate(Object rootContext, Map<String, Object> variableMap, String expression) {
        ExpressionParser parser = new SpelExpressionParser();

        StandardEvaluationContext context = new StandardEvaluationContext();
        context.addPropertyAccessor(new MapAccessorCustom());
        if (variableMap != null && !variableMap.isEmpty()) {
            for (Map.Entry<String, Object> entry : variableMap.entrySet()) {
                context.setVariable(entry.getKey(), entry.getValue());
            }
        }
        context.setRootObject(rootContext);
        // Access properties of the custom object
        Expression exp = parser.parseExpression(expression);
        return exp.getValue(context);

    }

    /**
     * Override Map Accessor to handle return null value
     */
    public static class MapAccessorCustom extends MapAccessor {

        /**
         * @param context the evaluation context in which the access is being attempted
         * @param target  the target object upon which the property is being accessed
         * @param name    the name of the property being accessed
         * @return
         * @throws AccessException
         */
        @Override
        public TypedValue read(EvaluationContext context, Object target, String name) throws AccessException {
            Assert.state(target instanceof Map, "Target must be of type Map");
            Map<?, ?> map = (Map<?, ?>) target;
            Object value = map.get(name);
            if (value == null && !map.containsKey(name)) {
                return new TypedValue(null);
            }
            return new TypedValue(value);
        }

        /**
         * @param context the evaluation context in which the access is being attempted
         * @param target  the target object upon which the property is being accessed
         * @param name    the name of the property being accessed
         * @return
         * @throws AccessException
         */
        @Override
        public boolean canRead(EvaluationContext context, Object target, String name) throws AccessException {
            return (target instanceof Map<?, ?>);
        }
    }
}
