import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoggedInUser {
  userId: string;
  fullName: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EMPLOYEE';
  employeeType: 'DESIGNER' | 'VIDEO_EDITOR' | 'VIDEOGRAPHER' | null;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    userId: string;
    fullName: string;
    role: 'SUPER_ADMIN' | 'ADMIN' | 'EMPLOYEE';
    employeeType: 'DESIGNER' | 'VIDEO_EDITOR' | 'VIDEOGRAPHER' | null;
    status: 'ACTIVE' | 'INACTIVE';
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api';
  private readonly TOKEN_KEY = 'internal_ops_token';
  private readonly USER_KEY = 'internal_ops_user';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/auth/login`, request)
      .pipe(
        tap((response) => {
          if (response.success && response.data?.token) {
            localStorage.setItem(this.TOKEN_KEY, response.data.token);

            const user: LoggedInUser = {
              userId: response.data.userId,
              fullName: response.data.fullName,
              role: response.data.role,
              employeeType: response.data.employeeType,
              status: response.data.status
            };

            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          }
        })
      );
  }
  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): LoggedInUser | null {
    const userJson = localStorage.getItem(this.USER_KEY);

    if (!userJson) {
      return null;
    }

    try {
      return JSON.parse(userJson) as LoggedInUser;
    } catch {
      this.logout();
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }

  hasRole(allowedRoles: string[]): boolean {
    const user = this.getCurrentUser();

    if (!user) {
      return false;
    }

    return allowedRoles.includes(user.role);
  }
}
