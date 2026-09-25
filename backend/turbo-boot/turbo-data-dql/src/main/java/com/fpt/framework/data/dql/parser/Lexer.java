package com.fpt.framework.data.dql.parser;

import com.fpt.framework.data.dql.exception.DqlParseException;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class Lexer {
	private final String s;
	private int i = 0;

	public Lexer(String s) {
		this.s = s;
	}

	public List<Token> lex() {
		List<Token> out = new ArrayList<>();
		while (skipWhitespace()) {
			char c = s.charAt(i);
			switch (c) {
				case '(' -> {
					out.add(new Token(TokenType.LPAREN, "("));
					i++;
				}
				case ')' -> {
					out.add(new Token(TokenType.RPAREN, ")"));
					i++;
				}
				case '[' -> {
					out.add(new Token(TokenType.LBRACK, "["));
					i++;
				}
				case ']' -> {
					out.add(new Token(TokenType.RBRACK, "]"));
					i++;
				}
				case ',' -> {
					out.add(new Token(TokenType.COMMA, ","));
					i++;
				}
				case '=' -> {
					out.add(new Token(TokenType.EQ, "="));
					i++;
				}
				case '!' -> {
					if (peek('=', 1)) {
						out.add(new Token(TokenType.NEQ, "!="));
						i += 2;
					} else throw err("Unexpected '!'");
				}
				case '>' -> {
					if (peek('=', 1)) {
						out.add(new Token(TokenType.GTE, ">="));
						i += 2;
					} else {
						out.add(new Token(TokenType.GT, ">"));
						i++;
					}
				}
				case '<' -> {
					if (peek('=', 1)) {
						out.add(new Token(TokenType.LTE, "<="));
						i += 2;
					} else {
						out.add(new Token(TokenType.LT, "<"));
						i++;
					}
				}
				case '"' -> out.add(readString());
				case '$' -> out.add(readVar());
				default -> {
					if (isDigit(c) || (c == '-' && (i + 1) < s.length() && isDigit(s.charAt(i + 1)))) {
						Token dateTok = tryReadDateLiteral();
						out.add(dateTok != null ? dateTok : readNumber());
					} else if (isIdentStart(c)) {
						out.add(readIdentOrKeyword());
					} else {
						throw err("Unexpected char: '" + c + "'");
					}
				}
			}
		}
		return out;
	}

	private boolean skipWhitespace() {
		while (i < s.length() && Character.isWhitespace(s.charAt(i))) {
			i++;
		}
		return i < s.length();
	}

	private boolean peek(char ch, int off) {
		int j = i + off;
		return j < s.length() && s.charAt(j) == ch;
	}

	private Token readString() {
		int start = ++i;
		StringBuilder sb = new StringBuilder();
		while (i < s.length()) {
			char c = s.charAt(i++);
			if (c == '"') {
				break;
			}
			if (c == '\\' && i < s.length()) {
				char n = s.charAt(i++);
				switch (n) {
					case 'n' -> sb.append('\n');
					case 't' -> sb.append('\t');
					case '"' -> sb.append('"');
					case '\\' -> sb.append('\\');
					default -> sb.append(n);
				}
			} else {
				sb.append(c);
			}
		}
		return new Token(TokenType.STRING, sb.toString());
	}

	private Token readNumber() {
		int start = i;
		do {
			i++;
		} while (i < s.length() && (isDigit(s.charAt(i)) || s.charAt(i) == '.'));
		return new Token(TokenType.NUMBER, s.substring(start, i));
	}

	private Token readIdentOrKeyword() {
		int start = i++;
		while (i < s.length() && isIdentPart(s.charAt(i))) {
			i++;
		}
		String raw = s.substring(start, i);
		String up = raw.toUpperCase(Locale.ROOT);

		return switch (up) {
			case "AND" -> new Token(TokenType.AND, up);
			case "OR" -> new Token(TokenType.OR, up);
			case "NOT" -> new Token(TokenType.NOT, up);
			case "IN" -> new Token(TokenType.IN, up);
			case "LIKE" -> new Token(TokenType.LIKE, up);
			case "CONTAINS" -> new Token(TokenType.CONTAINS, up);
			case "STARTS_WITH" -> new Token(TokenType.STARTS_WITH, up);
			case "ENDS_WITH" -> new Token(TokenType.ENDS_WITH, up);
			case "IGNORECASE" -> new Token(TokenType.IGNORECASE, up);
			case "TRUE" -> new Token(TokenType.TRUE, up);
			case "FALSE" -> new Token(TokenType.FALSE, up);
			case "NULL" -> new Token(TokenType.NULL, up);
			case "IS" -> new Token(TokenType.IS, up);
			case "EXISTS" -> new Token(TokenType.EXISTS, up);
			case "ORDER" -> new Token(TokenType.ORDER, up);
			case "BY" -> new Token(TokenType.BY, up);
			case "ASC" -> new Token(TokenType.ASC, up);
			case "DESC" -> new Token(TokenType.DESC, up);
			case "SELECT" -> new Token(TokenType.SELECT, up);
			case "DISTINCT" -> new Token(TokenType.DISTINCT, up);
			default -> new Token(TokenType.IDENT, raw);
		};
	}

	private Token readVar() {
		int st = ++i; // skip '$'
		if (st >= s.length() || !isIdentStart(s.charAt(st))) {
			throw err("Variable name expected after '$'");
		}
		do {
			i++;
		} while (i < s.length() && isIdentPart(s.charAt(i)));
		String name = s.substring(st, i);
		return new Token(TokenType.VAR, name);
	}

	private boolean isDigit(char c) {
		return c >= '0' && c <= '9';
	}

	private boolean isIdentStart(char c) {
		return Character.isLetter(c) || c == '_' || c == '$';
	}

	private boolean isIdentPart(char c) {
		return Character.isLetterOrDigit(c) || c == '_' || c == '$' || c == '.';
	}

	private Token tryReadDateLiteral() {
		// Minimum: YYYY-MM-DD = 10 chars
		if (i + 10 > s.length()) return null;
		if (!isDigits(i, 4) || s.charAt(i + 4) != '-') return null;
		if (!isDigits(i + 5, 2) || s.charAt(i + 7) != '-') return null;
		if (!isDigits(i + 8, 2)) return null;

		int dateEnd = i + 10;

		// Check for DATETIME: T followed by HH:MM
		if (dateEnd < s.length() && s.charAt(dateEnd) == 'T'
				&& dateEnd + 6 <= s.length()
				&& isDigits(dateEnd + 1, 2)
				&& s.charAt(dateEnd + 3) == ':'
				&& isDigits(dateEnd + 4, 2)) {
			int end = dateEnd + 6; // YYYY-MM-DDTHH:MM
			// Optional :SS
			if (end + 3 <= s.length() && s.charAt(end) == ':' && isDigits(end + 1, 2)) {
				end += 3;
			}
			String text = s.substring(i, end);
			i = end;
			return new Token(TokenType.DATETIME_LITERAL, text);
		}

		// DATE_LITERAL: must not be followed by an ident char to avoid ambiguity
		if (dateEnd < s.length() && isIdentPart(s.charAt(dateEnd))) return null;

		String text = s.substring(i, dateEnd);
		i = dateEnd;
		return new Token(TokenType.DATE_LITERAL, text);
	}

	private boolean isDigits(int pos, int count) {
		for (int k = pos; k < pos + count; k++) {
			if (k >= s.length() || !isDigit(s.charAt(k))) return false;
		}
		return true;
	}

	private DqlParseException err(String msg) {
		return new DqlParseException(msg, i);
	}
}
