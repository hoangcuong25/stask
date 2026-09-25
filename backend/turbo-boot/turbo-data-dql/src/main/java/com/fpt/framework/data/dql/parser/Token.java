package com.fpt.framework.data.dql.parser;

public class Token {
	final TokenType type;
	final String text;

	Token(TokenType t, String tx) {
		this.type = t;
		this.text = tx;
	}

	public String toString() {
		return type + "(" + text + ")";
	}
}
