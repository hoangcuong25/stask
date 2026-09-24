import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../../../models/swork.models';
import { FlxButtonModule } from '@fpt-is/flx-ui/button';

export interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  tasks: Task[];
}

@Component({
  selector: 'app-task-calendar-view',
  standalone: true,
  imports: [CommonModule, FlxButtonModule],
  templateUrl: './task-calendar-view.component.html',
  styleUrl: './task-calendar-view.component.scss'
})
export class TaskCalendarViewComponent implements OnInit, OnChanges {
  @Input() tasks: Task[] = [];
  @Input() calendarYear = 2026;
  @Input() calendarMonth = 8; // September

  @Output() taskSelect = new EventEmitter<Task>();
  @Output() monthChange = new EventEmitter<{ year: number; month: number }>();

  calendarDays: CalendarDay[] = [];

  ngOnInit(): void {
    this.rebuildCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks'] || changes['calendarYear'] || changes['calendarMonth']) {
      this.rebuildCalendar();
    }
  }

  rebuildCalendar(): void {
    const days: CalendarDay[] = [];
    const year = this.calendarYear;
    const month = this.calendarMonth;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Monday is 0, Sunday is 6
    let startOffset = firstDay.getDay() - 1;
    if (startOffset === -1) startOffset = 6;

    // Previous month filler days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date: d,
        dayNumber: d.getDate(),
        isCurrentMonth: false,
        isToday: false,
        tasks: this.getTasksForDate(d)
      });
    }

    // Current month days
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const dateObj = new Date(year, month, d);
      const isToday = (
        year === 2026 &&
        month === 8 &&
        d === 24
      );
      days.push({
        date: dateObj,
        dayNumber: d,
        isCurrentMonth: true,
        isToday: isToday,
        tasks: this.getTasksForDate(dateObj)
      });
    }

    // Next month filler days to complete 35 or 42 slots
    const totalSlots = days.length <= 35 ? 35 : 42;
    const remaining = totalSlots - days.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      days.push({
        date: d,
        dayNumber: i,
        isCurrentMonth: false,
        isToday: false,
        tasks: this.getTasksForDate(d)
      });
    }

    this.calendarDays = days;
  }

  getTasksForDate(date: Date): Task[] {
    const dStr = date.getDate().toString().padStart(2, '0');
    const mStr = (date.getMonth() + 1).toString().padStart(2, '0');
    const target = `${dStr}/${mStr}`;

    return this.tasks.filter(t => {
      const due = this.formatDueDate(t.dueDate);
      return due === target;
    });
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

  prevMonth(): void {
    if (this.calendarMonth === 0) {
      this.calendarMonth = 11;
      this.calendarYear--;
    } else {
      this.calendarMonth--;
    }
    this.rebuildCalendar();
    this.monthChange.emit({ year: this.calendarYear, month: this.calendarMonth });
  }

  nextMonth(): void {
    if (this.calendarMonth === 11) {
      this.calendarMonth = 0;
      this.calendarYear++;
    } else {
      this.calendarMonth++;
    }
    this.rebuildCalendar();
    this.monthChange.emit({ year: this.calendarYear, month: this.calendarMonth });
  }

  goToToday(): void {
    this.calendarYear = 2026;
    this.calendarMonth = 8;
    this.rebuildCalendar();
    this.monthChange.emit({ year: this.calendarYear, month: this.calendarMonth });
  }

  getCalendarMonthName(): string {
    const months = [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
      'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
      'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];
    return `${months[this.calendarMonth]}, ${this.calendarYear}`;
  }

  onSelect(task: Task): void {
    this.taskSelect.emit(task);
  }
}
