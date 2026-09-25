package com.swork.model.request;

import com.swork.model.entity.ProjectDiscussion;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DiscussionCreateRequest {

    @NotBlank(message = "Project ID không được để trống")
    private String projectId;

    @NotBlank(message = "User ID không được để trống")
    private String userId;

    @NotBlank(message = "Nội dung thảo luận không được để trống")
    private String content;

    private String parentId;

    @Builder.Default
    private List<ProjectDiscussion.Attachment> attachments = new ArrayList<>();
}
