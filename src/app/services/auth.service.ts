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
  private loggedIn: boolean = false;

  private apiUrl = 'http://127.0.0.1:8000/api/auth/';

  constructor(private http: HttpClient, private router: Router) {}

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
 
  setLoggedIn(status: boolean): void {
    this.loggedIn = status;
    sessionStorage.setItem('loggedIn', JSON.stringify(status)); // Speichert als String
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
    sessionStorage.setItem('access_token', token);
  }

  logout(): void {
    sessionStorage.removeItem('access_token'); // Entfernt das Access Token
    sessionStorage.removeItem('loggedIn');    // Entfernt den gespeicherten Anmeldestatus
    this.loggedIn = false;                    // Setzt den Status zurück
    this.router.navigate(['/login']);         // Navigiert zur Login-Seite
  }
  

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Initialisiert den Login-Status beim Start der Anwendung
  initializeLoggedInStatus(): void {
    const storedStatus = sessionStorage.getItem('loggedIn');
    const storedToken = sessionStorage.getItem('access_token');
    
    // Wenn der Login-Status "true" ist und ein Token existiert, ist der Benutzer eingeloggt
    if (storedStatus === 'true' && storedToken) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  // Prüft ob der Benutzer eingeloggt ist
  checkLoginStatus(): void {
    this.initializeLoggedInStatus();
  }
}
