import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyTaskTab, Task, TaskStatus, User } from '../../models/swork.models';
import { SworkApiService } from '../../services/swork-api.service';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { TaskFilterBarComponent, ViewMode } from './components/task-filter-bar/task-filter-bar.component';
import { TaskTableViewComponent } from './components/task-table-view/task-table-view.component';
import { TaskKanbanViewComponent } from './components/task-kanban-view/task-kanban-view.component';
import { TaskCalendarViewComponent } from './components/task-calendar-view/task-calendar-view.component';
import { TaskGanttViewComponent } from './components/task-gantt-view/task-gantt-view.component';
import { FlxButtonModule } from '@fpt-is/flx-ui/button';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    FlxButtonModule,
    TaskModalComponent,
    TaskFilterBarComponent,
    TaskTableViewComponent,
    TaskKanbanViewComponent,
    TaskCalendarViewComponent,
    TaskGanttViewComponent
  ],
  templateUrl: './my-tasks.component.html',
  styleUrl: './my-tasks.component.scss'
})
export class MyTasksComponent implements OnInit {
  currentTab: MyTaskTab = 'ASSIGNED';
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  currentUser!: User;
  selectedTask: Task | null = null;

  // View Mode
  currentViewMode: ViewMode = 'DEFAULT';

  // Filters
  searchKeyword = '';
  selectedType = '';
  selectedStatus = '';
  selectedPriority = '';
  selectedAssignee = '';

  tabCounts = {
    ASSIGNED: 0,
    COLLABORATING: 0,
    CREATED: 0,
    FOLLOWING: 0
  };

  // Calendar State
  calendarYear = 2026;
  calendarMonth = 8; // September

  stages: { id: string; name: string }[] = [
    { id: 'stage-1', name: 'Khảo sát & thiết kế' },
    { id: 'stage-2', name: 'Phát triển & kiểm thử' },
    { id: 'stage-3', name: 'Hỗ trợ người dùng' },
    { id: 'stage-4', name: 'Cải tiến' }
  ];

  constructor(private apiService: SworkApiService) {}

  ngOnInit(): void {
    this.apiService.currentUser$.subscribe(u => {
      this.currentUser = u;
      this.loadTasks();
    });

    this.apiService.getProjects().subscribe(projects => {
      if (projects && projects.length > 0 && projects[0].stages) {
        const validStages = projects[0].stages.filter(s => s && s.id && s.name);
        if (validStages.length > 0) {
          this.stages = validStages;
        }
      }
    });

    window.addEventListener('swork-search', (e: any) => {
      this.searchKeyword = e.detail;
      this.filterTasks();
    });

    window.addEventListener('swork-task-created', () => {
      this.loadTasks();
    });
  }

  selectTab(tab: MyTaskTab): void {
    this.currentTab = tab;
    this.loadTasks();
  }

  loadTasks(): void {
    if (!this.currentUser) {
      this.currentUser = this.apiService.getCurrentUser();
    }
    this.apiService.getTasks({
      tab: this.currentTab,
      userId: this.currentUser?.id,
      size: 50
    }).subscribe({
      next: (res) => {
        this.tasks = (res && res.content) ? res.content : [];
        this.filterTasks();
        this.updateTabCounts();
      },
      error: (err) => {
        console.error('Lỗi khi tải công việc từ MongoDB:', err);
        this.tasks = [];
        this.filterTasks();
      }
    });
  }

  updateTabCounts(): void {
    if (!this.currentUser) return;
    this.apiService.getTasks({ size: 100 }).subscribe(res => {
      if (res && res.content) {
        const uid = this.currentUser.id;
        const all = res.content;
        this.tabCounts = {
          ASSIGNED: all.filter(t => t.assignee?.userId === uid).length,
          COLLABORATING: all.filter(t => t.collaboratorIds?.includes(uid)).length,
          CREATED: all.filter(t => t.creatorId === uid).length,
          FOLLOWING: all.filter(t => t.followerIds?.includes(uid)).length
        };
      }
    });
  }

  filterTasks(): void {
    let result = [...this.tasks];

    // Search filter
    if (this.searchKeyword && this.searchKeyword.trim()) {
      const kw = this.searchKeyword.toLowerCase().trim();
      result = result.filter(t =>
        t.title.toLowerCase().includes(kw) ||
        t.taskKey.toLowerCase().includes(kw) ||
        (t.project?.code && t.project.code.toLowerCase().includes(kw))
      );
    }

    // Status filter
    if (this.selectedStatus) {
      result = result.filter(t => t.status === this.selectedStatus);
    }

    // Priority filter
    if (this.selectedPriority) {
      result = result.filter(t => t.priority === this.selectedPriority);
    }

    // Assignee filter
    if (this.selectedAssignee) {
      result = result.filter(t =>
        t.assignee?.fullName && t.assignee.fullName.toLowerCase().includes(this.selectedAssignee.toLowerCase())
      );
    }

    this.filteredTasks = result;
  }

  // Filter Bar Handlers
  onSearchChange(kw: string): void {
    this.searchKeyword = kw;
    this.filterTasks();
  }

  onTypeChange(t: string): void {
    this.selectedType = t;
    this.filterTasks();
  }

  onStatusChange(s: string): void {
    this.selectedStatus = s;
    this.filterTasks();
  }

  onPriorityChange(p: string): void {
    this.selectedPriority = p;
    this.filterTasks();
  }

  onAssigneeChange(a: string): void {
    this.selectedAssignee = a;
    this.filterTasks();
  }

  onViewModeChange(mode: ViewMode): void {
    this.currentViewMode = mode;
  }

  getViewModeLabel(): string {
    switch (this.currentViewMode) {
      case 'DEFAULT': return 'Mặc định';
      case 'TABLE': return 'Bảng';
      case 'KANBAN': return 'Kanban';
      case 'CALENDAR': return 'Lịch';
      case 'USER': return 'Người dùng';
      case 'STATUS': return 'Trạng thái';
      case 'GANTT': return 'Sơ đồ Gantt';
      default: return 'Mặc định';
    }
  }

  // Task Actions
  openTaskModal(task: Task): void {
    this.selectedTask = task;
  }

  closeTaskModal(): void {
    this.selectedTask = null;
  }

  onTaskUpdated(updated: Task): void {
    const idx = this.tasks.findIndex(t => t.id === updated.id);
    if (idx !== -1) {
      this.tasks[idx] = updated;
      this.filterTasks();
    }
  }

  onToggleTaskComplete(task: Task): void {
    task.isCompleted = !task.isCompleted;
    task.status = task.isCompleted ? 'DONE' : 'IN_PROGRESS';
    this.apiService.updateTaskStatus(task.id, task.status).subscribe({
      next: () => this.filterTasks()
    });
  }

  onKanbanStatusChange(event: { task: Task; newStatus: TaskStatus }): void {
    event.task.status = event.newStatus;
    event.task.isCompleted = event.newStatus === 'DONE';
    this.apiService.updateTaskStatus(event.task.id, event.task.status).subscribe({
      next: () => this.filterTasks()
    });
  }

  onCalendarMonthChange(event: { year: number; month: number }): void {
    this.calendarYear = event.year;
    this.calendarMonth = event.month;
  }
}
