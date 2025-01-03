import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api/auth/';

  constructor(private http: HttpClient, private router: Router) {}

  get isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  register(username: string, email: string, password: string, repeated_password: string): Observable<any> {
    const url = `${this.apiUrl}registration/`;
    return this.http.post<any>(url, { username, email, password, repeated_password });
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}login/`;
    const payload = { email, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post<any>(url, payload, { headers });
  }

  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
