package com.swork.model.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "activity_logs")
@CompoundIndexes({
        @CompoundIndex(name = "target_created_idx", def = "{'target_id': 1, 'created_at': -1}")
})
public class ActivityLog {

    @Id
    private String id;

    @Field("target_id")
    private String targetId;

    @Field("user_id")
    private String userId;

    private String action;

    private Map<String, Object> details;

    @CreatedDate
    @Field("created_at")
    private Instant createdAt;
}
