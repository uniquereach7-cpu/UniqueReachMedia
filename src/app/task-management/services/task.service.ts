import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {ApiResponse} from '../shared/models/api-response.model';
import { CreateTaskRequest } from '../shared/models/create-task-request.model';
import { UpdateTaskRequest } from '../shared/models/update-task-request.model';
import { Task, TaskListItem } from '../shared/models/task.model';
import { TaskFilter } from '../shared/models/task-filter.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly baseUrl = 'http://localhost:8080/api/tasks';

  constructor(private http: HttpClient) {}

  createTask(request: CreateTaskRequest): Observable<ApiResponse<Task>> {
    return this.http.post<ApiResponse<Task>>(this.baseUrl, request);
  }

  getTasks(filter?: TaskFilter): Observable<ApiResponse<TaskListItem[]>> {
    let params = new HttpParams();

    if (filter?.status) {
      params = params.set('status', filter.status);
    }

    if (filter?.type) {
      params = params.set('type', filter.type);
    }

    if (filter?.date) {
      params = params.set('date', filter.date);
    }

    if (filter?.clientId) {
      params = params.set('clientId', filter.clientId);
    }

    if (filter?.campaignId) {
      params = params.set('campaignId', filter.campaignId);
    }

    if (filter?.assignedTo) {
      params = params.set('assignedTo', filter.assignedTo);
    }

    return this.http.get<ApiResponse<TaskListItem[]>>(this.baseUrl, { params });
  }

  getMyTasks(): Observable<ApiResponse<TaskListItem[]>> {
    return this.http.get<ApiResponse<TaskListItem[]>>(`${this.baseUrl}/my`);
  }

  getTaskById(taskId: string): Observable<ApiResponse<Task>> {
    return this.http.get<ApiResponse<Task>>(`${this.baseUrl}/${taskId}`);
  }

  updateTask(taskId: string, request: UpdateTaskRequest): Observable<ApiResponse<Task>> {
    return this.http.put<ApiResponse<Task>>(`${this.baseUrl}/${taskId}`, request);
  }

  cancelTask(taskId: string): Observable<ApiResponse<Task>> {
    return this.http.patch<ApiResponse<Task>>(`${this.baseUrl}/${taskId}/cancel`, {});
  }
}
