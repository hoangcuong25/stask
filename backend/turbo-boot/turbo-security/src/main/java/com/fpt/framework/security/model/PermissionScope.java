package com.fpt.framework.security.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PermissionScope {

    public static final String SCOPE_DATA_OWN = "own";
    public static final String SCOPE_DATA_ALL = "*";
    public static final String SCOPE_DATA_NULL = "null";
    public static final String PERMIT_ALLOW = "allow";
    public static final String PERMIT_DENY = "deny";


    private String target;

    private String permit = PERMIT_ALLOW;

    private List<Object> data;

    private String scopeOperator;

    private List<PermissionScope> compoundScopes;

    private LocalDateTime effectFrom = LocalDateTime.of(1990, 1, 1, 0, 0);

    private LocalDateTime effectTo = LocalDateTime.of(3000, 1, 1, 0, 0);

    public boolean hasPermit() {
        return PERMIT_ALLOW.equalsIgnoreCase(this.permit) && isInEffectTime();
    }

    public boolean denyPermit() {
        return PERMIT_DENY.equalsIgnoreCase(this.permit) && isInEffectTime();
    }

    public boolean hasPermit(String target, String value) {

        return this.hasPermit() && this.target.equals(target)
                && (data.contains(SCOPE_DATA_OWN) || data.contains(SCOPE_DATA_ALL) || data.contains(value));
    }

    public boolean hasPermit(String target, String value, UserPrincipal userPrincipal) {

        return this.hasPermit() && this.target.equals(target)
                && (data.contains(SCOPE_DATA_ALL)
                    || (data.contains(SCOPE_DATA_OWN) && userPrincipal.getUniqueName().equalsIgnoreCase(value))
                    || data.contains(value)
                    || hasPermitCompoundScopes(compoundScopes, target, value, userPrincipal)
                );
    }

    public boolean hasPermitCompoundScopes(List<PermissionScope> compoundScopes, String target, String value, UserPrincipal userPrincipal) {
        if (compoundScopes == null || compoundScopes.isEmpty()) {
            return true;
        }
        for (PermissionScope cs : compoundScopes) {
            if (!PERMIT_ALLOW.equalsIgnoreCase(cs.getPermit()) || !cs.getTarget().equals(target) || cs.getData() == null || cs.getData().isEmpty()) {
                continue;
            }
            var csData = cs.getData();
            if (csData.contains(SCOPE_DATA_ALL)
                || (csData.contains(SCOPE_DATA_OWN) && userPrincipal.getUniqueName().equalsIgnoreCase(value))
                || data.contains(value)
            ) {
                return true;
            }
        }
        return false;
    }

    @JsonIgnore
    public boolean isOwner() {
        return this.hasPermit() && data.contains(SCOPE_DATA_OWN);
    }

    @JsonIgnore
    public boolean isInEffectTime() {
        LocalDateTime now = LocalDateTime.now();
        return !now.isBefore(effectFrom) && !now.isAfter(effectTo);
    }
}
