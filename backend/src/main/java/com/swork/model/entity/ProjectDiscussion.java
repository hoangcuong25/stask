package com.swork.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "project_discussions")
public class ProjectDiscussion {

    @Id
    private String id;

    @Field("project_id")
    private String projectId;

    @Field("user_id")
    private String userId;

    private String content;

    @Builder.Default
    private List<Attachment> attachments = new ArrayList<>();

    @Field("parent_id")
    private String parentId;

    @CreatedDate
    @Field("created_at")
    private Instant createdAt;

    @LastModifiedDate
    @Field("updated_at")
    private Instant updatedAt;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Attachment {
        private String name;
        private String url;

        @Field("size_bytes")
        private Long sizeBytes;

        @Field("mime_type")
        private String mimeType;
    }
}
