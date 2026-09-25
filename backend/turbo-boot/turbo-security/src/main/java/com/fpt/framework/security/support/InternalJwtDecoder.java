package com.fpt.framework.security.support;

import com.nimbusds.jwt.JWT;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.JWTParser;
import com.nimbusds.jwt.PlainJWT;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.oauth2.jwt.BadJwtException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.MappedJwtClaimSetConverter;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import reactor.core.publisher.Mono;

import java.text.ParseException;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
public class InternalJwtDecoder implements ReactiveJwtDecoder {

    private Converter<Map<String, Object>, Map<String, Object>> claimSetConverter;


    public InternalJwtDecoder() {
        this.claimSetConverter = MappedJwtClaimSetConverter.withDefaults(Collections.emptyMap());
    }

    @Override
    public Mono<Jwt> decode(String token) throws JwtException {
        JWT jwt;
        try {
            jwt = JWTParser.parse(token);
        } catch (ParseException e) {
            throw new BadJwtException("Cloud not parser token", e);
        }
        if (jwt instanceof PlainJWT) {
            throw new BadJwtException("Unsupported algorithm of " + jwt.getHeader().getAlgorithm());
        } else {
            return this.decode(jwt);
        }
    }

    private Mono<Jwt> decode(JWT parsedToken) {
        return Mono.just(parser(parsedToken));
    }
    public Jwt parser(JWT parsedToken) {
        try {
            return this.createJwt(parsedToken, parsedToken.getJWTClaimsSet());
        } catch (JwtException var3) {
            throw var3;
        } catch (RuntimeException var4) {
            throw new JwtException("An error occurred while attempting to decode the Jwt: " + var4.getMessage(), var4);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }

    private Jwt createJwt(JWT parsedJwt, JWTClaimsSet jwtClaimsSet) {
        try {
            Map<String, Object> headers = new LinkedHashMap(parsedJwt.getHeader().toJSONObject());
            Map<String, Object> claims = this.claimSetConverter.convert(jwtClaimsSet.getClaims());
            return Jwt.withTokenValue(parsedJwt.getParsedString()).headers((h) -> {
                h.putAll(headers);
            }).claims((c) -> {
                c.putAll(claims);
            }).build();
        } catch (Exception var5) {
            throw new BadJwtException("An error occurred while attempting to decode the Jwt: " + var5.getMessage(), var5);
        }
    }
}