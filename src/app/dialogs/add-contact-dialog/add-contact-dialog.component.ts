import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-contact-dialog',
  imports: [MatFormField, MatIconModule, CommonModule, MatInputModule, MatButtonModule],
  templateUrl: './add-contact-dialog.component.html',
  styleUrl: './add-contact-dialog.component.scss'
})
export class AddContactDialogComponent {
constructor( public dialogRef: MatDialogRef<AddContactDialogComponent>){}

  closeDialog(): void {
    this.dialogRef.close();
  }
}
