import { Component } from '@angular/core';
import {AuthService, LoggedInUser} from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  user: LoggedInUser | null = null;

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }

  isSuperAdmin(): boolean {
    return this.user?.role === 'SUPER_ADMIN';
  }

  canViewAdminPages(): boolean {
    return this.user?.role === 'SUPER_ADMIN' || this.user?.role === 'ADMIN';
  }

  isEmployee(): boolean {
    return this.user?.role === 'EMPLOYEE';
  }
}
