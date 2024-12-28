import { Routes } from '@angular/router';
import { LogInComponent } from './login/log-in/log-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';

export const routes: Routes = [
    { path: '', component: LogInComponent },
    { path: 'sign-up', component: SignUpComponent },
];
