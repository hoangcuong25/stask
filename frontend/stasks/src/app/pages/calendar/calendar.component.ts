import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/swork.models';
import { SworkApiService } from '../../services/swork-api.service';

interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  tasks: Task[];
  events: any[];
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  calendarYear = 2026;
  calendarMonth = 8; // September
  calendarDays: CalendarDay[] = [];
  tasks: Task[] = [];

  events = [
    { title: 'Họp Sprint Review & Kế hoạch Sprint 2', time: '14:00 - 15:30', location: 'Phòng họp Tầng 4 / MS Teams', type: 'MEETING', date: 23 },
    { title: 'Kiểm tra tiến độ deploy MongoDB staging', time: '16:00', location: 'Trực tuyến', type: 'REMINDER', date: 24 }
  ];

  plans = [
    { period: 'Kế hoạch Tuần 38', title: 'Hoàn tất giao diện 4 tab My Tasks và Kanban stages', notes: 'Phối hợp với Tuấn và Hoa nghiệm thu tài liệu CSDL' },
    { period: 'Kế hoạch Tháng 10', title: 'Golive phiên bản thử nghiệm nội bộ', notes: 'Đạt SLA tốc độ phản hồi truy vấn dưới 50ms' }
  ];

  constructor(private apiService: SworkApiService) {}

  ngOnInit(): void {
    this.apiService.getTasks({}).subscribe(res => {
      this.tasks = res.content || [];
      this.buildCalendar();
    });
  }

  buildCalendar(): void {
    const days: CalendarDay[] = [];
    const year = this.calendarYear;
    const month = this.calendarMonth;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    let startOffset = firstDay.getDay() - 1;
    if (startOffset === -1) startOffset = 6;

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startOffset - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthLastDay - i);
      days.push({
        date: d,
        dayNumber: d.getDate(),
        isCurrentMonth: false,
        isToday: false,
        tasks: [],
        events: []
      });
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
      const dateObj = new Date(year, month, d);
      const isToday = (d === 23);
      const dayTasks = this.tasks.filter(t => {
        if (!t.dueDate) return false;
        const dueD = new Date(t.dueDate).getDate();
        return dueD === d;
      });
      const dayEvents = this.events.filter(e => e.date === d);

      days.push({
        date: dateObj,
        dayNumber: d,
        isCurrentMonth: true,
        isToday: isToday,
        tasks: dayTasks,
        events: dayEvents
      });
    }

    const totalSlots = days.length <= 35 ? 35 : 42;
    const remaining = totalSlots - days.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      days.push({
        date: d,
        dayNumber: i,
        isCurrentMonth: false,
        isToday: false,
        tasks: [],
        events: []
      });
    }

    this.calendarDays = days;
  }

  prevMonth(): void {
    if (this.calendarMonth === 0) {
      this.calendarMonth = 11;
      this.calendarYear--;
    } else {
      this.calendarMonth--;
    }
    this.buildCalendar();
  }

  nextMonth(): void {
    if (this.calendarMonth === 11) {
      this.calendarMonth = 0;
      this.calendarYear++;
    } else {
      this.calendarMonth++;
    }
    this.buildCalendar();
  }

  goToToday(): void {
    this.calendarYear = 2026;
    this.calendarMonth = 8;
    this.buildCalendar();
  }

  getMonthName(): string {
    const names = [
      'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4',
      'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8',
      'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];
    return `${names[this.calendarMonth]}, ${this.calendarYear}`;
  }
}
