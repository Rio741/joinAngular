import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-summary',
  imports: [RouterModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent implements OnInit {

  userData: any;
  convertedName: any;

  ngOnInit(): void {
    this.loadUserData();
    this.covertUsername();
  }

  covertUsername() {
    let username = this.userData.username;
    this.convertedName = username.replace(/_/g, ' ');
  }

  loadUserData(): void {
    const storedUserData = sessionStorage.getItem('user_data');

    if (storedUserData) {
      this.userData = JSON.parse(storedUserData);
      console.log('Benutzerdaten:', this.userData);
    } else {
      console.log('Keine Benutzerdaten im localStorage gefunden');
    }
  }

  

}
