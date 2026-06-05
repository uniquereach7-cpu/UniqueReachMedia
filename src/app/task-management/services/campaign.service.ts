import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import {
  Campaign,
  CreateCampaignRequest,
  UpdateCampaignRequest
} from '../shared/models/campaign.model';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private readonly API_URL = 'http://localhost:8080/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllCampaigns(): Observable<Campaign[]> {
    return this.http
      .get<ApiResponse<Campaign[]>>(`${this.API_URL}/campaigns`, {
        headers: this.getAuthHeaders()
      })
      .pipe(map(response => response.data));
  }

  getCampaignById(id: string): Observable<Campaign> {
    return this.http
      .get<ApiResponse<Campaign>>(`${this.API_URL}/campaigns/${id}`, {
        headers: this.getAuthHeaders()
      })
      .pipe(map(response => response.data));
  }

  getCampaignsByClient(clientId: string): Observable<Campaign[]> {
    return this.http
      .get<ApiResponse<Campaign[]>>(`${this.API_URL}/clients/${clientId}/campaigns`, {
        headers: this.getAuthHeaders()
      })
      .pipe(map(response => response.data));
  }

  getActiveCampaignsByClient(clientId: string): Observable<Campaign[]> {
    return this.http
      .get<ApiResponse<Campaign[]>>(`${this.API_URL}/clients/${clientId}/campaigns/active`, {
        headers: this.getAuthHeaders()
      })
      .pipe(map(response => response.data));
  }

  createCampaign(request: CreateCampaignRequest): Observable<Campaign> {
    return this.http
      .post<ApiResponse<Campaign>>(`${this.API_URL}/campaigns`, request, {
        headers: this.getAuthHeaders()
      })
      .pipe(map(response => response.data));
  }

  updateCampaign(id: string, request: UpdateCampaignRequest): Observable<Campaign> {
    return this.http
      .put<ApiResponse<Campaign>>(`${this.API_URL}/campaigns/${id}`, request, {
        headers: this.getAuthHeaders()
      })
      .pipe(map(response => response.data));
  }

  deactivateCampaign(id: string): Observable<Campaign> {
    return this.http
      .patch<ApiResponse<Campaign>>(`${this.API_URL}/campaigns/${id}/deactivate`, {}, {
        headers: this.getAuthHeaders()
      })
      .pipe(map(response => response.data));
  }

  completeCampaign(id: string): Observable<Campaign> {
    return this.http
      .patch<ApiResponse<Campaign>>(`${this.API_URL}/campaigns/${id}/complete`, {}, {
        headers: this.getAuthHeaders()
      })
      .pipe(map(response => response.data));
  }

  reactivateCampaign(id: string): Observable<Campaign> {
    return this.http
      .patch<ApiResponse<Campaign>>(`${this.API_URL}/campaigns/${id}/reactivate`, {}, {
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