package com.fpt.framework.utility.expression.model;

import com.fpt.framework.utility.expression.OperatorModel;

public class ExpressionOperatorModel extends OperatorModel<ExpressionOperator> {
    public ExpressionOperatorModel(ExpressionOperator operator, int priority, String name) {
        super(operator, priority, name);
    }
}
