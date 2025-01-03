import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-log-in',
  imports: [CommonModule, MatButtonModule,
    MatInputModule, MatCardModule, ReactiveFormsModule, MatIconModule, RouterModule,],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})

export class LogInComponent {

  constructor(private authService: AuthService, private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });


  get emailFormControl() {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordFormControl() {
    return this.loginForm.get('password') as FormControl;
  }

  isLogoAnimationComplete = false;

  onLogoAnimationEnd() {
    this.isLogoAnimationComplete = true;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value as string;
      const password = this.loginForm.get('password')?.value as string;
  
      // AuthService zum Login aufrufen
      this.authService.login(email, password).subscribe(
        response => {
          console.log('response', response);
  
          if (response && response.token) {
            // Speichern der Benutzerinformationen (Token + Benutzerdaten) im localStorage
            const userData = {
              token: response.token,
              username: response.username,
              email: response.email,
            };
            sessionStorage.setItem('user_data', JSON.stringify(userData));
  
            // Optional: Token separat speichern, falls benötigt
            this.authService.setToken(response.token);
  
            // Weiterleitung zur Summary-Seite
            this.router.navigate(['/kanban/summary']);
          } else {
            alert('Falsche Login-Daten!');
          }
        },
        error => {
          alert('Login fehlgeschlagen. Überprüfen Sie Ihre Daten.');
        }
      );
    }
  }
}  
