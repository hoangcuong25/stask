export type Role = 'SYSTEM_OWNER' | 'ADMIN' | 'MEMBER';
export type ProjectRole = 'PROJECT_MANAGER' | 'MEMBER' | 'VIEWER';
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'DONE' | 'FAILED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type MyTaskTab = 'ASSIGNED' | 'COLLABORATING' | 'CREATED' | 'FOLLOWING';
export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface User {
  id: string;
  fullName: string;
  shortName: string;
  email: string;
  avatarColor: string;
  avatarUrl?: string;
  role: Role;
  departmentId?: string;
  isActive: boolean;
}

export interface Department {
  id: string;
  name: string;
  code: string;
  parentId?: string;
  managerId?: string;
  description?: string;
  isActive: boolean;
}

export interface ProjectStage {
  id: string;
  name: string;
  position: number;
}

export interface ProjectMember {
  userId: string;
  fullName: string;
  shortName: string;
  role: ProjectRole;
}

export interface ProjectStats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  todoTasks: number;
  progressPercent: number;
}

export interface ProjectBasicSettings {
  accessPermission: 'MANAGER_ONLY' | 'ALL_MEMBERS';
  managerCanAddMembers: boolean;
  enableCustomFields: boolean;
  sendEmailNotifications: boolean;
  enableGoals: boolean;
  allowCloneWorkspace: boolean;
  isClosed: boolean;
}

export interface ProjectSystemSettings {
  allowConvertType: boolean;
  isTemplate: boolean;
  pinToSidebar: boolean;
  deletePermission: string;
  ownerCanViewAll: boolean;
}

export interface ProjectTaskAdvancedSettings {
  enableHourlyDeadline: boolean;
  taskViewScope: string;
  requireReviewBeforeComplete: boolean;
  reviewByStages?: { enabled: boolean; stageIds: string[] };
  showSubtasksInList: boolean;
  assigneeCanEditInfo: boolean;
  taskDeletePermission: string;
  enableFailedStatus: boolean;
  enableBatchActions: boolean;
  enableEstimatedHours: boolean;
  enableTaskDependencies: boolean;
}

export interface CustomFieldDefinition {
  key: string;
  label: string;
  type: 'TEXT' | 'NUMBER' | 'DATE' | 'SELECT';
  isRequired: boolean;
}

export interface ProjectSettings {
  basicSettings: ProjectBasicSettings;
  systemSettings: ProjectSystemSettings;
  taskAdvancedSettings: ProjectTaskAdvancedSettings;
  customFieldDefinitions: CustomFieldDefinition[];
}

export interface Project {
  id: string;
  name: string;
  code: string;
  tag?: string;
  description?: string;
  departmentId?: string;
  startDate?: string;
  dueDate?: string;
  stats: ProjectStats;
  members: ProjectMember[];
  stages: ProjectStage[];
  settings: ProjectSettings;
  createdBy?: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  isDone: boolean;
}

export interface Estimation {
  estimatedHours: number;
  spentHours: number;
}

export interface TaskDependency {
  taskId: string;
  taskKey: string;
  type: string;
}

export interface Dependencies {
  blockedBy: TaskDependency[];
  blocking: TaskDependency[];
}

export interface ReviewInfo {
  isRequired: boolean;
  reviewerId?: string;
  reviewStatus: ReviewStatus;
  feedback?: string;
}

export interface Task {
  id: string;
  taskKey: string;
  title: string;
  description?: string;
  project: {
    id: string;
    name: string;
    code: string;
  };
  stageId: string;
  parentId?: string;
  status: TaskStatus;
  priority: TaskPriority;
  isCompleted: boolean;
  creatorId?: string;
  assignee?: {
    userId: string;
    fullName: string;
    shortName: string;
    avatarColor?: string;
  };
  collaboratorIds: string[];
  followerIds: string[];
  checklists: ChecklistItem[];
  checklistSummary?: string;
  startDate?: string;
  dueDate?: string;
  estimation: Estimation;
  dependencies: Dependencies;
  review: ReviewInfo;
  customFieldValues?: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export interface Worklog {
  id: string;
  taskId: string;
  projectId?: string;
  userId: string;
  durationMinutes: number;
  workDate: string;
  note?: string;
  createdAt?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  timestamp: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  isLast: boolean;
}
