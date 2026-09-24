import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { SworkService } from '@fpt-is/khaos-service';
import {
  ApiResponse,
  MyTaskTab,
  PageResponse,
  Project,
  Task,
  TaskPriority,
  TaskStatus,
  User,
  Worklog
} from '../models/swork.models';

@Injectable({
  providedIn: 'root'
})
export class SworkApiService {
  private readonly baseUrl = 'http://localhost:8080/api/v1';

  // Người dùng mặc định: Nguyễn Lan với ID thật từ MongoDB
  private readonly defaultRealUser: User = {
    id: '6ab33265464b9a6f701d8a0a',
    fullName: 'Nguyễn Lan',
    shortName: 'NL',
    email: 'nguyenlan@swork.vn',
    avatarColor: '#1890FF',
    role: 'ADMIN',
    isActive: true
  };

  private currentUserSubject = new BehaviorSubject<User>(this.initUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  private initUser(): User {
    const saved = localStorage.getItem('swork_current_user');
    if (saved) {
      try {
        const u = JSON.parse(saved);
        if (u && u.id && u.id !== 'user-lan-01') return u;
      } catch (e) {}
    }
    return this.defaultRealUser;
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  get currentUserId(): string {
    return this.getCurrentUser()?.id || '6ab33265464b9a6f701d8a0a';
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('swork_current_user', JSON.stringify(user));
  }

  getUsers(): Observable<User[]> {
    return SworkService.getUsers().pipe(
      map(users => {
        const list = (users as unknown as User[]) || [];
        const current = this.getCurrentUser();
        const found = list.find(u => u.id === current.id || u.email === current.email);
        if (found && found.id !== current.id) {
          this.setCurrentUser(found);
        } else if (!found && list.length > 0) {
          this.setCurrentUser(list[0]);
        }
        return list;
      }),
      catchError(() => this.http.get<ApiResponse<User[]>>(`${this.baseUrl}/users`).pipe(
        map(res => res.data || []),
        catchError(() => of(this.getMockUsers()))
      ))
    );
  }

  getProjects(): Observable<Project[]> {
    return SworkService.getProjects().pipe(
      map(projects => (projects as unknown as Project[])),
      catchError(() => this.http.get<ApiResponse<Project[]>>(`${this.baseUrl}/projects`).pipe(
        map(res => res.data),
        catchError(() => of(this.getMockProjects()))
      ))
    );
  }

  getProjectById(id: string): Observable<Project> {
    return SworkService.getProjectById(id).pipe(
      map(p => (p as unknown as Project)),
      catchError(() => this.http.get<ApiResponse<Project>>(`${this.baseUrl}/projects/${id}`).pipe(
        map(res => res.data),
        catchError(() => {
          const found = this.getMockProjects().find(p => p.id === id);
          return of(found || this.getMockProjects()[0]);
        })
      ))
    );
  }

  updateProjectSettings(id: string, settings: any): Observable<Project> {
    return SworkService.updateProjectSettings(id, settings).pipe(
      map(p => (p as unknown as Project)),
      catchError(() => this.http.put<ApiResponse<Project>>(`${this.baseUrl}/projects/${id}/settings`, settings).pipe(
        map(res => res.data),
        catchError(() => {
          const p = this.getMockProjects()[0];
          p.settings = settings;
          return of(p);
        })
      ))
    );
  }

  getTasks(filter: {
    tab?: MyTaskTab;
    userId?: string;
    projectId?: string;
    stageId?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    search?: string;
    page?: number;
    size?: number;
  }): Observable<PageResponse<Task>> {
    return SworkService.getTasks(filter as any).pipe(
      map(res => (res as unknown as PageResponse<Task>)),
      catchError(() => {
        let params = new HttpParams();
        if (filter.tab) params = params.set('tab', filter.tab);
        if (filter.userId) params = params.set('userId', filter.userId);
        if (filter.projectId) params = params.set('projectId', filter.projectId);
        if (filter.stageId) params = params.set('stageId', filter.stageId);
        if (filter.status) params = params.set('status', filter.status);
        if (filter.priority) params = params.set('priority', filter.priority);
        if (filter.search) params = params.set('search', filter.search);
        if (filter.page !== undefined) params = params.set('page', filter.page);
        if (filter.size !== undefined) params = params.set('size', filter.size);

        return this.http.get<ApiResponse<PageResponse<Task>>>(`${this.baseUrl}/tasks`, { params }).pipe(
          map(res => res.data),
          catchError(() => of(this.getFilteredMockTasks(filter)))
        );
      })
    );
  }

  updateTaskStatus(id: string, status: TaskStatus): Observable<Task> {
    return SworkService.updateTaskStatus(id, status).pipe(
      map(t => (t as unknown as Task)),
      catchError(() => this.http.patch<ApiResponse<Task>>(`${this.baseUrl}/tasks/${id}/status?status=${status}`, {}).pipe(
        map(res => res.data),
        catchError(() => {
          const task = this.getMockTasks().find(t => t.id === id);
          if (task) {
            task.status = status;
            task.isCompleted = status === 'DONE';
          }
          return of(task || this.getMockTasks()[0]);
        })
      ))
    );
  }

  updateTask(id: string, taskData: any): Observable<Task> {
    return SworkService.updateTask(id, taskData).pipe(
      map(t => (t as unknown as Task)),
      catchError(() => this.http.put<ApiResponse<Task>>(`${this.baseUrl}/tasks/${id}`, taskData).pipe(
        map(res => res.data),
        catchError(() => {
          const t = this.getMockTasks().find(x => x.id === id);
          if (t) Object.assign(t, taskData);
          return of(t || this.getMockTasks()[0]);
        })
      ))
    );
  }

  toggleChecklist(taskId: string, checkItemId: string, isDone: boolean): Observable<Task> {
    return SworkService.toggleChecklist(taskId, checkItemId, isDone).pipe(
      map(t => (t as unknown as Task)),
      catchError(() => this.http.patch<ApiResponse<Task>>(`${this.baseUrl}/tasks/${taskId}/checklists/${checkItemId}?isDone=${isDone}`, {}).pipe(
        map(res => res.data),
        catchError(() => {
          const task = this.getMockTasks().find(t => t.id === taskId);
          if (task && task.checklists) {
            const item = task.checklists.find(c => c.id === checkItemId);
            if (item) item.isDone = isDone;
            const done = task.checklists.filter(c => c.isDone).length;
            task.checklistSummary = `${done}/${task.checklists.length} checklist`;
          }
          return of(task || this.getMockTasks()[0]);
        })
      ))
    );
  }

  createTask(taskData: any): Observable<Task> {
    return SworkService.createTask(taskData).pipe(
      map(t => (t as unknown as Task)),
      catchError(() => this.http.post<ApiResponse<Task>>(`${this.baseUrl}/tasks`, taskData).pipe(
        map(res => res.data),
        catchError(() => {
          const newTask: Task = {
            id: 'task-' + Date.now(),
            taskKey: 'WEB-' + (this.getMockTasks().length + 101),
            title: taskData.title,
            description: taskData.description,
            project: { id: 'proj-01', name: 'Triển khai website doanh nghiệp', code: 'WEB' },
            stageId: taskData.stageId || 'stage-1',
            status: taskData.status || 'TODO',
            priority: taskData.priority || 'MEDIUM',
            isCompleted: false,
            creatorId: this.currentUserId,
            collaboratorIds: [],
            followerIds: [],
            checklists: [],
            estimation: { estimatedHours: taskData.estimatedHours || 0, spentHours: 0 },
            dependencies: { blockedBy: [], blocking: [] },
            review: { isRequired: false, reviewStatus: 'PENDING' }
          };
          this.getMockTasks().push(newTask);
          return of(newTask);
        })
      ))
    );
  }

  getWorklogs(projectId?: string): Observable<Worklog[]> {
    return SworkService.getWorklogs(projectId, this.currentUserId).pipe(
      map(w => (w as unknown as Worklog[])),
      catchError(() => {
        const url = projectId ? `${this.baseUrl}/worklogs/project/${projectId}` : `${this.baseUrl}/worklogs/user/${this.currentUserId}`;
        return this.http.get<ApiResponse<Worklog[]>>(url).pipe(
          map(res => res.data),
          catchError(() => of(this.getMockWorklogs()))
        );
      })
    );
  }

  logTime(req: { taskId: string; durationMinutes: number; note: string }): Observable<Worklog> {
    const payload = {
      ...req,
      userId: this.currentUserId
    };
    return SworkService.logTime(payload).pipe(
      map(w => (w as unknown as Worklog)),
      catchError(() => this.http.post<ApiResponse<Worklog>>(`${this.baseUrl}/worklogs`, payload).pipe(
        map(res => res.data),
        catchError(() => {
          const wl: Worklog = {
            id: 'wl-' + Date.now(),
            taskId: req.taskId,
            userId: this.currentUserId,
            durationMinutes: req.durationMinutes,
            workDate: new Date().toISOString(),
            note: req.note
          };
          return of(wl);
        })
      ))
    );
  }

  // Mock data fallback
  private mockUsers: User[] = [
    { id: 'user-lan-01', fullName: 'Nguyễn Lan', shortName: 'NL', email: 'nguyenlan@swork.vn', avatarColor: '#1890FF', role: 'ADMIN', isActive: true },
    { id: 'user-tuan-02', fullName: 'Trần Tuấn', shortName: 'TT', email: 'trantuan@swork.vn', avatarColor: '#52C41A', role: 'MEMBER', isActive: true },
    { id: 'user-hoa-03', fullName: 'Lê Hoa', shortName: 'LH', email: 'lehoa@swork.vn', avatarColor: '#FA8C16', role: 'MEMBER', isActive: true },
    { id: 'user-minh-04', fullName: 'Phạm Minh', shortName: 'PM', email: 'phamminh@swork.vn', avatarColor: '#722ED1', role: 'SYSTEM_OWNER', isActive: true }
  ];

  private mockProjects: Project[] = [
    {
      id: 'proj-01',
      name: 'Triển khai website doanh nghiệp',
      code: 'WEB',
      tag: 'Khối Công nghệ',
      description: 'Dự án số hóa quy trình và cổng thông tin doanh nghiệp',
      stats: {
        totalTasks: 8,
        completedTasks: 3,
        inProgressTasks: 2,
        todoTasks: 3,
        progressPercent: 37.5
      },
      stages: [
        { id: 'stage-1', name: 'Khảo sát & thiết kế', position: 1 },
        { id: 'stage-2', name: 'Phát triển (Sprint)', position: 2 },
        { id: 'stage-3', name: 'Kiểm thử & Đánh giá', position: 3 },
        { id: 'stage-4', name: 'Nghiệm thu & Bàn giao', position: 4 }
      ],
      members: [
        { userId: 'user-lan-01', fullName: 'Nguyễn Lan', shortName: 'NL', role: 'PROJECT_MANAGER' },
        { userId: 'user-tuan-02', fullName: 'Trần Tuấn', shortName: 'TT', role: 'MEMBER' },
        { userId: 'user-hoa-03', fullName: 'Lê Hoa', shortName: 'LH', role: 'MEMBER' }
      ],
      settings: {
        basicSettings: {
          accessPermission: 'ALL_MEMBERS',
          managerCanAddMembers: true,
          enableCustomFields: true,
          sendEmailNotifications: true,
          enableGoals: true,
          allowCloneWorkspace: true,
          isClosed: false
        },
        systemSettings: {
          allowConvertType: false,
          isTemplate: true,
          pinToSidebar: true,
          deletePermission: 'SYSTEM_OWNER_ONLY',
          ownerCanViewAll: true
        },
        taskAdvancedSettings: {
          enableHourlyDeadline: true,
          taskViewScope: 'ALL_TASKS',
          requireReviewBeforeComplete: true,
          showSubtasksInList: true,
          assigneeCanEditInfo: false,
          taskDeletePermission: 'CREATOR_AND_MANAGER',
          enableFailedStatus: false,
          enableBatchActions: true,
          enableEstimatedHours: true,
          enableTaskDependencies: true
        },
        customFieldDefinitions: [
          { key: 'budget', label: 'Ngân sách (VNĐ)', type: 'NUMBER', isRequired: false }
        ]
      }
    }
  ];

  private mockTasks: Task[] = [
    {
      id: 'task-101',
      taskKey: 'WEB-101',
      title: 'Khảo sát yêu cầu khách hàng & Đặc tả kiến trúc',
      project: { id: 'proj-01', name: 'Triển khai website doanh nghiệp', code: 'WEB' },
      stageId: 'stage-1',
      status: 'DONE',
      priority: 'HIGH',
      isCompleted: true,
      creatorId: 'user-lan-01',
      assignee: { userId: 'user-lan-01', fullName: 'Nguyễn Lan', shortName: 'NL' },
      collaboratorIds: [],
      followerIds: [],
      checklists: [
        { id: 'ck-1', title: 'Khảo sát nghiệp vụ', isDone: true },
        { id: 'ck-2', title: 'Vẽ sơ đồ luồng BPMN', isDone: true }
      ],
      checklistSummary: '2/2 checklist',
      estimation: { estimatedHours: 20, spentHours: 18 },
      dependencies: { blockedBy: [], blocking: [] },
      review: { isRequired: false, reviewStatus: 'APPROVED' }
    },
    {
      id: 'task-102',
      taskKey: 'WEB-102',
      title: 'Thiết kế kiến trúc cơ sở dữ liệu MongoDB và chỉ mục',
      project: { id: 'proj-01', name: 'Triển khai website doanh nghiệp', code: 'WEB' },
      stageId: 'stage-1',
      status: 'DONE',
      priority: 'HIGH',
      isCompleted: true,
      creatorId: 'user-lan-01',
      assignee: { userId: 'user-tuan-02', fullName: 'Trần Tuấn', shortName: 'TT' },
      collaboratorIds: [],
      followerIds: ['user-lan-01'],
      checklists: [
        { id: 'ck-3', title: 'Viết tài liệu thiết kế CSDL', isDone: true }
      ],
      checklistSummary: '1/1 checklist',
      estimation: { estimatedHours: 16, spentHours: 15.5 },
      dependencies: { blockedBy: [], blocking: [] },
      review: { isRequired: false, reviewStatus: 'APPROVED' }
    },
    {
      id: 'task-103',
      taskKey: 'WEB-103',
      title: 'Xây dựng khung ứng dụng Backend Spring Boot 3',
      project: { id: 'proj-01', name: 'Triển khai website doanh nghiệp', code: 'WEB' },
      stageId: 'stage-2',
      status: 'DONE',
      priority: 'HIGH',
      isCompleted: true,
      creatorId: 'user-lan-01',
      assignee: { userId: 'user-tuan-02', fullName: 'Trần Tuấn', shortName: 'TT' },
      collaboratorIds: [],
      followerIds: [],
      checklists: [],
      estimation: { estimatedHours: 24, spentHours: 22 },
      dependencies: { blockedBy: [], blocking: [] },
      review: { isRequired: false, reviewStatus: 'APPROVED' }
    },
    {
      id: 'task-104',
      taskKey: 'WEB-104',
      title: 'Phát triển giao diện Angular (Projects Space & My Tasks)',
      project: { id: 'proj-01', name: 'Triển khai website doanh nghiệp', code: 'WEB' },
      stageId: 'stage-2',
      status: 'IN_PROGRESS',
      priority: 'URGENT',
      isCompleted: false,
      creatorId: 'user-lan-01',
      assignee: { userId: 'user-hoa-03', fullName: 'Lê Hoa', shortName: 'LH' },
      collaboratorIds: ['user-tuan-02'],
      followerIds: ['user-lan-01'],
      checklists: [
        { id: 'ck-4', title: 'Thiết kế Header & Sidebar navigation', isDone: true },
        { id: 'ck-5', title: 'Triển khai 4 Tab My Tasks', isDone: false }
      ],
      checklistSummary: '1/2 checklist',
      estimation: { estimatedHours: 32, spentHours: 14 },
      dependencies: { blockedBy: [], blocking: [] },
      review: { isRequired: false, reviewStatus: 'PENDING' }
    },
    {
      id: 'task-105',
      taskKey: 'WEB-105',
      title: 'Tích hợp biểu mẫu liên hệ',
      description: 'Thiết kế form liên hệ khách hàng và tích hợp API backend',
      project: { id: 'proj-01', name: 'Triển khai website doanh nghiệp', code: 'WEB' },
      stageId: 'stage-2',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      isCompleted: false,
      creatorId: 'user-lan-01',
      assignee: { userId: 'user-lan-01', fullName: 'Nguyễn Lan', shortName: 'NL' },
      collaboratorIds: ['user-tuan-02'],
      followerIds: ['user-hoa-03'],
      checklists: [
        { id: 'ck-6', title: 'Thiết kế form HTML & validation', isDone: true },
        { id: 'ck-7', title: 'Viết API lưu trữ thông tin liên hệ', isDone: false }
      ],
      checklistSummary: '1/2 checklist',
      estimation: { estimatedHours: 16.5, spentHours: 12.0 },
      dependencies: {
        blockedBy: [{ taskId: 'task-102', taskKey: 'WEB-102', type: 'FINISH_TO_START' }],
        blocking: []
      },
      review: {
        isRequired: true,
        reviewerId: 'user-lan-01',
        reviewStatus: 'PENDING',
        feedback: 'Cần kiểm tra kỹ cơ chế chống spam bằng recaptcha'
      }
    },
    {
      id: 'task-106',
      taskKey: 'WEB-106',
      title: 'Kiểm thử tính năng và viết Test Cases',
      project: { id: 'proj-01', name: 'Triển khai website doanh nghiệp', code: 'WEB' },
      stageId: 'stage-3',
      status: 'TODO',
      priority: 'MEDIUM',
      isCompleted: false,
      creatorId: 'user-lan-01',
      assignee: { userId: 'user-hoa-03', fullName: 'Lê Hoa', shortName: 'LH' },
      collaboratorIds: ['user-tuan-02'],
      followerIds: ['user-lan-01'],
      checklists: [],
      estimation: { estimatedHours: 20, spentHours: 0 },
      dependencies: { blockedBy: [], blocking: [] },
      review: { isRequired: false, reviewStatus: 'PENDING' }
    },
    {
      id: 'task-107',
      taskKey: 'WEB-107',
      title: 'Kiểm thử bảo mật và hiệu năng MongoDB',
      project: { id: 'proj-01', name: 'Triển khai website doanh nghiệp', code: 'WEB' },
      stageId: 'stage-3',
      status: 'TODO',
      priority: 'HIGH',
      isCompleted: false,
      creatorId: 'user-lan-01',
      assignee: { userId: 'user-tuan-02', fullName: 'Trần Tuấn', shortName: 'TT' },
      collaboratorIds: [],
      followerIds: [],
      checklists: [],
      estimation: { estimatedHours: 16, spentHours: 0 },
      dependencies: { blockedBy: [], blocking: [] },
      review: { isRequired: false, reviewStatus: 'PENDING' }
    },
    {
      id: 'task-108',
      taskKey: 'WEB-108',
      title: 'Đóng gói Docker Compose và Bàn giao nghiệm thu',
      project: { id: 'proj-01', name: 'Triển khai website doanh nghiệp', code: 'WEB' },
      stageId: 'stage-4',
      status: 'TODO',
      priority: 'MEDIUM',
      isCompleted: false,
      creatorId: 'user-lan-01',
      assignee: { userId: 'user-lan-01', fullName: 'Nguyễn Lan', shortName: 'NL' },
      collaboratorIds: ['user-tuan-02', 'user-hoa-03'],
      followerIds: [],
      checklists: [],
      estimation: { estimatedHours: 12, spentHours: 0 },
      dependencies: { blockedBy: [], blocking: [] },
      review: { isRequired: false, reviewStatus: 'PENDING' }
    }
  ];

  private mockWorklogs: Worklog[] = [
    {
      id: 'wl-1',
      taskId: 'task-105',
      projectId: 'proj-01',
      userId: 'user-lan-01',
      durationMinutes: 180,
      workDate: new Date(Date.now() - 86400000).toISOString(),
      note: 'Thiết kế giao diện biểu mẫu liên hệ và validation'
    },
    {
      id: 'wl-2',
      taskId: 'task-105',
      projectId: 'proj-01',
      userId: 'user-lan-01',
      durationMinutes: 540,
      workDate: new Date().toISOString(),
      note: 'Viết API backend và tích hợp form thông báo'
    }
  ];

  private getMockUsers(): User[] {
    return this.mockUsers;
  }

  private getMockProjects(): Project[] {
    return this.mockProjects;
  }

  private getMockTasks(): Task[] {
    return this.mockTasks;
  }

  private getMockWorklogs(): Worklog[] {
    return this.mockWorklogs;
  }

  private getFilteredMockTasks(filter: any): PageResponse<Task> {
    let result = [...this.mockTasks];
    const uid = filter.userId || this.currentUserId;

    if (filter.tab) {
      if (filter.tab === 'ASSIGNED') {
        result = result.filter(t => t.assignee && t.assignee.userId === uid);
      } else if (filter.tab === 'COLLABORATING') {
        result = result.filter(t => t.collaboratorIds && t.collaboratorIds.includes(uid));
      } else if (filter.tab === 'CREATED') {
        result = result.filter(t => t.creatorId === uid);
      } else if (filter.tab === 'FOLLOWING') {
        result = result.filter(t => t.followerIds && t.followerIds.includes(uid));
      }
    }

    if (filter.projectId) {
      result = result.filter(t => t.project.id === filter.projectId);
    }
    if (filter.stageId) {
      result = result.filter(t => t.stageId === filter.stageId);
    }
    if (filter.status) {
      result = result.filter(t => t.status === filter.status);
    }
    if (filter.priority) {
      result = result.filter(t => t.priority === filter.priority);
    }
    if (filter.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(t => t.title.toLowerCase().includes(q) || t.taskKey.toLowerCase().includes(q));
    }

    return {
      content: result,
      page: 0,
      size: result.length,
      totalElements: result.length,
      totalPages: 1,
      isLast: true
    };
  }
}
