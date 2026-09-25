package com.fpt.framework.utility.expression.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExpressionModel {
    private String key;
    private ExpressionOperator operator;
    private Object value;
    private List<ExpressionModel> child;
}
