import { Component, NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task-dialog',
  providers: [provideNativeDateAdapter(), TaskService],
  imports: [MatSelectModule, MatButtonModule, MatIconModule, MatInputModule,
      MatFormFieldModule, MatListModule, CommonModule, FormsModule, MatSelectModule,
      MatCheckboxModule, MatButtonToggleModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss'
})
export class AddTaskDialogComponent {
  task: Task;
  constructor(private taskService: TaskService, public dialogRef: MatDialogRef<AddTaskDialogComponent>) {
    this.task = new Task(
      '',
      '',
      [],
      null,
      'medium',
      '',
      []
    );
  }

  contacts: string[] = ['Rio Stenger', 'Peter Parker', 'Siomon Paulaner', 'Frank Homm', 'Sneaker rigo'];
  selectedContacts: string[] = [];


  myFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const date = (d || new Date());
    date.setHours(0, 0, 0, 0);

    return date >= today;
  };

  formattingDate() {
    if (this.task.dueDate) {
      const formattedDate = this.task.dueDate.toISOString().split('T')[0];
      this.task.dueDate = formattedDate as unknown as Date;
    }
  }

  onSubmit(form: any) {
    console.log(this.task)
    this.formattingDate();

    if (form.valid) {
      this.taskService.createTask(this.task).subscribe({
        next: (response) => {
          console.log('Task created successfully:', response);
        },
        error: (error) => {
          console.error('Error creating task:', error);
        }
      });
    }
  }

  clearForm(form: any) {
    form.resetForm();
    this.task = new Task(
      '',
      '',
      [],
      null,
      'medium',
      '',
      []
    );
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}



