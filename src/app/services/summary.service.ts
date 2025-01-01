import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SummaryData {
  todoCount: number;
  doneCount: number;
  urgentCount: number;
  nextDeadline: string;
  tasksInBoard: number;
  tasksInProgress: number;
  awaitingFeedback: number;
}

@Injectable({
  providedIn: 'root'
})
export class SummaryService {
  private apiUrl = 'http://localhost:3000/api/summary'; // Backend-Endpoint

  constructor(private http: HttpClient) {}

  getSummary(): Observable<SummaryData> {
    return this.http.get<SummaryData>(this.apiUrl);
  }
}
