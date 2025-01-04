import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatCardModule, ReactiveFormsModule, MatIconModule, RouterModule, MatCheckboxModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})

export class SignUpComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isChecked = false;
  signupForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required, Validators.minLength(3),this.nameValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: this.matchPasswordValidator.bind(this) }
  );

  matchPasswordValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

   // Benutzerdefinierte Validierung für den Namen
   nameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    // Überprüfen, ob der Name aus mindestens zwei Wörtern besteht
    const namePattern = /^[a-zA-Z]+(\s[a-zA-Z]+)+$/;
    return namePattern.test(value) ? null : { invalidName: true };
  }

  get nameFormControl() {
    return this.signupForm.get('username') as FormControl;
  }

  get emailFormControl() {
    return this.signupForm.get('email') as FormControl;
  }

  get passwordFormControl() {
    return this.signupForm.get('password') as FormControl;
  }

  get confirmPasswordFormControl() {
    return this.signupForm.get('confirmPassword') as FormControl;
  }

  onCheckboxChange(event: any) {
    console.log('Checkbox status:', event.checked);
    this.isChecked = event.checked;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const { username, email, password, confirmPassword } = this.signupForm.value;
      console.log('Signup data:', { username, email, password, confirmPassword });
      // Hier Registrierungslösung einfügen
    } else {
      console.log('Form is invalid');
    }
  }

  covertUsername() {
    let username = this.signupForm.get('username')?.value as string;
    const result = username.replace(/\s+/g, '_');
    return result;
  }
  
  onRegister() {
    if (this.signupForm.valid && this.isChecked) {
      const username = this.covertUsername();
      const email = this.signupForm.get('email')?.value as string;
      const password = this.signupForm.get('password')?.value as string;
      const confirmPassword = this.signupForm.get('confirmPassword')?.value as string;
      
      // AuthService für Registrierung aufrufen
      this.authService.register(username, email, password, confirmPassword).subscribe(
        (response) => {
          console.log('Registrierung erfolgreich', response);
          const userData = {
            token: response.token,
            username: response.username,
            email: response.email,
          };
          sessionStorage.setItem('user_data', JSON.stringify(userData));
          this.authService.setToken(response.token);
          this.authService.setLoggedIn(true);
          this.router.navigate(['/kanban/summary']);
        },
        (error) => {
          console.error('Fehler bei der Registrierung', error);
          alert('Die Registrierung ist fehlgeschlagen. Bitte versuchen Sie es später erneut.');
        }
      );
    } else {
      alert('Bitte akzeptieren Sie die Datenschutzrichtlinie und stellen Sie sicher, dass alle Felder korrekt ausgefüllt sind.');
    }
  }
}
