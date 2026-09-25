package com.fpt.framework.security.model;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserPrincipal {
    private String uniqueName;
    private String name;
    private String token;
}
