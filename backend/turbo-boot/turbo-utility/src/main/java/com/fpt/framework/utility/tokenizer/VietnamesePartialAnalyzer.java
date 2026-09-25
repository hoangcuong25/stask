package com.fpt.framework.utility.tokenizer;

import lombok.extern.log4j.Log4j2;
import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.LowerCaseFilter;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.Tokenizer;
import org.apache.lucene.analysis.miscellaneous.ASCIIFoldingFilter;
import org.apache.lucene.analysis.shingle.ShingleFilter;
import org.apache.lucene.analysis.standard.StandardTokenizer;

@Log4j2
public class VietnamesePartialAnalyzer extends Analyzer {
    @Override
    protected TokenStreamComponents createComponents(String fieldName) {
        Tokenizer source = new StandardTokenizer();
        TokenStream ts = new LowerCaseFilter(source);
        ts = new ShingleFilter(ts, 2, 2);
        ts = new ASCIIFoldingFilter(ts);
        return new TokenStreamComponents(source, ts);
    }
}
