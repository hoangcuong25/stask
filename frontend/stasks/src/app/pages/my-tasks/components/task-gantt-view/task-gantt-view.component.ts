import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../models/swork.models';

@Component({
  selector: 'app-task-gantt-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-gantt-view.component.html',
  styleUrl: './task-gantt-view.component.scss'
})
export class TaskGanttViewComponent {
  @Input() tasks: Task[] = [];
  @Output() taskSelect = new EventEmitter<Task>();

  onSelect(task: Task): void {
    this.taskSelect.emit(task);
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
