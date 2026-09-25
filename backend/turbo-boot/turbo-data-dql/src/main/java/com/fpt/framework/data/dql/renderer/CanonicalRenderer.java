package com.fpt.framework.data.dql.renderer;

import com.fpt.framework.data.dql.exception.DqlInvalidExpressionException;
import com.fpt.framework.data.dql.exception.DqlUnsupportedOperationException;
import com.fpt.framework.data.dql.model.FilterCondition;
import com.fpt.framework.data.dql.model.FilterExpression;
import com.fpt.framework.data.dql.model.FilterGroup;
import com.fpt.framework.data.dql.model.FilterNode;
import com.fpt.framework.data.dql.model.LogicalOp;
import com.fpt.framework.data.dql.model.ValueSource;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

public final class CanonicalRenderer {

	public static String render(FilterExpression dsl) {
		if (dsl == null || dsl.getGroups() == null || dsl.getGroups().isEmpty()) {
			return "";
		}
		if (dsl.getGroups().size() == 1) {
			return renderNode(dsl.getGroups().get(0));
		}
		return dsl.getGroups().stream().map(CanonicalRenderer::renderNode).collect(Collectors.joining(" AND ", "(", ")"));
	}

	private static String renderNode(FilterNode n) {
		if (n instanceof FilterGroup g) {
			List<String> parts = g.getNodes().stream().map(CanonicalRenderer::renderNode).toList();
			String glue = g.getOp() == LogicalOp.AND ? " AND " : " OR ";
			if (parts.size() == 1) {
				return parts.get(0);
			}
			List<String> wrapped = new ArrayList<>();
			for (int i = 0; i < g.getNodes().size(); i++) {
				FilterNode child = g.getNodes().get(i);
				String s = parts.get(i);
				if (child instanceof FilterGroup) {
					if (!(s.startsWith("(") && s.endsWith(")"))) s = "(" + s + ")";
				} else {
					s = "(" + s + ")";
				}
				wrapped.add(s);
			}
			return "(" + String.join(glue, wrapped) + ")";
		}
		if (n instanceof FilterCondition c) {
			return renderCond(c);
		}
		throw new DqlInvalidExpressionException("Unknown FilterNode type: " + n.getClass().getSimpleName());
	}

	private static String renderCond(FilterCondition c) {
		String f = c.getField();
		boolean fieldRef = c.getSource() == ValueSource.FIELD_REF;
		String rhs = fieldRef ? "FIELD(" + String.valueOf(c.getValue()) + ")" : renderValue(c.getValue());
		return switch (c.getOperator()) {
			case EQ -> f + " = " + rhs;
			case NE -> f + " != " + rhs;
			case GT -> f + " > " + rhs;
			case GTE -> f + " >= " + rhs;
			case LT -> f + " < " + rhs;
			case LTE -> f + " <= " + rhs;
			case IN -> f + " IN " + renderArray(c.getValue());
			case NOT_IN -> f + " NOT IN " + renderArray(c.getValue());
			case IS_NULL -> f + " IS NULL";
			case NOT_NULL -> f + " NOT NULL";
			case EXISTS -> f + " EXISTS";
			case NOT_EXISTS -> f + " NOT EXISTS";
			case LIKE -> like(false, f, "CONTAINS", c.getValue(), c.isIgnoreCase());
			case NOT_LIKE -> like(true, f, "CONTAINS", c.getValue(), c.isIgnoreCase());
			case STARTS_WITH -> like(false, f, "STARTS_WITH", c.getValue(), c.isIgnoreCase());
			case ENDS_WITH -> like(false, f, "ENDS_WITH", c.getValue(), c.isIgnoreCase());
		};
	}

	private static String like(boolean neg, String field, String mode, Object val, boolean ic) {
		String head = (neg ? "NOT LIKE " : "LIKE ") + field + " " + mode + " ";
		String tail = renderString(String.valueOf(val));
		return ic ? head + tail + ", IGNORECASE" : head + tail;
	}

	private static String renderArray(Object v) {
		Collection<?> col;
		if (v instanceof Collection<?> c) {
			col = c;
		} else if (v == null) {
			col = List.of();
		} else {
			col = List.of(v);
		}
		return "[" + col.stream().map(CanonicalRenderer::renderValue).collect(Collectors.joining(",")) + "]";
	}

	private static String renderValue(Object v) {
		if (v == null) {
			return "NULL";
		}
		if (v instanceof String s) {
			return renderString(s);
		}
		if (v instanceof Boolean b) {
			return b ? "TRUE" : "FALSE";
		}
		if (v instanceof Number n) {
			return strip(n.toString());
		}
		if (v instanceof Collection<?> c) {
			return renderArray(c);
		}
		return renderString(String.valueOf(v));
	}

	private static String renderString(String s) {
		String esc = s.replace("\\", "\\\\").replace("\"", "\\\"");
		return "\"" + esc + "\"";
	}

	private static String strip(String num) {
		if (!num.contains(".")) {
			return num;
		}
		String x = num;
		while (x.endsWith("0")) {
			x = x.substring(0, x.length() - 1);
		}
		if (x.endsWith(".")) {
			x = x.substring(0, x.length() - 1);
		}
		return x;
	}
}
