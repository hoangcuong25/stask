import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SworkApiService } from '../../services/swork-api.service';
import { User } from '../../models/swork.models';

import { FlxButtonModule } from '@fpt-is/flx-ui/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, FlxButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  searchKeyword = '';
  showDropdown = false;
  currentUser!: User;
  users: User[] = [];

  constructor(private apiService: SworkApiService) {}

  ngOnInit(): void {
    this.apiService.currentUser$.subscribe(u => {
      this.currentUser = u;
    });
    this.apiService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  selectUser(user: User): void {
    this.currentUser = user;
    this.apiService.setCurrentUser(user);
    this.showDropdown = false;
  }

  onSearch(): void {
    if (this.searchKeyword.trim()) {
      window.dispatchEvent(new CustomEvent('swork-search', { detail: this.searchKeyword.trim() }));
    }
  }

  onCreateQuickTask(): void {
    window.dispatchEvent(new CustomEvent('swork-open-create-task'));
  }
}
