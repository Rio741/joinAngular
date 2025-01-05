import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddContactDialogComponent } from '../../dialogs/add-contact-dialog/add-contact-dialog.component';
import { EditContactDialogComponent } from '../../dialogs/edit-contact-dialog/edit-contact-dialog.component';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';



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

export class ContactsComponent implements OnInit {

  constructor(private dialog: MatDialog, private contactService: ContactService) { }

  contacts: Contact[] = [];
  selectedContact: Contact | null = null;
  buttonVisible: boolean = false;

  ngOnInit(): void {
    this.loadContacts();
  }

  handleContactCreated(newContact: Contact): void {
    this.loadContacts(); // Kontakte neu laden
    this.showSlideInButton(); // Button anzeigen
  }

  showSlideInButton(): void {
    this.buttonVisible = true; // Button sichtbar machen
    setTimeout(() => {
      this.buttonVisible = false; // Button nach 3 Sekunden ausblenden (optional)
    }, 3000); // 3 Sekunden Timer
  }

  loadContacts(): void {
    this.contactService.getContacts().subscribe(
      (data) => {
        this.contacts = data;
      },
      (error) => {
        console.error('Fehler beim Laden der Kontakte', error);
      }
    );
  }

  deleteContact(contact: Contact): void {
    this.contactService.deleteContact(contact.id).subscribe(
      () => {
        this.contacts = this.contacts.filter(c => c.id !== contact.id);
        console.log(`Kontakt ${contact.name} wurde gelöscht.`);
      },
      (error) => {
        console.error('Fehler beim Löschen des Kontakts', error);
      }
    );

  }

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

  openAddContactDialog(): void {
    const dialogRef = this.dialog.open(AddContactDialogComponent);

    dialogRef.afterClosed().subscribe((newContact: Contact | undefined) => {
      if (newContact) {
        this.handleContactCreated(newContact); // Neuer Kontakt wird verarbeitet
      }
    });
  }
  

  openEditContactDialog(): void {
    const dialogRef = this.dialog.open(EditContactDialogComponent, {
      data: this.selectedContact,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog geschlossen mit Ergebnis:', result);
        this.loadContacts();
      } else {
        console.log('Dialog geschlossen ohne Ergebnis.');
      }
    });
  }
}
