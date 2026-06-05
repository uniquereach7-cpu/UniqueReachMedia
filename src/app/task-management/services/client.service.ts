import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import {
  Client,
  CreateClientRequest,
  UpdateClientRequest
} from '../shared/models/client.model';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly API_URL = 'http://localhost:8080/api/clients';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllClients(): Observable<Client[]> {
    return this.http
      .get<ApiResponse<Client[]>>(this.API_URL, {
        headers: this.getAuthHeaders()
      })
      .pipe(map(response => response.data));
  }

  getActiveClients(): Observable<Client[]> {
    return this.http
      .get<ApiResponse<Client[]>>(`${this.API_URL}/active`, {
        headers: this.getAuthHeaders()
      })
      .pipe(map(response => response.data));
  }

  getClientById(id: string): Observable<Client> {
    return this.http
      .get<ApiResponse<Client>>(`${this.API_URL}/${id}`, {
        headers: this.getAuthHeaders()
      })
      .pipe(map(response => response.data));
  }

  createClient(request: CreateClientRequest): Observable<Client> {
    return this.http
      .post<ApiResponse<Client>>(this.API_URL, request, {
        headers: this.getAuthHeaders()
      })
      .pipe(map(response => response.data));
  }

  updateClient(id: string, request: UpdateClientRequest): Observable<Client> {
    return this.http
      .put<ApiResponse<Client>>(`${this.API_URL}/${id}`, request, {
        headers: this.getAuthHeaders()
      })
      .pipe(map(response => response.data));
  }

  deactivateClient(id: string): Observable<Client> {
    return this.http
      .patch<ApiResponse<Client>>(`${this.API_URL}/${id}/deactivate`, {}, {
        headers: this.getAuthHeaders()
      })
      .pipe(map(response => response.data));
  }

  reactivateClient(id: string): Observable<Client> {
    return this.http
      .patch<ApiResponse<Client>>(`${this.API_URL}/${id}/reactivate`, {}, {
        headers: this.getAuthHeaders()
      })
      .pipe(map(response => response.data));
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}