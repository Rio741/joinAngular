import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, MatButtonModule, MatMenuModule, RouterModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit {
  userData: any;
  userInitials: string = '';
  convertedName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    const storedUserData = sessionStorage.getItem('user_data');
    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      this.convertUsername();
      this.getInitials();
    }
  }

  private convertUsername(): void {
    const username = this.userData.username;
    if (username) {
      this.convertedName = username.replace(/_/g, ' ');
    }
  }

  private getInitials(): void {
    const nameParts = this.convertedName.split(' ');
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
    const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || '';
    this.userInitials = firstInitial + lastInitial;
  }

  logout(): void {
    this.authService.logout();
  }
}
