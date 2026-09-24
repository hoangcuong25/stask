import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlxButtonModule } from '@fpt-is/flx-ui/button';

export type ViewMode = 'DEFAULT' | 'TABLE' | 'KANBAN' | 'CALENDAR' | 'USER' | 'STATUS' | 'GANTT';

@Component({
  selector: 'app-task-filter-bar',
  standalone: true,
  imports: [CommonModule, FormsModule, FlxButtonModule],
  templateUrl: './task-filter-bar.component.html',
  styleUrl: './task-filter-bar.component.scss'
})
export class TaskFilterBarComponent {
  @Input() searchKeyword = '';
  @Input() selectedType = '';
  @Input() selectedStatus = '';
  @Input() selectedPriority = '';
  @Input() selectedAssignee = '';
  @Input() currentViewMode: ViewMode = 'DEFAULT';
  @Input() viewModeLabel = 'Mặc định';

  @Output() searchChange = new EventEmitter<string>();
  @Output() typeChange = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<string>();
  @Output() priorityChange = new EventEmitter<string>();
  @Output() assigneeChange = new EventEmitter<string>();
  @Output() viewModeChange = new EventEmitter<ViewMode>();

  showViewMenu = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    if (!target.closest('.view-switcher-container')) {
      this.showViewMenu = false;
    }
  }

  onSearchChange(): void {
    this.searchChange.emit(this.searchKeyword);
  }

  onTypeChange(): void {
    this.typeChange.emit(this.selectedType);
  }

  onStatusChange(): void {
    this.statusChange.emit(this.selectedStatus);
  }

  onPriorityChange(): void {
    this.priorityChange.emit(this.selectedPriority);
  }

  onAssigneeChange(): void {
    this.assigneeChange.emit(this.selectedAssignee);
  }

  toggleViewMenu(): void {
    this.showViewMenu = !this.showViewMenu;
  }

  selectViewMode(mode: ViewMode): void {
    this.viewModeChange.emit(mode);
    this.showViewMenu = false;
  }
}
