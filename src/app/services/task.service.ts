import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private apiUrl = 'http://127.0.0.1:8000/tasks/';

  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  // Abrufen aller Aufgaben
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  // Abrufen einer einzelnen Aufgabe nach ID
  getTaskById(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}${id}/`);
  }

  updateTaskStatus(id: string, status: string): Observable<Task> {
    const updatedTask = { status: status };  // Nur den Status übergeben
    return this.http.patch<Task>(`${this.apiUrl}${id}/`, updatedTask);  // PATCH-Methode
  }
  
  updateSubtaskStatus(subtaskId: number, status: string): Observable<any> {
    return this.http.patch<any>(`http://127.0.0.1:8000/subtasks/${subtaskId}/update_status/`, { status });
}


  // Löschen einer Aufgabe
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }

 
  
}
