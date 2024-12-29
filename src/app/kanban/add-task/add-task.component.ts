import { Component } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: 'app-add-task',
  providers: [provideNativeDateAdapter()],
  imports: [MatSelectModule,MatButtonModule,MatIconModule, MatInputModule, MatFormFieldModule, MatListModule, CommonModule, FormsModule,MatSelectModule,
    MatCheckboxModule, MatButtonToggleModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  selectedShoes: string[] = [];
  value = 'Add new subtask'; 
  fontStyleControl = new FormControl('');
  fontStyle?: string;

  myFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Heutiges Datum ohne Zeit
    const date = (d || new Date());
    date.setHours(0, 0, 0, 0); // Eingabe-Datum ohne Zeit
  
    return date >= today; // Nur heutige oder zukünftige Daten
  };
  
  
}
