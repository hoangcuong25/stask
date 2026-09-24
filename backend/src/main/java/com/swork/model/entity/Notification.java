package com.swork.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "notifications")
public class Notification {

    @Id
    private String id;

    @Field("user_id")
    private String userId;

    private String title;

    private String message;

    private String type;

    private String link;

    @Field("is_read")
    @Builder.Default
    private Boolean isRead = false;

    @CreatedDate
    @Field("created_at")
    private Instant createdAt;
}
