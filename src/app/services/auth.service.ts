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

  private apiUrl = 'http://127.0.0.1:8000/api/auth/';  // URL für den Login-Endpunkt

  constructor(private http: HttpClient, private router: Router) { }

  // Überprüfung, ob der Benutzer eingeloggt ist (Token vorhanden)
  get isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  register(username: string, email: string, password: string, repeated_password: string): Observable<any> {
    const url = `${this.apiUrl}registration/`;  // Spezifische URL für Registrierung
    return this.http.post<any>(url, { username, email, password, repeated_password });
  }

 // Login-Methode
 login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}login/`;  // Spezifische URL für Login
    const payload = { email, password };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(url, payload, { headers });
  }


  // Token speichern
  setToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  // Token löschen (Logout)
  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  // Token aus LocalStorage holen
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}
