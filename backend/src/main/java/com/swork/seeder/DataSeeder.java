package com.swork.seeder;

import com.swork.model.entity.*;
import com.swork.model.enums.*;
import com.swork.repository.*;
import com.swork.service.ProjectService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    private final UserRepository userRepository;
    private final DepartmentRepository departmentRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final WorklogRepository worklogRepository;
    private final ProjectService projectService;

    public DataSeeder(UserRepository userRepository,
                      DepartmentRepository departmentRepository,
                      ProjectRepository projectRepository,
                      TaskRepository taskRepository,
                      WorklogRepository worklogRepository,
                      ProjectService projectService) {
        this.userRepository = userRepository;
        this.departmentRepository = departmentRepository;
        this.projectRepository = projectRepository;
        this.taskRepository = taskRepository;
        this.worklogRepository = worklogRepository;
        this.projectService = projectService;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            log.info("Cơ sở dữ liệu đã có dữ liệu, bỏ qua bước khởi tạo mẫu.");
            return;
        }

        try {
            log.info(">>> Đang khởi tạo dữ liệu mẫu sWork theo đúng đặc tả tài liệu MongoDB...");

            // 1. Khởi tạo Users
            User userLan = userRepository.save(User.builder()
                    .fullName("Nguyễn Lan")
                    .shortName("NL")
                    .email("nguyenlan@swork.vn")
                    .avatarColor("#1890FF")
                    .role(Role.ADMIN)
                    .isActive(true)
                    .build());

            User userTuan = userRepository.save(User.builder()
                    .fullName("Trần Tuấn")
                    .shortName("TT")
                    .email("trantuan@swork.vn")
                    .avatarColor("#52C41A")
                    .role(Role.MEMBER)
                    .isActive(true)
                    .build());

            User userHoa = userRepository.save(User.builder()
                    .fullName("Lê Hoa")
                    .shortName("LH")
                    .email("lehoa@swork.vn")
                    .avatarColor("#FA8C16")
                    .role(Role.MEMBER)
                    .isActive(true)
                    .build());

            User userMinh = userRepository.save(User.builder()
                    .fullName("Phạm Minh")
                    .shortName("PM")
                    .email("phamminh@swork.vn")
                    .avatarColor("#722ED1")
                    .role(Role.SYSTEM_OWNER)
                    .isActive(true)
                    .build());

            // 2. Khởi tạo Departments
            Department techDept = departmentRepository.save(Department.builder()
                    .name("Khối Công nghệ")
                    .code("TECH")
                    .managerId(userLan.getId())
                    .description("Khối phát triển sản phẩm công nghệ và nghiên cứu giải pháp số")
                    .isActive(true)
                    .build());

            Department devDept = departmentRepository.save(Department.builder()
                    .name("Phòng Phát triển Phần mềm")
                    .code("DEV")
                    .parentId(techDept.getId())
                    .managerId(userTuan.getId())
                    .description("Đội ngũ kỹ sư phát triển phần mềm sWork")
                    .isActive(true)
                    .build());

            userLan.setDepartmentId(techDept.getId());
            userTuan.setDepartmentId(devDept.getId());
            userHoa.setDepartmentId(devDept.getId());
            userMinh.setDepartmentId(techDept.getId());
            userRepository.saveAll(List.of(userLan, userTuan, userHoa, userMinh));

            // 3. Khởi tạo Project (Khớp PDF page 3 & 4)
            List<Project.ProjectStage> stages = List.of(
                    Project.ProjectStage.builder().id("stage-1").name("Khảo sát & thiết kế").position(1).build(),
                    Project.ProjectStage.builder().id("stage-2").name("Phát triển (Sprint)").position(2).build(),
                    Project.ProjectStage.builder().id("stage-3").name("Kiểm thử & Đánh giá").position(3).build(),
                    Project.ProjectStage.builder().id("stage-4").name("Nghiệm thu & Bàn giao").position(4).build()
            );

            List<Project.ProjectMember> members = List.of(
                    Project.ProjectMember.builder().userId(userLan.getId()).fullName(userLan.getFullName()).shortName(userLan.getShortName()).role(ProjectRole.PROJECT_MANAGER).build(),
                    Project.ProjectMember.builder().userId(userTuan.getId()).fullName(userTuan.getFullName()).shortName(userTuan.getShortName()).role(ProjectRole.MEMBER).build(),
                    Project.ProjectMember.builder().userId(userHoa.getId()).fullName(userHoa.getFullName()).shortName(userHoa.getShortName()).role(ProjectRole.MEMBER).build()
            );

            Project.ProjectSettings settings = Project.ProjectSettings.builder()
                    .basicSettings(Project.BasicSettings.builder()
                            .accessPermission(AccessPermission.ALL_MEMBERS)
                            .managerCanAddMembers(true)
                            .enableCustomFields(true)
                            .sendEmailNotifications(true)
                            .enableGoals(true)
                            .allowCloneWorkspace(true)
                            .isClosed(false)
                            .build())
                    .systemSettings(Project.SystemSettings.builder()
                            .allowConvertType(false)
                            .isTemplate(true)
                            .pinToSidebar(true)
                            .deletePermission(DeletePermission.SYSTEM_OWNER_ONLY)
                            .ownerCanViewAll(true)
                            .build())
                    .taskAdvancedSettings(Project.TaskAdvancedSettings.builder()
                            .enableHourlyDeadline(true)
                            .taskViewScope(TaskViewScope.ALL_TASKS)
                            .requireReviewBeforeComplete(true)
                            .showSubtasksInList(true)
                            .assigneeCanEditInfo(false)
                            .taskDeletePermission(DeletePermission.CREATOR_AND_MANAGER)
                            .enableFailedStatus(false)
                            .enableBatchActions(true)
                            .enableEstimatedHours(true)
                            .enableTaskDependencies(true)
                            .build())
                    .customFieldDefinitions(List.of(
                            Project.CustomFieldDefinition.builder()
                                    .key("budget")
                                    .label("Ngân sách (VNĐ)")
                                    .type(CustomFieldType.NUMBER)
                                    .isRequired(false)
                                    .build()
                    ))
                    .build();

            Project project = projectRepository.save(Project.builder()
                    .name("Triển khai website doanh nghiệp")
                    .code("WEB")
                    .tag("Khối Công nghệ")
                    .description("Dự án xây dựng nền tảng cổng thông tin doanh nghiệp và số hóa quy trình công việc nội bộ")
                    .departmentId(techDept.getId())
                    .startDate(Instant.now().minus(15, ChronoUnit.DAYS))
                    .dueDate(Instant.now().plus(45, ChronoUnit.DAYS))
                    .stages(stages)
                    .members(members)
                    .settings(settings)
                    .createdBy(userLan.getId())
                    .build());

            // 4. Khởi tạo Tasks mẫu (Đầy đủ cấu trúc, ví dụ WEB-105 theo PDF page 5-6)
            Task.ProjectRef projRef = Task.ProjectRef.builder()
                    .id(project.getId())
                    .name(project.getName())
                    .code(project.getCode())
                    .build();

            // Task 1: DONE
            Task t1 = taskRepository.save(Task.builder()
                    .taskKey("WEB-101")
                    .title("Khảo sát yêu cầu khách hàng & Đặc tả kiến trúc")
                    .description("Gặp gỡ khách hàng, phân tích quy trình nghiệp vụ và xây dựng sơ đồ use-case")
                    .project(projRef)
                    .stageId("stage-1")
                    .status(TaskStatus.DONE)
                    .priority(TaskPriority.HIGH)
                    .isCompleted(true)
                    .creatorId(userLan.getId())
                    .assignee(Task.AssigneeRef.builder().userId(userLan.getId()).fullName(userLan.getFullName()).shortName(userLan.getShortName()).build())
                    .startDate(Instant.now().minus(14, ChronoUnit.DAYS))
                    .dueDate(Instant.now().minus(7, ChronoUnit.DAYS))
                    .estimation(Task.Estimation.builder().estimatedHours(20.0).spentHours(18.0).build())
                    .checklistSummary("3/3 checklist")
                    .checklists(List.of(
                            Task.ChecklistItem.builder().id("ck-1").title("Khảo sát nghiệp vụ").isDone(true).build(),
                            Task.ChecklistItem.builder().id("ck-2").title("Vẽ BPMN flow").isDone(true).build(),
                            Task.ChecklistItem.builder().id("ck-3").title("Ký biên bản thống nhất").isDone(true).build()
                    ))
                    .build());

            // Task 2: DONE
            Task t2 = taskRepository.save(Task.builder()
                    .taskKey("WEB-102")
                    .title("Thiết kế kiến trúc cơ sở dữ liệu MongoDB và chỉ mục")
                    .description("Xây dựng 12 collections sWork và tạo compound indexes tối ưu dưới 50ms")
                    .project(projRef)
                    .stageId("stage-1")
                    .status(TaskStatus.DONE)
                    .priority(TaskPriority.HIGH)
                    .isCompleted(true)
                    .creatorId(userLan.getId())
                    .assignee(Task.AssigneeRef.builder().userId(userTuan.getId()).fullName(userTuan.getFullName()).shortName(userTuan.getShortName()).build())
                    .startDate(Instant.now().minus(8, ChronoUnit.DAYS))
                    .dueDate(Instant.now().minus(2, ChronoUnit.DAYS))
                    .estimation(Task.Estimation.builder().estimatedHours(16.0).spentHours(15.5).build())
                    .checklistSummary("2/2 checklist")
                    .checklists(List.of(
                            Task.ChecklistItem.builder().id("ck-4").title("Viết tài liệu thiết kế CSDL").isDone(true).build(),
                            Task.ChecklistItem.builder().id("ck-5").title("Tạo script khởi tạo index").isDone(true).build()
                    ))
                    .build());

            // Task 3: DONE
            Task t3 = taskRepository.save(Task.builder()
                    .taskKey("WEB-103")
                    .title("Xây dựng khung ứng dụng Backend Spring Boot 3")
                    .description("Khởi tạo project, cấu hình Spring Data Mongo, chuẩn hóa ApiResponse, GlobalExceptionHandler")
                    .project(projRef)
                    .stageId("stage-2")
                    .status(TaskStatus.DONE)
                    .priority(TaskPriority.HIGH)
                    .isCompleted(true)
                    .creatorId(userLan.getId())
                    .assignee(Task.AssigneeRef.builder().userId(userTuan.getId()).fullName(userTuan.getFullName()).shortName(userTuan.getShortName()).build())
                    .startDate(Instant.now().minus(5, ChronoUnit.DAYS))
                    .dueDate(Instant.now().minus(1, ChronoUnit.DAYS))
                    .estimation(Task.Estimation.builder().estimatedHours(24.0).spentHours(22.0).build())
                    .checklistSummary("2/2 checklist")
                    .checklists(List.of(
                            Task.ChecklistItem.builder().id("ck-6").title("Cấu hình Spring Data").isDone(true).build(),
                            Task.ChecklistItem.builder().id("ck-7").title("Tích hợp Swagger OpenAPI").isDone(true).build()
                    ))
                    .build());

            // Task 4: IN_PROGRESS
            Task t4 = taskRepository.save(Task.builder()
                    .taskKey("WEB-104")
                    .title("Phát triển giao diện Angular (Projects Space & My Tasks)")
                    .description("Xây dựng giao diện phân hệ Không gian làm việc và Công việc cá nhân theo chuẩn FIS")
                    .project(projRef)
                    .stageId("stage-2")
                    .status(TaskStatus.IN_PROGRESS)
                    .priority(TaskPriority.URGENT)
                    .isCompleted(false)
                    .creatorId(userLan.getId())
                    .assignee(Task.AssigneeRef.builder().userId(userHoa.getId()).fullName(userHoa.getFullName()).shortName(userHoa.getShortName()).build())
                    .collaboratorIds(List.of(userTuan.getId()))
                    .followerIds(List.of(userLan.getId()))
                    .startDate(Instant.now().minus(2, ChronoUnit.DAYS))
                    .dueDate(Instant.now().plus(4, ChronoUnit.DAYS))
                    .estimation(Task.Estimation.builder().estimatedHours(32.0).spentHours(14.0).build())
                    .checklistSummary("1/3 checklist")
                    .checklists(List.of(
                            Task.ChecklistItem.builder().id("ck-8").title("Thiết kế Header & Sidebar navigation").isDone(true).build(),
                            Task.ChecklistItem.builder().id("ck-9").title("Triển khai 4 Tab My Tasks").isDone(false).build(),
                            Task.ChecklistItem.builder().id("ck-10").title("Triển khai Kanban Stages").isDone(false).build()
                    ))
                    .build());

            // Task 5: IN_PROGRESS (Khớp hoàn toàn đặc tả PDF page 5-6)
            Task t5 = taskRepository.save(Task.builder()
                    .taskKey("WEB-105")
                    .title("Tích hợp biểu mẫu liên hệ")
                    .description("Thiết kế form liên hệ khách hàng và tích hợp API gửi thông báo vào hệ thống")
                    .project(projRef)
                    .stageId("stage-2")
                    .status(TaskStatus.IN_PROGRESS)
                    .priority(TaskPriority.MEDIUM)
                    .isCompleted(false)
                    .creatorId(userLan.getId())
                    .assignee(Task.AssigneeRef.builder().userId(userLan.getId()).fullName(userLan.getFullName()).shortName(userLan.getShortName()).build())
                    .collaboratorIds(List.of(userTuan.getId()))
                    .followerIds(List.of(userHoa.getId()))
                    .startDate(Instant.now().minus(1, ChronoUnit.DAYS))
                    .dueDate(Instant.now().plus(5, ChronoUnit.DAYS))
                    .estimation(Task.Estimation.builder().estimatedHours(16.5).spentHours(12.0).build())
                    .checklistSummary("1/2 checklist")
                    .checklists(List.of(
                            Task.ChecklistItem.builder().id(UUID.randomUUID().toString()).title("Thiết kế form HTML & validation").isDone(true).build(),
                            Task.ChecklistItem.builder().id(UUID.randomUUID().toString()).title("Viết API lưu trữ thông tin liên hệ").isDone(false).build()
                    ))
                    .dependencies(Task.Dependencies.builder()
                            .blockedBy(List.of(Task.TaskDependency.builder().taskId(t2.getId()).taskKey(t2.getTaskKey()).type(DependencyType.FINISH_TO_START).build()))
                            .blocking(new ArrayList<>())
                            .build())
                    .review(Task.ReviewInfo.builder()
                            .isRequired(true)
                            .reviewerId(userLan.getId())
                            .reviewStatus(ReviewStatus.PENDING)
                            .feedback("Cần kiểm tra kỹ cơ chế chống spam bằng recaptcha")
                            .build())
                    .build());

            // Task 6: TODO
            Task t6 = taskRepository.save(Task.builder()
                    .taskKey("WEB-106")
                    .title("Kiểm thử tính năng và viết Test Cases")
                    .description("Thực hiện kiểm thử chức năng phân hệ dự án và cá nhân, kiểm thử API")
                    .project(projRef)
                    .stageId("stage-3")
                    .status(TaskStatus.TODO)
                    .priority(TaskPriority.MEDIUM)
                    .isCompleted(false)
                    .creatorId(userLan.getId())
                    .assignee(Task.AssigneeRef.builder().userId(userHoa.getId()).fullName(userHoa.getFullName()).shortName(userHoa.getShortName()).build())
                    .collaboratorIds(List.of(userTuan.getId()))
                    .followerIds(List.of(userLan.getId()))
                    .startDate(Instant.now().plus(5, ChronoUnit.DAYS))
                    .dueDate(Instant.now().plus(12, ChronoUnit.DAYS))
                    .estimation(Task.Estimation.builder().estimatedHours(20.0).spentHours(0.0).build())
                    .checklistSummary("0/2 checklist")
                    .checklists(List.of(
                            Task.ChecklistItem.builder().id(UUID.randomUUID().toString()).title("Viết test case API").isDone(false).build(),
                            Task.ChecklistItem.builder().id(UUID.randomUUID().toString()).title("Kiểm thử giao diện E2E").isDone(false).build()
                    ))
                    .build());

            // Task 7: TODO
            Task t7 = taskRepository.save(Task.builder()
                    .taskKey("WEB-107")
                    .title("Kiểm thử bảo mật và hiệu năng MongoDB")
                    .description("Đánh giá thời gian phản hồi truy vấn khi có hàng ngàn bản ghi, đảm bảo < 50ms")
                    .project(projRef)
                    .stageId("stage-3")
                    .status(TaskStatus.TODO)
                    .priority(TaskPriority.HIGH)
                    .isCompleted(false)
                    .creatorId(userLan.getId())
                    .assignee(Task.AssigneeRef.builder().userId(userTuan.getId()).fullName(userTuan.getFullName()).shortName(userTuan.getShortName()).build())
                    .startDate(Instant.now().plus(10, ChronoUnit.DAYS))
                    .dueDate(Instant.now().plus(18, ChronoUnit.DAYS))
                    .estimation(Task.Estimation.builder().estimatedHours(16.0).spentHours(0.0).build())
                    .build());

            // Task 8: TODO
            Task t8 = taskRepository.save(Task.builder()
                    .taskKey("WEB-108")
                    .title("Đóng gói Docker Compose và Bàn giao nghiệm thu")
                    .description("Cấu hình container backend, frontend, MongoDB, viết README hướng dẫn vận hành")
                    .project(projRef)
                    .stageId("stage-4")
                    .status(TaskStatus.TODO)
                    .priority(TaskPriority.MEDIUM)
                    .isCompleted(false)
                    .creatorId(userLan.getId())
                    .assignee(Task.AssigneeRef.builder().userId(userLan.getId()).fullName(userLan.getFullName()).shortName(userLan.getShortName()).build())
                    .collaboratorIds(List.of(userTuan.getId(), userHoa.getId()))
                    .startDate(Instant.now().plus(20, ChronoUnit.DAYS))
                    .dueDate(Instant.now().plus(30, ChronoUnit.DAYS))
                    .estimation(Task.Estimation.builder().estimatedHours(12.0).spentHours(0.0).build())
                    .build());

            // 5. Khởi tạo Worklogs mẫu
            worklogRepository.save(Worklog.builder()
                    .taskId(t5.getId())
                    .projectId(project.getId())
                    .userId(userLan.getId())
                    .durationMinutes(180) // 3 tiếng khớp PDF p7
                    .workDate(Instant.now().minus(1, ChronoUnit.DAYS))
                    .note("Thiết kế khung giao diện biểu mẫu và tích hợp validation")
                    .build());

            worklogRepository.save(Worklog.builder()
                    .taskId(t5.getId())
                    .projectId(project.getId())
                    .userId(userLan.getId())
                    .durationMinutes(540) // 9 tiếng nữa = tổng 12.0 giờ
                    .workDate(Instant.now())
                    .note("Tích hợp API và xử lý thông báo phản hồi")
                    .build());

            // 6. Tính toán lại tiến độ tổng thể của dự án
            projectService.updateProjectStats(project.getId());

            log.info(">>> Khởi tạo dữ liệu mẫu sWork thành công!");
        } catch (Exception e) {
            log.warn("Lỗi khi nạp dữ liệu mẫu ban đầu: {}", e.getMessage());
        }
    }
}
