package com.fpt.framework.utility;

import com.fpt.framework.utility.tokenizer.VietnamesePartialAnalyzer;
import lombok.extern.log4j.Log4j2;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Log4j2
public class TokenizerUtils {
    private static final VietnamesePartialAnalyzer ANALYZER = new VietnamesePartialAnalyzer();

    public static List<String> generateTokens(String text) {
        List<String> tokens = new ArrayList<>();
        try (TokenStream ts = ANALYZER.tokenStream("field", text)) {
            CharTermAttribute termAtt = ts.addAttribute(CharTermAttribute.class);
            ts.reset();
            while (ts.incrementToken()) {
                tokens.add(termAtt.toString());
            }
            ts.end();
        } catch (IOException e) {
            log.warn("TokenizerUtils generateTokens warning: ", e);
        }
        return tokens;
    }
}
