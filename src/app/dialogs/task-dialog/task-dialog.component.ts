import { NgFor, NgIf, NgStyle } from '@angular/common';
import { Component, Inject, model, OnInit, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardContent } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EventEmitter } from 'stream';
import { TaskService } from '../../services/task.service';
import { EditTaskDialogComponent } from '../edit-task-dialog/edit-task-dialog.component';


@Component({
  selector: 'app-task-dialog',
  imports: [NgStyle, NgFor,NgIf, MatCardContent, MatIconModule, MatButtonModule, MatCheckboxModule, FormsModule],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})

export class TaskDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TaskDialogComponent>, private taskService: TaskService, private dialog: MatDialog) {
    this.task = data;
  }
  readonly checked = model(false);
  task: any;

  deleteTask(id: number): void {
    this.dialogRef.close(id);
  }


  inProgressSubtasksCount(subtasks: any[]): number {
    return subtasks.filter(subtask => subtask.status === 'done').length;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  openEditTaskDialog(task: any){
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: task
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result) {
        // Wenn eine ID zurückgegeben wird, lösche den Task
        this.deleteTask(result);
      } else {
        console.log('Dialog wurde ohne Ergebnis geschlossen');
      }
    });
  }

  formatCategoryName(category: string): string {
    // Überprüfen, ob die Kategorie "User_Story" ist
    if (category === 'User_Story') {
      // Ersetze das "_" durch ein Leerzeichen
      return category.replace('_', ' ');
    } else {
      // Andernfalls einfach den Originalwert zurückgeben
      return category;
    }
  }


  updateSubtaskStatus(taskId: number, subtask: any): void {
    // Status basierend auf dem Checkbox-Status setzen
    const newStatus = subtask.status === 'done' ? 'inProgress' : 'done';

    // Subtask-Status aktualisieren
    this.taskService.updateSubtaskStatus(subtask.id, newStatus).subscribe(
        (updatedSubtask) => {
            console.log('Subtask Status erfolgreich aktualisiert:', updatedSubtask);
            // Subtask lokal aktualisieren
            subtask.status = updatedSubtask.status;
        },
        (error) => {
            console.error('Fehler beim Aktualisieren des Subtask-Status:', error);
        }
    );
}

getInitials(contact: any): string {
  let contactName = '';

  if (typeof contact === 'string') {
    contactName = contact; // Wenn es ein String ist
  } else if (typeof contact === 'object' && contact.name) {
    contactName = contact.name; // Wenn es ein Objekt ist, den Namen verwenden
  } else {
    return ''; // Fallback, wenn weder String noch Objekt
  }

  const nameParts = contactName.split(' ');
  const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
  const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || '';
  return `${firstInitial}${lastInitial}`;
}

getContactColor(contact: any): string {
  if (typeof contact === 'object' && contact.color) {
    return contact.color; // Wenn es ein Objekt mit einer Farbe ist
  } else if (typeof contact === 'string') {
  }
  return '#ccc'; // Standardfarbe, wenn nichts gefunden wird
}
  
}
