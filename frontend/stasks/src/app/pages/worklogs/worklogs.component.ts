import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task, Worklog } from '../../models/swork.models';
import { SworkApiService } from '../../services/swork-api.service';

@Component({
  selector: 'app-worklogs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './worklogs.component.html',
  styleUrl: './worklogs.component.scss'
})
export class WorklogsComponent implements OnInit {
  worklogs: Worklog[] = [];
  showModal = false;
  availableTasks: Task[] = [];

  selectedTaskId = '';
  durationMinutes = 180;
  note = '';

  constructor(private apiService: SworkApiService) {}

  ngOnInit(): void {
    this.apiService.getWorklogs().subscribe(res => {
      this.worklogs = res;
    });
    this.apiService.getTasks({}).subscribe(res => {
      this.availableTasks = res.content;
      if (this.availableTasks.length > 0) {
        this.selectedTaskId = this.availableTasks[0].id;
      }
    });
  }

  getTotalHours(): string {
    const totalMinutes = this.worklogs.reduce((acc, wl) => acc + (wl.durationMinutes || 0), 0);
    return (totalMinutes / 60).toFixed(1);
  }

  openLogModal(): void {
    this.showModal = true;
  }

  submitWorklog(): void {
    if (!this.selectedTaskId) return;
    this.apiService.logTime({
      taskId: this.selectedTaskId,
      durationMinutes: this.durationMinutes,
      note: this.note
    }).subscribe(saved => {
      this.worklogs.unshift(saved);
      this.showModal = false;
      this.note = '';
      alert('Đã lưu chấm giờ thành công!');
    });
  }
}
