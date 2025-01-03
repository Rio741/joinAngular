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
  userInitials: string = '';  // Initialisieren der userInitials mit einem leeren String
  convertedName: string = '';  // Initialisieren von convertedName als leeren String

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();  // Daten laden
  }

  // Methode, um die Benutzerdaten zu laden
  loadUserData(): void {
    const storedUserData = sessionStorage.getItem('user_data');  // Der Schlüssel, unter dem du die Daten gespeichert hast

    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);  // Daten parsen und speichern
      console.log('Benutzerdaten:', this.userData);
      this.covertUsername();  // Nachdem die Daten geladen sind, den Namen umwandeln
      this.getInitials();  // Berechne die Initialen des Benutzernamens
    } else {
      console.log('Keine Benutzerdaten im sessionStorage gefunden');
    }
  }

  // Methode zur Umwandlung des Benutzernamens
  covertUsername(): void {
    let username = this.userData.username;
    if (username) {
      this.convertedName = username.replace(/_/g, ' ');  // Unterstriche durch Leerzeichen ersetzen
    }
  }

  // Berechne die Initialen aus dem Benutzernamen
  getInitials(): void {
    const nameParts = this.convertedName.split(' ');  // Benutzernamen in Teile aufsplitten
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';  // Erste Initiale
    const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || '';   // Zweite Initiale
    this.userInitials = firstInitial + lastInitial;  // Initialen zusammenfügen
  }

  // Logout-Methode
  logout(): void {
    this.authService.logout();
  }
}
