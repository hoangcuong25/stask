import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project, Task, TaskPriority, TaskStatus, User } from '../../models/swork.models';
import { SworkApiService } from '../../services/swork-api.service';
import { TaskModalComponent } from '../task-modal/task-modal.component';

export type PlanBucketType = 'UNPLANNED' | 'TODAY' | 'THIS_WEEK' | 'LATER';

export interface PlanColumn {
  type: PlanBucketType;
  label: string;
  dotColor: string;
  badgeClass: string;
  tasks: Task[];
}

@Component({
  selector: 'app-personal-plan',
  standalone: true,
  imports: [CommonModule, FormsModule, TaskModalComponent],
  templateUrl: './personal-plan.component.html',
  styleUrl: './personal-plan.component.scss'
})
export class PersonalPlanComponent implements OnInit {
  currentUser!: User;
  allTasks: Task[] = [];
  filteredTasks: Task[] = [];
  projects: Project[] = [];
  selectedTask: Task | null = null;

  // Filters
  searchKeyword = '';
  selectedProject = '';
  includeCompleted = false;

  // Plan Buckets mapping stored locally/in customFieldValues
  // Default distribution matching user's photo
  private planMap: { [taskId: string]: PlanBucketType } = {};

  constructor(private apiService: SworkApiService) {}

  ngOnInit(): void {
    this.loadPlanCache();

    this.apiService.currentUser$.subscribe(u => {
      this.currentUser = u;
      this.loadData();
    });

    this.apiService.getProjects().subscribe(p => {
      this.projects = p || [];
    });

    window.addEventListener('swork-task-created', () => {
      this.loadData();
    });
  }

  loadData(): void {
    this.apiService.getTasks({ size: 100 }).subscribe(res => {
      if (res && res.content) {
        this.allTasks = res.content;
      } else {
        this.allTasks = [];
      }
      this.initDefaultBuckets();
      this.filterTasks();
    });
  }

  private loadPlanCache(): void {
    const cached = localStorage.getItem('swork_personal_plan_buckets');
    if (cached) {
      try {
        this.planMap = JSON.parse(cached);
      } catch (e) {}
    }
  }

  private savePlanCache(): void {
    localStorage.setItem('swork_personal_plan_buckets', JSON.stringify(this.planMap));
  }

  private initDefaultBuckets(): void {
    // If not set, assign defaults matching the user's uploaded screenshot
    this.allTasks.forEach(t => {
      if (this.planMap[t.id]) return;

      if (t.customFieldValues && t.customFieldValues['planBucket']) {
        this.planMap[t.id] = t.customFieldValues['planBucket'] as PlanBucketType;
        return;
      }

      // Default distribution based on taskKey / photo
      if (t.taskKey === 'WEB-102' || t.taskKey === 'WEB-103') {
        this.planMap[t.id] = 'UNPLANNED';
      } else if (t.taskKey === 'WEB-105' || t.taskKey === 'WEB-107') {
        this.planMap[t.id] = 'TODAY';
      } else if (t.taskKey === 'TECH-101' || t.taskKey === 'WEB-104') {
        this.planMap[t.id] = 'THIS_WEEK';
      } else {
        this.planMap[t.id] = 'LATER';
      }
    });
    this.savePlanCache();
  }

  filterTasks(): void {
    let result = [...this.allTasks];

    // Exclude completed tasks unless toggle checked
    if (!this.includeCompleted) {
      result = result.filter(t => !t.isCompleted && t.status !== 'DONE');
    }

    // Keyword search
    if (this.searchKeyword && this.searchKeyword.trim()) {
      const kw = this.searchKeyword.toLowerCase().trim();
      result = result.filter(t =>
        t.title.toLowerCase().includes(kw) ||
        t.taskKey.toLowerCase().includes(kw) ||
        (t.project?.name && t.project.name.toLowerCase().includes(kw))
      );
    }

    // Filter by project space
    if (this.selectedProject) {
      result = result.filter(t => t.project?.id === this.selectedProject || t.project?.code === this.selectedProject);
    }

    this.filteredTasks = result;
  }

  // KPI Metrics Calculation
  getUnplannedCount(): number {
    return this.allTasks.filter(t => this.getTaskBucket(t) === 'UNPLANNED' && !t.isCompleted).length;
  }

  getTodayCount(): number {
    return this.allTasks.filter(t => this.getTaskBucket(t) === 'TODAY' && !t.isCompleted).length;
  }

  getScheduledCount(): number {
    return this.allTasks.filter(t =>
      (this.getTaskBucket(t) === 'TODAY' || this.getTaskBucket(t) === 'THIS_WEEK' || this.getTaskBucket(t) === 'LATER') &&
      !t.isCompleted
    ).length;
  }

  getCompletedCount(): number {
    return this.allTasks.filter(t => t.isCompleted || t.status === 'DONE').length;
  }

  getColumns(): PlanColumn[] {
    const cols: { type: PlanBucketType; label: string; dotColor: string; badgeClass: string }[] = [
      { type: 'UNPLANNED', label: 'Chưa sắp xếp', dotColor: '#8c8c8c', badgeClass: 'badge-unplanned' },
      { type: 'TODAY', label: 'Hôm nay', dotColor: '#1890ff', badgeClass: 'badge-today' },
      { type: 'THIS_WEEK', label: 'Tuần này', dotColor: '#722ed1', badgeClass: 'badge-thisweek' },
      { type: 'LATER', label: 'Để sau', dotColor: '#fa8c16', badgeClass: 'badge-later' }
    ];

    return cols.map(c => ({
      ...c,
      tasks: this.filteredTasks.filter(t => this.getTaskBucket(t) === c.type)
    }));
  }

  getTaskBucket(task: Task): PlanBucketType {
    return this.planMap[task.id] || 'UNPLANNED';
  }

  setTaskBucket(task: Task, bucket: PlanBucketType, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.planMap[task.id] = bucket;
    this.savePlanCache();

    // Persist to backend task custom field
    const updatedCustom = {
      ...(task.customFieldValues || {}),
      planBucket: bucket
    };
    task.customFieldValues = updatedCustom;

    this.apiService.updateTask(task.id, {
      customFieldValues: updatedCustom
    }).subscribe();

    this.filterTasks();
  }

  openTaskModal(task: Task): void {
    this.selectedTask = task;
  }

  closeTaskModal(): void {
    this.selectedTask = null;
  }

  onTaskUpdated(updated: Task): void {
    const idx = this.allTasks.findIndex(t => t.id === updated.id);
    if (idx !== -1) {
      this.allTasks[idx] = updated;
      this.filterTasks();
    }
  }

  formatDueDate(dateStr: string | undefined): string {
    if (!dateStr) return '15/09';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '15/09';
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      return `${day}/${month}`;
    } catch {
      return '15/09';
    }
  }

  getStatusText(status: string | undefined): string {
    switch (status) {
      case 'IN_PROGRESS': return 'Đang thực hiện';
      case 'TODO': return 'Cần làm';
      case 'DONE': return 'Hoàn thành';
      case 'IN_REVIEW': return 'Chờ duyệt';
      default: return 'Cần làm';
    }
  }

  getPriorityBulletColor(p: string | undefined): string {
    switch (p) {
      case 'URGENT': return '#f5222d';
      case 'HIGH': return '#fa8c16';
      case 'MEDIUM': return '#1890ff';
      case 'LOW': return '#8c8c8c';
      default: return '#1890ff';
    }
  }

  getBucketLabel(bucket: PlanBucketType): string {
    switch (bucket) {
      case 'UNPLANNED': return 'Chưa sắp xếp';
      case 'TODAY': return 'Hôm nay';
      case 'THIS_WEEK': return 'Tuần này';
      case 'LATER': return 'Để sau';
      default: return 'Chưa sắp xếp';
    }
  }
}
