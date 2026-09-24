import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Project, ProjectStage, Task, TaskStatus } from '../../models/swork.models';
import { SworkApiService } from '../../services/swork-api.service';
import { TaskModalComponent } from '../task-modal/task-modal.component';

import { FlxButtonModule } from '@fpt-is/flx-ui/button';

@Component({
  selector: 'app-projects-space',
  standalone: true,
  imports: [CommonModule, FormsModule, FlxButtonModule, TaskModalComponent],
  templateUrl: './projects-space.component.html',
  styleUrl: './projects-space.component.scss'
})
export class ProjectsSpaceComponent implements OnInit {
  currentProject: Project | null = null;
  allProjectTasks: Task[] = [];
  activeSubTab: 'KANBAN' | 'LIST' | 'DISCUSSIONS' | 'DOCUMENTS' | 'GOALS' | 'SETTINGS' = 'KANBAN';
  selectedTask: Task | null = null;
  newComment = '';

  sampleComments = [
    { user: 'NL', name: 'Nguyễn Lan', time: '10:15 Hôm nay', text: 'Đã cập nhật tài liệu thiết kế CSDL MongoDB với 12 collections và hệ thống chỉ mục < 50ms.' },
    { user: 'TT', name: 'Trần Tuấn', time: '10:30 Hôm nay', text: 'Backend Spring Boot 3 đã hoàn tất biên dịch 75 files thành công với 0 cảnh báo!' }
  ];

  sampleDocs = [
    { name: 'Tai_lieu_thiet_ke_CSDL_MongoDB_sWork.pdf', size: '1.2 MB', by: 'Nguyễn Lan' },
    { name: 'Architecture_Blueprint_Sprint_1.docx', size: '850 KB', by: 'Trần Tuấn' }
  ];

  sampleGoals = [
    { title: 'Hoàn thành bàn giao phiên bản MVP sWork trong tháng 10/2026', targetDate: '02/10/2026', status: 'IN_PROGRESS' },
    { title: 'Đảm bảo tốc độ truy vấn cơ sở dữ liệu MongoDB đạt < 50ms', targetDate: '15/10/2026', status: 'IN_PROGRESS' }
  ];

  constructor(private apiService: SworkApiService) {}

  ngOnInit(): void {
    this.apiService.getProjects().subscribe(projects => {
      if (projects && projects.length > 0) {
        this.currentProject = projects[0];
        this.loadProjectTasks(this.currentProject.id);
      }
    });
  }

  loadProjectTasks(projectId: string): void {
    this.apiService.getTasks({ projectId }).subscribe(res => {
      this.allProjectTasks = res.content;
    });
  }

  getTasksForStage(stageId: string): Task[] {
    return this.allProjectTasks.filter(t => t.stageId === stageId);
  }

  getStageName(stageId: string): string {
    const s = this.currentProject?.stages.find(st => st.id === stageId);
    return s ? s.name : stageId;
  }

  quickCreateTaskInStage(stageId: string): void {
    const title = prompt('Nhập tiêu đề công việc mới:');
    if (title && this.currentProject) {
      this.apiService.createTask({
        title,
        projectId: this.currentProject.id,
        stageId,
        status: 'TODO',
        priority: 'MEDIUM'
      }).subscribe(created => {
        this.allProjectTasks.push(created);
        if (this.currentProject) {
          this.currentProject.stats.totalTasks++;
          this.currentProject.stats.todoTasks++;
        }
      });
    }
  }

  sendComment(): void {
    if (this.newComment.trim()) {
      this.sampleComments.unshift({
        user: 'NL',
        name: 'Nguyễn Lan',
        time: 'Vừa xong',
        text: this.newComment.trim()
      });
      this.newComment = '';
    }
  }

  saveSettings(): void {
    if (this.currentProject) {
      this.apiService.updateProjectSettings(this.currentProject.id, this.currentProject.settings).subscribe(() => {
        alert('Đã lưu cấu hình thiết lập dự án thành công!');
      });
    }
  }

  closeTaskModal(): void {
    this.selectedTask = null;
  }

  onTaskUpdated(updated: Task): void {
    const idx = this.allProjectTasks.findIndex(t => t.id === updated.id);
    if (idx !== -1) {
      this.allProjectTasks[idx] = updated;
    }
  }
}
