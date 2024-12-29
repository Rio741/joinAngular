import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatCardModule, ReactiveFormsModule, MatIconModule, RouterModule, MatCheckboxModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})

export class SignUpComponent {
  isChecked = false;
  signupForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
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

  get nameFormControl() {
    return this.signupForm.get('name') as FormControl;
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
      const { name, email, password } = this.signupForm.value;
      console.log('Signup data:', { name, email, password });
      // Hier Registrierungslösung einfügen
    } else {
      console.log('Form is invalid');
    }
  }

  onRegister() {
    console.log('Redirect to registration page');
  }

  onForgotPassword() {
    console.log('Execute forgot password logic');
  }
}
