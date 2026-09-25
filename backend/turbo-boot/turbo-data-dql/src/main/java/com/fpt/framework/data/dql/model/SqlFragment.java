package com.fpt.framework.data.dql.model;

import lombok.Getter;
import lombok.extern.log4j.Log4j2;

import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Log4j2
public class SqlFragment {
	@Getter
	private final String sql;
	private final LinkedHashMap<String, Object> params;

	public SqlFragment(String sql, Map<String, Object> params) {
		this.sql = sql;
		this.params = new LinkedHashMap<>(params);
	}

	public Map<String, Object> getParams() {
		return Collections.unmodifiableMap(params);
	}

	public String toPositionalSql() {
		StringBuilder result = new StringBuilder(sql.length());
		boolean inSingleQuote = false;
		boolean inDoubleQuote = false;
		int i = 0;

		while (i < sql.length()) {
			char c = sql.charAt(i);

			if (c == '\'' && !inDoubleQuote) {
				inSingleQuote = !inSingleQuote;
				result.append(c);
				i++;
			} else if (c == '"' && !inSingleQuote) {
				inDoubleQuote = !inDoubleQuote;
				result.append(c);
				i++;
			} else if (c == ':' && !inSingleQuote && !inDoubleQuote && i + 1 < sql.length()) {
				char next = sql.charAt(i + 1);
				if (Character.isLetter(next) || next == '_') {
					// skip the named param name, emit '?'
					i += 2;
					while (i < sql.length() && (Character.isLetterOrDigit(sql.charAt(i)) || sql.charAt(i) == '_')) {
						i++;
					}
					result.append('?');
				} else {
					result.append(c);
					i++;
				}
			} else {
				result.append(c);
				i++;
			}
		}
		return result.toString();
	}

	public List<Object> toPositionalValues() {
		return new ArrayList<>(params.values());
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (!(o instanceof SqlFragment other)) return false;
		return Objects.equals(sql, other.sql) && Objects.equals(params, other.params);
	}

	@Override
	public int hashCode() {
		return Objects.hash(sql, params);
	}

	@Override
	public String toString() {
		return "SqlFragment{sql='" + sql + "', params=" + params + "}";
	}

	public static SqlFragment empty() {
		return new SqlFragment("1=1", new LinkedHashMap<>());
	}

	public static SqlFragment combine(List<SqlFragment> fragments, String operator) {
		if (fragments.isEmpty()) {
			return empty();
		}
		if (fragments.size() == 1) {
			return fragments.get(0);
		}
		String sql = fragments.stream()
				.map(f -> "(" + f.getSql() + ")")
				.collect(Collectors.joining(" " + operator + " "));
		LinkedHashMap<String, Object> mergedParams = new LinkedHashMap<>();
		for (SqlFragment fragment : fragments) {
			for (Map.Entry<String, Object> entry : fragment.params.entrySet()) {
				if (mergedParams.containsKey(entry.getKey())) {
					log.warn("SqlFragment.combine: param key collision '{}' — overwriting", entry.getKey());
				}
				mergedParams.put(entry.getKey(), entry.getValue());
			}
		}
		return new SqlFragment(sql, mergedParams);
	}
}
