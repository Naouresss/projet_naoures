package com.projet.backend.user;

import lombok.Getter;

@Getter
public enum UserRole {
    CLIENT_ROLE("CLIENT"),
    ADMIN_ROLE("ADMIN");

    private String permission;

    UserRole(String p) {
        this.permission = p;
    }
}
