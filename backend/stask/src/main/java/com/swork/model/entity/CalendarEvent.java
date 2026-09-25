package com.swork.model.entity;

import com.swork.model.enums.EventType;
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
@Document(collection = "calendar_events")
public class CalendarEvent {

    @Id
    private String id;

    @Field("user_id")
    private String userId;

    private String title;

    @Field("event_type")
    private EventType eventType;

    @Field("start_time")
    private Instant startTime;

    @Field("end_time")
    private Instant endTime;

    private String location;

    @Field("project_id")
    private String projectId;

    @Field("attendee_ids")
    @Builder.Default
    private List<String> attendeeIds = new ArrayList<>();

    @CreatedDate
    @Field("created_at")
    private Instant createdAt;

    @LastModifiedDate
    @Field("updated_at")
    private Instant updatedAt;
}
