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
  selector: 'app-edit-task-dialog',
  providers: [provideNativeDateAdapter(), TaskService],
  imports: [MatSelectModule, MatButtonModule, MatIconModule, MatInputModule,
    MatFormFieldModule, MatListModule, CommonModule, FormsModule, MatSelectModule,
    MatCheckboxModule, MatButtonToggleModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './edit-task-dialog.component.html',
  styleUrl: './edit-task-dialog.component.scss'
})
export class EditTaskDialogComponent {
  task: Task;
  isInputFocused: boolean = false;
  contacts: string[] = ['Rio Stenger', 'Peter Parker', 'Siomon Paulaner', 'Frank Homm', 'Sneaker rigo'];
  selectedContacts: string[] = [];
  newSubtask: string = '';
  newSubtasks: string[] = [];
  AnewSubtasks: { title: string, status: 'in-progress' | 'completed' }[] = []; 
  editingIndex: number | null = null;
  
 
  constructor(private taskService: TaskService, public dialogRef: MatDialogRef<EditTaskDialogComponent>) {
    this.task = new Task(
      '',
      '',
      [],
      null,
      'medium',
      '',
      [],
      'todo'
    );
  }

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

    this.AnewSubtasks = this.newSubtasks.map((title) => ({
      title: title.trim(),
      status: 'in-progress',
    }));
    this.task.subtasks = [...this.AnewSubtasks];


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

  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    this.isInputFocused = false;
  }

  addSubtask() {
    if (this.newSubtask.trim() !== '') {
      this.newSubtasks.push(this.newSubtask.trim());
      this.newSubtask = '';
    }
  }

  clearInputField() {
    console.log("Clear Button Clicked");
    this.newSubtask = '';
  }

  deleteSubtask(index: number) {
    this.newSubtasks.splice(index, 1);
  }

  editSubtask(index: number) {
    this.newSubtask = this.newSubtasks[index];
    this.editingIndex = index;
  }

  updateSubtask() {
    if (this.editingIndex !== null) {
      this.newSubtasks[this.editingIndex] = this.newSubtask;
      this.editingIndex = null;
      this.newSubtask = '';
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}



