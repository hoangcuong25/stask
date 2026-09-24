import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, TaskPriority, TaskStatus } from '../../models/swork.models';
import { SworkApiService } from '../../services/swork-api.service';

import { FlxButtonModule } from '@fpt-is/flx-ui/button';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, FlxButtonModule],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent {
  @Input() task!: Task;
  @Output() close = new EventEmitter<void>();
  @Output() closeEvent = new EventEmitter<void>();
  @Output() taskUpdated = new EventEmitter<Task>();

  constructor(private apiService: SworkApiService) {}

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.dismiss();
  }

  dismiss(): void {
    this.close.emit();
    this.closeEvent.emit();
  }

  closeModal(): void {
    this.dismiss();
  }

  onStatusChange(): void {
    this.apiService.updateTaskStatus(this.task.id, this.task.status).subscribe(updated => {
      this.task = updated;
      this.taskUpdated.emit(updated);
    });
  }

  toggleChecklist(item: any): void {
    const newState = !item.isDone;
    this.apiService.toggleChecklist(this.task.id, item.id, newState).subscribe(updated => {
      this.task = updated;
      this.taskUpdated.emit(updated);
    });
  }

  openQuickLog(): void {
    const minutesStr = prompt('Nhập số phút làm việc (vd: 60, 120, 180):', '60');
    if (minutesStr) {
      const minutes = parseInt(minutesStr, 10);
      if (!isNaN(minutes) && minutes > 0) {
        const note = prompt('Ghi chú nội dung công việc:') || '';
        this.apiService.logTime({ taskId: this.task.id, durationMinutes: minutes, note }).subscribe(() => {
          alert('Ghi nhận nhật ký chấm giờ thành công!');
          if (this.task.estimation) {
            this.task.estimation.spentHours += minutes / 60.0;
          }
          this.taskUpdated.emit(this.task);
        });
      }
    }
  }
}
