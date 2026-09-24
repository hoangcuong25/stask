// MongoDB Initialization Script for sWork
// Creates collections and required performance indexes (< 50ms query time)

const dbName = 'swork_db';
const sworkDb = db.getSiblingDB(dbName);

print('>>> Initializing sWork Collections and Indexes on database: ' + dbName);

// 1. tasks
sworkDb.createCollection('tasks');
sworkDb.tasks.createIndex({ "task_key": 1 }, { unique: true });
sworkDb.tasks.createIndex({ "project.id": 1, "stage_id": 1, "status": 1 });
sworkDb.tasks.createIndex({ "assignee.user_id": 1, "status": 1 }); // Tab Tôi thực hiện
sworkDb.tasks.createIndex({ "collaborator_ids": 1 }); // Tab Tôi phối hợp
sworkDb.tasks.createIndex({ "creator_id": 1 }); // Tab Tôi giao
sworkDb.tasks.createIndex({ "follower_ids": 1 }); // Tab Tôi theo dõi
sworkDb.tasks.createIndex({ "due_date": 1 });
sworkDb.tasks.createIndex({ "title": "text", "task_key": "text" }); // Tìm kiếm toàn cục

// 2. projects
sworkDb.createCollection('projects');
sworkDb.projects.createIndex({ "code": 1 }, { unique: true });
sworkDb.projects.createIndex({ "members.user_id": 1 });
sworkDb.projects.createIndex({ "department_id": 1 });

// 3. worklogs
sworkDb.createCollection('worklogs');
sworkDb.worklogs.createIndex({ "user_id": 1, "work_date": -1 });
sworkDb.worklogs.createIndex({ "project_id": 1, "work_date": -1 });

// 4. departments
sworkDb.createCollection('departments');
sworkDb.departments.createIndex({ "code": 1 }, { unique: true });
sworkDb.departments.createIndex({ "parent_id": 1 });

// 5. users
sworkDb.createCollection('users');
sworkDb.users.createIndex({ "email": 1 }, { unique: true });
sworkDb.users.createIndex({ "department_id": 1 });

// 6. project_discussions & project_documents
sworkDb.createCollection('project_discussions');
sworkDb.project_discussions.createIndex({ "project_id": 1, "created_at": -1 });

sworkDb.createCollection('project_documents');
sworkDb.project_documents.createIndex({ "project_id": 1, "uploaded_at": -1 });

// 7. project_goals
sworkDb.createCollection('project_goals');
sworkDb.project_goals.createIndex({ "project_id": 1 });

// 8. activity_logs
sworkDb.createCollection('activity_logs');
sworkDb.activity_logs.createIndex({ "target_id": 1, "created_at": -1 });

// 9. calendar_events, personal_plans, recurring_tasks, notifications
sworkDb.createCollection('calendar_events');
sworkDb.calendar_events.createIndex({ "user_id": 1, "start_time": 1 });

sworkDb.createCollection('personal_plans');
sworkDb.personal_plans.createIndex({ "user_id": 1, "start_date": -1 });

sworkDb.createCollection('recurring_tasks');
sworkDb.recurring_tasks.createIndex({ "is_active": 1, "next_run_at": 1 });

sworkDb.createCollection('notifications');
sworkDb.notifications.createIndex({ "user_id": 1, "is_read": 1, "created_at": -1 });

print('>>> sWork Collections and Indexes initialized successfully!');
