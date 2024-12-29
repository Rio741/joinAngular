import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [CommonModule, MatButtonModule,
    MatInputModule, MatCardModule, ReactiveFormsModule, MatIconModule, RouterModule,],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})

export class LogInComponent {
  
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
      const { email, password } = this.loginForm.value;
      console.log('Login-Daten:', email, password);
      // Führe hier die Login-Logik aus
    }
  }

  onRegister() {
    console.log('Zur Registrierung weiterleiten');
    // Weiterleitung zur Registrierungsseite
  }

  onForgotPassword() {
    console.log('Passwort-Wiederherstellung ausführen');
    // Logik für Passwort vergessen
  }
}
