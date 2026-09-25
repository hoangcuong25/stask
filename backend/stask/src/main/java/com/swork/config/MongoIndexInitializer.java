package com.swork.config;

import com.swork.model.entity.*;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.index.TextIndexDefinition;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Flux;

@Component
public class MongoIndexInitializer {

    private static final Logger log = LoggerFactory.getLogger(MongoIndexInitializer.class);

    private final ReactiveMongoTemplate mongoTemplate;

    public MongoIndexInitializer(ReactiveMongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @PostConstruct
    public void initIndexes() {
        log.info("Khởi tạo danh mục MongoDB Indexes theo đặc tả sWork (Reactive)...");
        Flux.concat(
            // 1. tasks indexes
            mongoTemplate.indexOps(Task.class).ensureIndex(new Index().on("task_key", Sort.Direction.ASC).unique()),
            mongoTemplate.indexOps(Task.class).ensureIndex(new Index().on("project.id", Sort.Direction.ASC).on("stage_id", Sort.Direction.ASC).on("status", Sort.Direction.ASC)),
            mongoTemplate.indexOps(Task.class).ensureIndex(new Index().on("assignee.user_id", Sort.Direction.ASC).on("status", Sort.Direction.ASC)),
            mongoTemplate.indexOps(Task.class).ensureIndex(new Index().on("collaborator_ids", Sort.Direction.ASC)),
            mongoTemplate.indexOps(Task.class).ensureIndex(new Index().on("creator_id", Sort.Direction.ASC)),
            mongoTemplate.indexOps(Task.class).ensureIndex(new Index().on("follower_ids", Sort.Direction.ASC)),
            mongoTemplate.indexOps(Task.class).ensureIndex(new Index().on("due_date", Sort.Direction.ASC)),
            mongoTemplate.indexOps(Task.class).ensureIndex(TextIndexDefinition.builder().onField("title").onField("task_key").build()),
            // 2. projects indexes
            mongoTemplate.indexOps(Project.class).ensureIndex(new Index().on("code", Sort.Direction.ASC).unique()),
            mongoTemplate.indexOps(Project.class).ensureIndex(new Index().on("members.user_id", Sort.Direction.ASC)),
            mongoTemplate.indexOps(Project.class).ensureIndex(new Index().on("department_id", Sort.Direction.ASC)),
            // 3. worklogs indexes
            mongoTemplate.indexOps(Worklog.class).ensureIndex(new Index().on("user_id", Sort.Direction.ASC).on("work_date", Sort.Direction.DESC)),
            mongoTemplate.indexOps(Worklog.class).ensureIndex(new Index().on("project_id", Sort.Direction.ASC).on("work_date", Sort.Direction.DESC)),
            // 4. departments indexes
            mongoTemplate.indexOps(Department.class).ensureIndex(new Index().on("code", Sort.Direction.ASC).unique()),
            mongoTemplate.indexOps(Department.class).ensureIndex(new Index().on("parent_id", Sort.Direction.ASC)),
            // 5. project_discussions
            mongoTemplate.indexOps(ProjectDiscussion.class).ensureIndex(new Index().on("project_id", Sort.Direction.ASC).on("created_at", Sort.Direction.DESC)),
            // 6. project_documents
            mongoTemplate.indexOps(ProjectDocument.class).ensureIndex(new Index().on("project_id", Sort.Direction.ASC).on("created_at", Sort.Direction.DESC)),
            // 7. project_goals
            mongoTemplate.indexOps(ProjectGoal.class).ensureIndex(new Index().on("project_id", Sort.Direction.ASC)),
            // 8. activity_logs
            mongoTemplate.indexOps(ActivityLog.class).ensureIndex(new Index().on("target_id", Sort.Direction.ASC).on("created_at", Sort.Direction.DESC))
        )
        .doOnComplete(() -> log.info("Hoàn tất tạo chỉ mục MongoDB Indexes tối ưu hóa truy vấn <50ms (Reactive)!"))
        .doOnError(e -> log.warn("Lưu ý: Không thể tự động tạo index MongoDB khi khởi động: {}", e.getMessage()))
        .subscribe();
    }
}
