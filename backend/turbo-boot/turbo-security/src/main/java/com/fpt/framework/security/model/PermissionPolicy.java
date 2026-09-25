package com.fpt.framework.security.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class PermissionPolicy implements GrantedAuthority {

    public static final String AUTHORITY_PATTERN = "%s:%s:%s:%s:%s";

    public static final String SCOPE_DATA_JOIN = ",";
    public static final String PERMISSION_JOIN = ";";

    public static final String SCOPE_OPERATOR_AND = "and";
    public static final String SCOPE_OPERATOR_OR = "or";

    private String resource;

    private String action;

    private String scopeOperator;

    private List<PermissionScope> scopes = new ArrayList<>();

    @Override
    public String getAuthority() {
        return scopes.stream().map(s ->
                        String.format(AUTHORITY_PATTERN, s.getPermit(), this.resource, this.action,
                                s.getTarget(), s.getData().stream().map(Object::toString).collect(Collectors.joining(SCOPE_DATA_JOIN))))
                .collect(Collectors.joining(PERMISSION_JOIN));
    }

    public boolean has(String resource, String action) {
        return resource.equalsIgnoreCase(this.resource)
                && action.equalsIgnoreCase(this.action);
    }

    public boolean hasPermit(String resource, String action) {
        boolean has = this.has(resource, action);
        if (has) {
            has = this.scopes.stream().filter(s -> s.hasPermit()).count() > 0;
        }
        return has;
    }

    public boolean hasPermit(String resource, String action, String dataTarget) {
        boolean has = this.has(resource, action);
        if (has) {
            has = this.scopes.stream().filter(s -> s.hasPermit("id", dataTarget)).count() > 0;
        }
        return has;
    }
    public boolean hasPermit(String resource, String action, String targetKey, String dataTarget) {
        boolean has = this.has(resource, action);
        if (has) {
            has = this.scopes.stream().filter(s -> s.hasPermit(targetKey, dataTarget)).count() > 0;
        }
        return has;
    }
}
