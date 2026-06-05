import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService, LoggedInUser } from '../../auth/auth.service';

@Component({
  selector: 'app-task-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './task-layout.html',
  styleUrl: './task-layout.css'
})
export class TaskLayoutComponent {
  user: LoggedInUser | null = null;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }

  isSuperAdmin(): boolean {
    return this.user?.role === 'SUPER_ADMIN';
  }

  isAdmin(): boolean {
    return this.user?.role === 'ADMIN';
  }

  isEmployee(): boolean {
    return this.user?.role === 'EMPLOYEE';
  }

  canViewAdminPages(): boolean {
    return this.user?.role === 'SUPER_ADMIN' || this.user?.role === 'ADMIN';
  }

  logout(): void {
    this.authService.logout();
  }
}
