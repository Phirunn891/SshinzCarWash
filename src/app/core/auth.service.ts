import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, tap } from 'rxjs';
import { enviroment } from '../../environments/environment';

interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    staff: {
      id: string;
      name: string;
      role: string;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl: string = `${enviroment.apiUrl}/auth`

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(credentials: { name: string; pin: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res) => {
        if (res && res.data.token && isPlatformBrowser(this.platformId)) {
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('user_role', res.data.staff.role);
          localStorage.setItem('user_name', res.data.staff.name);
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_role');
      localStorage.removeItem('user_name');
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('auth_token');
    }
    return false;
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  getRole(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('user_role');
    }
    return null;
  }

  getUserName(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('user_name') || 'Admin';
    }
    return 'Admin';
  }
}
