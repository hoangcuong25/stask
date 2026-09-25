package com.fpt.framework.utility.expression;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExpressionNode {
    private ElementData data;
    private ExpressionNode parent;
    private List<ExpressionNode> child;

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class ElementData<E> {
        private ElementType element;
        private String data;
        private E node;

        public enum Type {
            PARENTHESIS,
            OPERATOR,
            ELEMENT;
        }
        @AllArgsConstructor
        @Data
        public static class ElementType {
            private Type type;
            private String value;

            public ElementType(Type type) {
                this.type = type;
                this.value = type.name();
            }
        }
    }
}
