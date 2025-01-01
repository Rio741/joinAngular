import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-contact-dialog',
  imports: [MatFormField, MatIconModule, CommonModule, MatInputModule, MatButtonModule, FormsModule],
  templateUrl: './edit-contact-dialog.component.html',
  styleUrl: './edit-contact-dialog.component.scss'
})

export class EditContactDialogComponent {
  contact: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<EditContactDialogComponent>) {
    this.contact = { ...data }; // Daten klonen, um das Original nicht zu überschreiben
  }

  saveChanges() {
    this.dialogRef.close(this.contact); // Gibt die geänderten Daten zurück
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
