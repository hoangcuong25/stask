package com.fpt.framework.data.dql.parser;

import com.fpt.framework.data.dql.model.FilterExpression;
import com.fpt.framework.data.dql.model.FilterNode;
import com.fpt.framework.data.dql.schema.FieldMeta;
import lombok.extern.log4j.Log4j2;

import java.util.List;
import java.util.Map;

@Log4j2
public class DqlParser {
	public static FilterExpression parse(String input, Map<String, FieldMeta> meta) {
		if (input == null || input.trim().isEmpty()) {
			log.debug("Parsing empty DQL query");
			return new FilterExpression(List.of(), meta == null ? Map.of() : meta);
		}

		List<Token> tokens = new Lexer(input).lex();
		Parser parser = new Parser(tokens);
		FilterNode root = parser.parseExpression();
		return new FilterExpression(List.of(root), meta == null ? Map.of() : meta, parser.getResultSorts(), parser.getResultProjection());
	}

	public static FilterExpression parse(String input) {
		return parse(input, Map.of());
	}
}
