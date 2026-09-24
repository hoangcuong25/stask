import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CreateTaskModalComponent } from './components/create-task-modal/create-task-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent, CreateTaskModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  isEmbeddedInRoot = false;

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      // Tự động nhận diện khi nhúng trong FIS Root-config (localhost:9000 hoặc single-spa)
      this.isEmbeddedInRoot =
        !!(window as any).singleSpaNavigate ||
        window.location.port === '9000' ||
        window.location.pathname.startsWith('/swork') ||
        window !== window.top;
    }
  }
}

