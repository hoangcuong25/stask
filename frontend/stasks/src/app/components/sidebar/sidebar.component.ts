import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SworkApiService } from '../../services/swork-api.service';
import { User } from '../../models/swork.models';

import { FlxButtonModule } from '@fpt-is/flx-ui/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FlxButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  currentUser!: User;

  constructor(private apiService: SworkApiService) {}

  ngOnInit(): void {
    this.apiService.currentUser$.subscribe(u => {
      this.currentUser = u;
    });
  }
}
