package com.swork.model.enums;

public enum MyTaskTab {
    ASSIGNED,      // Tôi thực hiện (assignee.user_id = current_user)
    COLLABORATING, // Tôi phối hợp (collaborator_ids contains current_user)
    CREATED,       // Tôi giao (creator_id = current_user)
    FOLLOWING      // Tôi theo dõi (follower_ids contains current_user)
}
