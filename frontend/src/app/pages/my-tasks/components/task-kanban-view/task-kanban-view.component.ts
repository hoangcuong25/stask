import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task, TaskPriority, TaskStatus } from '../../../../models/swork.models';
import { FlxButtonModule } from '@fpt-is/flx-ui/button';

export interface KanbanColumn {
  status: TaskStatus;
  label: string;
  badgeClass: string;
  tasks: Task[];
}

@Component({
  selector: 'app-task-kanban-view',
  standalone: true,
  imports: [CommonModule, FlxButtonModule],
  templateUrl: './task-kanban-view.component.html',
  styleUrl: './task-kanban-view.component.scss'
})
export class TaskKanbanViewComponent {
  @Input() tasks: Task[] = [];
  @Output() taskSelect = new EventEmitter<Task>();
  @Output() taskStatusChange = new EventEmitter<{ task: Task; newStatus: TaskStatus }>();

  getKanbanColumns(): KanbanColumn[] {
    const cols: { status: TaskStatus; label: string; badgeClass: string }[] = [
      { status: 'TODO', label: 'Cần làm', badgeClass: 'status-todo' },
      { status: 'IN_PROGRESS', label: 'Đang thực hiện', badgeClass: 'status-in_progress' },
      { status: 'IN_REVIEW', label: 'Chờ xét duyệt', badgeClass: 'status-in_review' },
      { status: 'DONE', label: 'Hoàn thành', badgeClass: 'status-done' }
    ];

    return cols.map(c => ({
      ...c,
      tasks: this.tasks.filter(t => t.status === c.status)
    }));
  }

  moveTaskNext(task: Task, event: MouseEvent): void {
    event.stopPropagation();
    const order: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];
    const idx = order.indexOf(task.status);
    if (idx < order.length - 1) {
      const nextStatus = order[idx + 1];
      this.taskStatusChange.emit({ task, newStatus: nextStatus });
    }
  }

  moveTaskPrev(task: Task, event: MouseEvent): void {
    event.stopPropagation();
    const order: TaskStatus[] = ['TODO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE'];
    const idx = order.indexOf(task.status);
    if (idx > 0) {
      const prevStatus = order[idx - 1];
      this.taskStatusChange.emit({ task, newStatus: prevStatus });
    }
  }

  onSelect(task: Task): void {
    this.taskSelect.emit(task);
  }

  getPriorityColor(p: string | undefined): string {
    switch (p) {
      case 'URGENT': return '#F04438';
      case 'HIGH': return '#F79009';
      case 'MEDIUM': return '#0F63D1';
      case 'LOW': return '#667085';
      default: return '#0F63D1';
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
