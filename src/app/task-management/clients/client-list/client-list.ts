import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Client, ClientStatus } from '../../shared/models/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css'
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];

  searchTerm = '';
  selectedStatus: 'ALL' | ClientStatus = 'ALL';

  loading = false;
  errorMessage = '';

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.loading = true;
    this.errorMessage = '';

    this.clientService.getAllClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Failed to load clients.';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    const search = this.searchTerm.trim().toLowerCase();

    this.filteredClients = this.clients.filter((client) => {
      const matchesSearch =
        !search ||
        client.clientName.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'ALL' ||
        client.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  deactivateClient(client: Client): void {
    const confirmed = confirm(`Deactivate client "${client.clientName}"?`);

    if (!confirmed) {
      return;
    }

    this.clientService.deactivateClient(client.id).subscribe({
      next: () => {
        this.loadClients();
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Failed to deactivate client.';
      }
    });
  }

  reactivateClient(client: Client): void {
    const confirmed = confirm(`Reactivate client "${client.clientName}"?`);

    if (!confirmed) {
      return;
    }

    this.clientService.reactivateClient(client.id).subscribe({
      next: () => {
        this.loadClients();
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Failed to reactivate client.';
      }
    });
  }

  viewCampaigns(client: Client): void {
    this.router.navigate(['/task-management/campaigns'], {
      queryParams: {
        clientId: client.id
      }
    });
  }
}