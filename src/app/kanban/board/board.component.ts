import { Component } from '@angular/core';
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
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-board',
  imports: [NgForOf, NgIf, FormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCardModule, MatRadioModule, MatSliderModule, MatProgressBarModule, DragDropModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;


  tasks = {
    todo: [
      { id: 1, category: 'User Story', title: 'Kochwelt Page & Recipe Recommender', description: 'Build startpage with recipe recommondation', progress: '1/2 Subtasks' },
    ],
    inProgress: [
      { id: 2, category: 'Bug', title: 'Fix Login Issue', description: 'Resolve issue with user authentication', progress: '0/3 Subtasks' },
    ],
    awaitFeedback: [
      { id: 3, category: 'Technical Task', title: 'Setup CI/CD Pipeline', description: 'Integrate pipeline for automated builds', progress: '3/3 Subtasks' },
    ],
    done: [
      { id: 3, category: 'Technical Task', title: 'Setup CI/CD Pipeline', description: 'Integrate pipeline for automated builds', progress: '3/3 Subtasks' },
    ],
  };

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
