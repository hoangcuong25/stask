import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskPriority, TaskStatus } from '../../../../models/swork.models';
import { ViewMode } from '../task-filter-bar/task-filter-bar.component';
import { FlxButtonModule } from '@fpt-is/flx-ui/button';

interface StageGroup {
  id: string;
  name: string;
  tasks: Task[];
}

interface UserGroup {
  userName: string;
  shortName: string;
  avatarColor: string;
  tasks: Task[];
}

interface StatusGroup {
  status: TaskStatus;
  label: string;
  tasks: Task[];
}

@Component({
  selector: 'app-task-table-view',
  standalone: true,
  imports: [CommonModule, FlxButtonModule],
  templateUrl: './task-table-view.component.html',
  styleUrl: './task-table-view.component.scss'
})
export class TaskTableViewComponent {
  @Input() tasks: Task[] = [];
  @Input() currentViewMode: ViewMode = 'DEFAULT';
  @Input() stages: { id: string; name: string }[] = [];

  @Output() taskSelect = new EventEmitter<Task>();
  @Output() taskToggleComplete = new EventEmitter<Task>();

  onSelectTask(task: Task): void {
    this.taskSelect.emit(task);
  }

  onToggleComplete(task: Task, event: Event): void {
    event.stopPropagation();
    this.taskToggleComplete.emit(task);
  }

  toggleSelectAll(event: any): void {
    const checked = event.target.checked;
    this.tasks.forEach(t => (t.isCompleted = checked));
  }

  getStageGroups(): StageGroup[] {
    const groups: StageGroup[] = [];
    const stageMap = new Map<string, Task[]>();

    this.stages.forEach(s => stageMap.set(s.id, []));

    this.tasks.forEach(task => {
      const sId = task.stageId || 'stage-2';
      if (!stageMap.has(sId)) {
        stageMap.set(sId, []);
      }
      stageMap.get(sId)!.push(task);
    });

    this.stages.forEach(s => {
      const tasksInStage = stageMap.get(s.id) || [];
      if (tasksInStage.length > 0) {
        groups.push({
          id: s.id,
          name: s.name,
          tasks: tasksInStage
        });
      }
    });

    stageMap.forEach((tasks, key) => {
      if (!this.stages.some(s => s.id === key) && tasks.length > 0) {
        groups.push({
          id: key,
          name: this.getStageName(key),
          tasks: tasks
        });
      }
    });

    return groups;
  }

  getUserGroups(): UserGroup[] {
    const map = new Map<string, UserGroup>();

    this.tasks.forEach(t => {
      const name = t.assignee?.fullName || 'Chưa phân công';
      if (!map.has(name)) {
        map.set(name, {
          userName: name,
          shortName: t.assignee?.shortName || '??',
          avatarColor: t.assignee?.avatarColor || '#0F63D1',
          tasks: []
        });
      }
      map.get(name)!.tasks.push(t);
    });

    return Array.from(map.values());
  }

  getStatusGroups(): StatusGroup[] {
    const statuses: { status: TaskStatus; label: string }[] = [
      { status: 'TODO', label: 'Cần làm' },
      { status: 'IN_PROGRESS', label: 'Đang thực hiện' },
      { status: 'IN_REVIEW', label: 'Chờ duyệt' },
      { status: 'DONE', label: 'Đã hoàn thành' }
    ];

    return statuses
      .map(s => ({
        status: s.status,
        label: s.label,
        tasks: this.tasks.filter(t => t.status === s.status)
      }))
      .filter(g => g.tasks.length > 0);
  }

  getStageName(stageId: string | undefined): string {
    const found = this.stages.find(s => s.id === stageId);
    if (found) return found.name;
    switch (stageId) {
      case 'stage-1': return 'Khảo sát & thiết kế';
      case 'stage-2': return 'Phát triển & kiểm thử';
      case 'stage-3': return 'Hỗ trợ người dùng';
      case 'stage-4': return 'Cải tiến';
      default: return 'Phát triển & kiểm thử';
    }
  }

  getStatusText(status: string | undefined): string {
    switch (status) {
      case 'IN_PROGRESS': return 'Đang thực hiện';
      case 'TODO': return 'Cần làm';
      case 'DONE': return 'Hoàn thành';
      case 'IN_REVIEW': return 'Chờ duyệt';
      case 'FAILED': return 'Thất bại';
      default: return status || 'Cần làm';
    }
  }

  getPriorityText(p: string | undefined): string {
    switch (p) {
      case 'URGENT': return 'Khẩn cấp';
      case 'HIGH': return 'Cao';
      case 'MEDIUM': return 'Trung bình';
      case 'LOW': return 'Thấp';
      default: return p || 'Trung bình';
    }
  }

  formatDueDate(dateStr: string | undefined): string {
    if (!dateStr) return '18/09';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return '18/09';
      const day = d.getDate().toString().padStart(2, '0');
      const month = (d.getMonth() + 1).toString().padStart(2, '0');
      return `${day}/${month}`;
    } catch {
      return '18/09';
    }
  }
}
