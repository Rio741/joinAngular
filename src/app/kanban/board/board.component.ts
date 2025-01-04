import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { MatRadioModule } from '@angular/material/radio';
import { ProgressBarMode, MatProgressBarModule } from '@angular/material/progress-bar';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../../dialogs/add-task-dialog/add-task-dialog.component';
import { TaskDialogComponent } from '../../dialogs/task-dialog/task-dialog.component';

@Component({
  selector: 'app-board',
  providers: [TaskService],
  imports: [NgForOf, NgIf, FormsModule, MatFormFieldModule, MatInputModule,
    MatIconModule, MatButtonModule, MatCardModule, MatRadioModule,
    MatSliderModule, MatProgressBarModule, DragDropModule, NgStyle, MatDialogModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})

export class BoardComponent implements OnInit {
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;

  tasks = {
    todo: [] as Task[],          // Leeres Array für die To-Do-Spalte
    inProgress: [] as Task[],    // Leeres Array für die In-Progress-Spalte
    awaitFeedback: [] as Task[], // Leeres Array für die Await Feedback-Spalte
    done: [] as Task[]           // Leeres Array für die Done-Spalte
  };


  constructor(private taskService: TaskService, private dialog: MatDialog,
    private cdRef: ChangeDetectorRef, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    // Tasks von der API abrufen, wenn die Komponente geladen wird
    this.loadTasks();
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
  

  inProgressSubtasksCount(subtasks: any[]): number {
    return subtasks.filter(subtask => subtask.status === 'done').length;
  }

  calculateProgress(subtasks: any[]): number {
    const inProgressCount = this.inProgressSubtasksCount(subtasks);
    const totalSubtasks = subtasks.length;
    return totalSubtasks > 0 ? (inProgressCount / totalSubtasks) * 100 : 0;
  }


  openAddTaskDialog() {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Dialog geschlossen mit Ergebnis:', result);
      } else {
        console.log('Dialog geschlossen ohne Ergebnis.');
      }
    });
  }

  openTaskDialog(task: any): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
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

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        console.log('Task erfolgreich gelöscht!');
      },
      error: (err) => {
        console.error('Fehler beim Löschen der Aufgabe:', err);
      }
    });
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        console.log('Empfangene Aufgaben:', tasks);

        this.filterTasksByStatus(tasks);
      }
    });
  }

  private filterTasksByStatus(tasks: Task[]): void {
    this.tasks.todo = tasks.filter(task => task.status === 'todo');
    this.tasks.inProgress = tasks.filter(task => task.status === 'inProgress');
    this.tasks.awaitFeedback = tasks.filter(task => task.status === 'awaitFeedback');
    this.tasks.done = tasks.filter(task => task.status === 'done');
  }


  drop(event: CdkDragDrop<any[]>): void {
    const movedTask = event.item.data;

    if (event.container.id === 'todo') {
      movedTask.status = 'todo';
    } else if (event.container.id === 'inProgress') {
      movedTask.status = 'inProgress';
    } else if (event.container.id === 'done') {
      movedTask.status = 'done';
    } else if (event.container.id === 'awaitFeedback') {
      movedTask.status = 'awaitFeedback';
    }

    this.taskService.updateTaskStatus(movedTask.id, movedTask.status).subscribe(
      (updatedTask) => {
        console.log('Updated Task:', updatedTask);

        this.loadTasks();
      }
    );
  }


  getInitials(contactName: string): string {
    const nameParts = contactName.split(' ');
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
    const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  }


}