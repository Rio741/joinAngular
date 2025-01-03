import { NgFor, NgStyle } from '@angular/common';
import { Component, Inject, model, OnInit, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardContent } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EventEmitter } from 'stream';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-task-dialog',
  imports: [NgStyle, NgFor, MatCardContent, MatIconModule, MatButtonModule, MatCheckboxModule, FormsModule],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})

export class TaskDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<TaskDialogComponent>, private taskService: TaskService) {
    this.task = data;
  }
  readonly checked = model(false);
  task: any;

  deleteTask(id: number): void {
    this.dialogRef.close(id);
  }

  getInitials(contactName: string): string {
    const nameParts = contactName.split(' ');
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
    const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  }

  inProgressSubtasksCount(subtasks: any[]): number {
    return subtasks.filter(subtask => subtask.status === 'done').length;
  }

  closeDialog(): void {
    this.dialogRef.close();
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

  
}
