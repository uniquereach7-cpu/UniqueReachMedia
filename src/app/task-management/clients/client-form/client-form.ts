import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  ClientStatus,
  CreateClientRequest,
  UpdateClientRequest
} from '../../shared/models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './client-form.html',
  styleUrl: './client-form.css'
})
export class ClientFormComponent implements OnInit {
  isEditMode = false;
  clientId: string | null = null;

  clientName = '';
  contactPersonName = '';
  contactPhone = '';
  contactEmail = '';
  address = '';
  notes = '';
  status: ClientStatus = 'ACTIVE';

  loading = false;
  saving = false;
  errorMessage = '';

  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.clientId;

    if (this.isEditMode && this.clientId) {
      this.loadClient(this.clientId);
    }
  }

  loadClient(id: string): void {
    this.loading = true;
    this.errorMessage = '';

    this.clientService.getClientById(id).subscribe({
      next: (client) => {
        this.clientName = client.clientName;
        this.contactPersonName = client.contactPersonName || '';
        this.contactPhone = client.contactPhone || '';
        this.contactEmail = client.contactEmail || '';
        this.address = client.address || '';
        this.notes = client.notes || '';
        this.status = client.status;

        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Failed to load client.';
        this.loading = false;
      }
    });
  }

  saveClient(): void {
    this.errorMessage = '';

    if (!this.clientName.trim()) {
      this.errorMessage = 'Client name is required.';
      return;
    }

    if (this.isEditMode) {
      this.updateClient();
    } else {
      this.createClient();
    }
  }

  createClient(): void {
    const request: CreateClientRequest = {
      clientName: this.clientName.trim(),
      contactPersonName: this.contactPersonName.trim(),
      contactPhone: this.contactPhone.trim(),
      contactEmail: this.contactEmail.trim(),
      address: this.address.trim(),
      notes: this.notes.trim(),
      status: this.status
    };

    this.saving = true;

    this.clientService.createClient(request).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/task-management/clients']);
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Failed to create client.';
        this.saving = false;
      }
    });
  }

  updateClient(): void {
    if (!this.clientId) {
      this.errorMessage = 'Client ID is missing.';
      return;
    }

    const request: UpdateClientRequest = {
      clientName: this.clientName.trim(),
      contactPersonName: this.contactPersonName.trim(),
      contactPhone: this.contactPhone.trim(),
      contactEmail: this.contactEmail.trim(),
      address: this.address.trim(),
      notes: this.notes.trim(),
      status: this.status
    };

    this.saving = true;

    this.clientService.updateClient(this.clientId, request).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/task-management/clients']);
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Failed to update client.';
        this.saving = false;
      }
    });
  }
}