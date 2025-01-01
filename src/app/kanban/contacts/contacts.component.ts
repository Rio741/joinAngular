import { CommonModule, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddContactDialogComponent } from '../../dialogs/add-contact-dialog/add-contact-dialog.component';
import { EditContactDialogComponent } from '../../dialogs/edit-contact-dialog/edit-contact-dialog.component';

export interface Contact {
  name: string;
  email: string;
}

@Component({
  selector: 'app-contacts',
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    NgForOf,
    MatCardModule,
  ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})

export class ContactsComponent {
constructor(private dialog: MatDialog) {}

openAddContactDialog() {
    const dialogRef = this.dialog.open(AddContactDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog geschlossen mit Ergebnis:', result);
      } else {
        console.log('Dialog geschlossen ohne Ergebnis.');
      }
    });
  }

  openEditContactDialog(){
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      data: this.selectedContact,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog geschlossen mit Ergebnis:', result);
      } else {
        console.log('Dialog geschlossen ohne Ergebnis.');
      }
    });
  }


  contacts: Contact[] = [
    { name: 'Alice Smith', email: 'alice@gmx.de' },
    { name: 'John Doe', email: 'john@gmx.de' },
    { name: 'Charlie Brown', email: 'charlie@gmx.de' },
    { name: 'Bob Martin', email: 'bob@gmx.de' },
    { name: 'Alice Smith', email: 'alice@gmx.de' },
    { name: 'John Doe', email: 'john@gmx.de' },
    { name: 'Charlie Brown', email: 'charlie@gmx.de' },
    { name: 'Bob Martin', email: 'bob@gmx.de' },
  ];

  selectedContact: Contact | null = null;


  get groupedContacts(): { [key: string]: Contact[] } {
    return this.contacts
      .sort((a, b) => a.name.localeCompare(b.name))
      .reduce((groups: { [key: string]: Contact[] }, contact: Contact) => {
        const firstLetter = contact.name.charAt(0).toUpperCase();
        if (!groups[firstLetter]) {
          groups[firstLetter] = [];
        }
        groups[firstLetter].push(contact);
        return groups;
      }, {});
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  }

}
