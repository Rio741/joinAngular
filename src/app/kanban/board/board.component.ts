import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-board',
  providers: [TaskService],
  imports: [NgForOf, NgIf, FormsModule, MatFormFieldModule, MatInputModule,
            MatIconModule, MatButtonModule, MatCardModule, MatRadioModule,
            MatSliderModule, MatProgressBarModule, DragDropModule, NgStyle],
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

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // Tasks von der API abrufen, wenn die Komponente geladen wird
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
  
        // Alle Aufgaben in die "todo"-Liste aufnehmen, um sie zu überprüfen
        this.tasks.todo = tasks;
  
        // Optional: Filtere die Aufgaben, nachdem du sie überprüft hast
        this.tasks.inProgress = tasks.filter(task => task.category === 'In progress');
        this.tasks.awaitFeedback = tasks.filter(task => task.category === 'Await Feedback');
        this.tasks.done = tasks.filter(task => task.category === 'Done');
  
        
      },
      error: (err) => {
        console.error('Fehler beim Laden der Aufgaben:', err);
      }
    });
  }

  getInitials(contactName: string): string {
    const nameParts = contactName.split(' ');
    const firstInitial = nameParts[0]?.charAt(0).toUpperCase() || '';
    const lastInitial = nameParts[1]?.charAt(0).toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  }

  drop(event: CdkDragDrop<any[]>): void {
    // Wenn das Item innerhalb der gleichen Container bewegt wird
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Wenn das Item zwischen verschiedenen Containern verschoben wird
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}