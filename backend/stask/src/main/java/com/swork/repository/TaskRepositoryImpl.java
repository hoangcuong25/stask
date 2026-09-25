package com.swork.repository;

import com.swork.common.PageResponse;
import com.swork.model.entity.Project;
import com.swork.model.entity.Task;
import com.swork.model.enums.TaskStatus;
import com.swork.model.request.TaskFilterRequest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.ReactiveMongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@Repository
public class TaskRepositoryImpl implements TaskRepositoryCustom {

    private final ReactiveMongoTemplate mongoTemplate;

    public TaskRepositoryImpl(ReactiveMongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Mono<PageResponse<Task>> findTasksWithFilter(TaskFilterRequest filter) {
        List<Criteria> criteriaList = new ArrayList<>();

        // 1. Phân hệ My Tasks theo 4 tab đặc tả sWork
        if (filter.getTab() != null && StringUtils.hasText(filter.getUserId())) {
            switch (filter.getTab()) {
                case ASSIGNED -> criteriaList.add(Criteria.where("assignee.user_id").is(filter.getUserId()));
                case COLLABORATING -> criteriaList.add(Criteria.where("collaborator_ids").is(filter.getUserId()));
                case CREATED -> criteriaList.add(Criteria.where("creator_id").is(filter.getUserId()));
                case FOLLOWING -> criteriaList.add(Criteria.where("follower_ids").is(filter.getUserId()));
            }
        }

        // 2. Dự án & Giai đoạn
        if (StringUtils.hasText(filter.getProjectId())) {
            criteriaList.add(Criteria.where("project.id").is(filter.getProjectId()));
        }
        if (StringUtils.hasText(filter.getStageId())) {
            criteriaList.add(Criteria.where("stage_id").is(filter.getStageId()));
        }

        // 3. Trạng thái & Độ ưu tiên
        if (filter.getStatus() != null) {
            criteriaList.add(Criteria.where("status").is(filter.getStatus()));
        }
        if (filter.getPriority() != null) {
            criteriaList.add(Criteria.where("priority").is(filter.getPriority()));
        }

        // 4. Tìm kiếm từ khóa (Tiêu đề hoặc Mã task WEB-xxx)
        if (StringUtils.hasText(filter.getSearch())) {
            String keyword = filter.getSearch().trim();
            criteriaList.add(new Criteria().orOperator(
                    Criteria.where("title").regex(keyword, "i"),
                    Criteria.where("task_key").regex(keyword, "i")
            ));
        }

        // 5. Khoảng hạn hoàn thành (due_date)
        if (filter.getDueDateFrom() != null && filter.getDueDateTo() != null) {
            criteriaList.add(Criteria.where("due_date").gte(filter.getDueDateFrom()).lte(filter.getDueDateTo()));
        } else if (filter.getDueDateFrom() != null) {
            criteriaList.add(Criteria.where("due_date").gte(filter.getDueDateFrom()));
        } else if (filter.getDueDateTo() != null) {
            criteriaList.add(Criteria.where("due_date").lte(filter.getDueDateTo()));
        }

        Query query = new Query();
        if (!criteriaList.isEmpty()) {
            query.addCriteria(new Criteria().andOperator(criteriaList.toArray(new Criteria[0])));
        }

        int page = Math.max(0, filter.getPage());
        int size = filter.getSize() <= 0 ? 20 : filter.getSize();
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));

        Query pagedQuery = Query.of(query).with(pageRequest);

        Mono<Long> countMono = mongoTemplate.count(query, Task.class);
        Mono<List<Task>> itemsMono = mongoTemplate.find(pagedQuery, Task.class).collectList();

        return Mono.zip(countMono, itemsMono)
                .map(tuple -> PageResponse.of(tuple.getT2(), tuple.getT1(), page, size));
    }

    @Override
    public Mono<Project.ProjectStats> calculateProjectStats(String projectId) {
        Query query = new Query(Criteria.where("project.id").is(projectId));
        return mongoTemplate.find(query, Task.class)
                .collectList()
                .map(tasks -> {
                    int total = tasks.size();
                    int completed = 0;
                    int inProgress = 0;
                    int todo = 0;

                    for (Task t : tasks) {
                        if (t.getStatus() == TaskStatus.DONE) {
                            completed++;
                        } else if (t.getStatus() == TaskStatus.IN_PROGRESS || t.getStatus() == TaskStatus.IN_REVIEW) {
                            inProgress++;
                        } else if (t.getStatus() == TaskStatus.TODO) {
                            todo++;
                        }
                    }

                    double percent = total > 0 ? Math.round(((double) completed / total * 100.0) * 10.0) / 10.0 : 0.0;

                    return Project.ProjectStats.builder()
                            .totalTasks(total)
                            .completedTasks(completed)
                            .inProgressTasks(inProgress)
                            .todoTasks(todo)
                            .progressPercent(percent)
                            .build();
                });
    }
}
