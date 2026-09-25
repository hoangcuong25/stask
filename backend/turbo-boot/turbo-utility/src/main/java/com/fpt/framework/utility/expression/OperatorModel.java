package com.fpt.framework.utility.expression;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public abstract class OperatorModel<T extends ExpressionOperator> {
    private T operator;
    private int priority;
    private String name;
}
