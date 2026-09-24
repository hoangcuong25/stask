package com.swork.model.request;

import com.swork.model.entity.Project;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProjectCreateRequest {

    @NotBlank(message = "Tên dự án không được để trống")
    private String name;

    @NotBlank(message = "Mã dự án (code) không được để trống")
    private String code;

    private String tag;

    private String description;

    private String departmentId;

    private Instant startDate;

    private Instant dueDate;

    @Builder.Default
    private List<Project.ProjectMember> members = new ArrayList<>();

    @Builder.Default
    private List<Project.ProjectStage> stages = new ArrayList<>();

    private Project.ProjectSettings settings;

    private String createdBy;
}
