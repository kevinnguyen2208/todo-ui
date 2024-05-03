import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { TaskDetails } from '../models/task-details.model';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  url: string = 'http://localhost:38720/api/System';

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<TaskDetails[]> {
    return this.http.get<TaskDetails[]>(this.url);
  }

  addTask(task: TaskDetails): Observable<boolean> {
    return this.http.post<boolean>(this.url+ "/add", task);
  }

  deleteTasks(ids: string[]): Observable<string> {
    return this.http.post<string>(this.url + "/delete", ids);
  }
}