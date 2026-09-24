import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project, ProjectStage, TaskPriority, TaskStatus, User } from '../../models/swork.models';
import { SworkApiService } from '../../services/swork-api.service';

import { FlxButtonModule } from '@fpt-is/flx-ui/button';

@Component({
  selector: 'app-create-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FlxButtonModule],
  templateUrl: './create-task-modal.component.html',
  styleUrl: './create-task-modal.component.scss'
})
export class CreateTaskModalComponent implements OnInit, OnDestroy {
  isOpen = false;
  isSubmitting = false;
  errorMessage = '';

  // Data sources from backend
  projects: Project[] = [];
  users: User[] = [];
  currentStages: ProjectStage[] = [];

  // Form Model
  title = '';
  description = '';
  projectId = '';
  stageId = '';
  assigneeId = '';
  priority: TaskPriority = 'MEDIUM';
  status: TaskStatus = 'TODO';
  dueDate = '';
  estimatedHours = 8;
  planBucket = 'UNPLANNED';

  checklistInput = '';
  checklists: string[] = [];

  private openListener = () => this.open();

  constructor(private apiService: SworkApiService) {}

  ngOnInit(): void {
    window.addEventListener('swork-open-create-task', this.openListener);
    this.loadMetadata();
  }

  ngOnDestroy(): void {
    window.removeEventListener('swork-open-create-task', this.openListener);
  }

  loadMetadata(): void {
    this.apiService.getProjects().subscribe(projs => {
      this.projects = projs || [];
      if (this.projects.length > 0 && !this.projectId) {
        this.projectId = this.projects[0].id;
        this.onProjectChange();
      }
    });

    this.apiService.getUsers().subscribe(users => {
      this.users = users || [];
      if (!this.assigneeId) {
        const cur = this.apiService.getCurrentUser();
        this.assigneeId = cur ? cur.id : (this.users[0]?.id || '');
      }
    });
  }

  open(): void {
    this.isOpen = true;
    this.errorMessage = '';
    const cur = this.apiService.getCurrentUser();
    if (cur) {
      this.assigneeId = cur.id;
    }
    if (this.projects.length === 0) {
      this.loadMetadata();
    } else if (!this.projectId && this.projects.length > 0) {
      this.projectId = this.projects[0].id;
      this.onProjectChange();
    }
    // Set default due date to tomorrow
    const d = new Date();
    d.setDate(d.getDate() + 3);
    this.dueDate = d.toISOString().split('T')[0];
  }

  close(): void {
    this.isOpen = false;
    this.resetForm();
  }

  onProjectChange(): void {
    const selected = this.projects.find(p => p.id === this.projectId);
    if (selected && selected.stages && selected.stages.length > 0) {
      this.currentStages = selected.stages;
      this.stageId = this.currentStages[0].id;
    } else {
      this.currentStages = [
        { id: 'stage-1', name: 'Khảo sát & thiết kế', position: 1 },
        { id: 'stage-2', name: 'Phát triển & kiểm thử', position: 2 },
        { id: 'stage-3', name: 'Hỗ trợ người dùng', position: 3 },
        { id: 'stage-4', name: 'Cải tiến', position: 4 }
      ];
      this.stageId = 'stage-1';
    }
  }

  addChecklist(): void {
    if (this.checklistInput.trim()) {
      this.checklists.push(this.checklistInput.trim());
      this.checklistInput = '';
    }
  }

  removeChecklist(index: number): void {
    this.checklists.splice(index, 1);
  }

  onSubmit(): void {
    if (!this.title.trim()) {
      this.errorMessage = 'Vui lòng nhập tiêu đề công việc!';
      return;
    }

    if (!this.projectId && this.projects.length > 0) {
      this.projectId = this.projects[0].id;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const curUser = this.apiService.getCurrentUser();
    const payload = {
      title: this.title.trim(),
      description: this.description.trim(),
      projectId: this.projectId,
      stageId: this.stageId || 'stage-1',
      status: this.status,
      priority: this.priority,
      creatorId: curUser ? curUser.id : this.assigneeId,
      assigneeId: this.assigneeId,
      dueDate: this.dueDate ? new Date(this.dueDate + 'T17:00:00Z').toISOString() : new Date().toISOString(),
      estimatedHours: Number(this.estimatedHours) || 0,
      checklistTitles: this.checklists,
      customFieldValues: {
        planBucket: this.planBucket
      }
    };

    this.apiService.createTask(payload).subscribe({
      next: (created) => {
        this.isSubmitting = false;
        // Broadcast custom event so active pages reload
        window.dispatchEvent(new CustomEvent('swork-task-created', { detail: created }));
        this.close();
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = 'Có lỗi xảy ra khi lưu công việc vào cơ sở dữ liệu: ' + (err.message || 'Không phản hồi');
      }
    });
  }

  private resetForm(): void {
    this.title = '';
    this.description = '';
    this.priority = 'MEDIUM';
    this.status = 'TODO';
    this.estimatedHours = 8;
    this.planBucket = 'UNPLANNED';
    this.checklists = [];
    this.checklistInput = '';
    this.errorMessage = '';
  }
}
