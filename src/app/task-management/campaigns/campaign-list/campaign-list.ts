import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Campaign, CampaignStatus } from '../../shared/models/campaign.model';
import { Client } from '../../shared/models/client.model';
import { CampaignService } from '../../services/campaign.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-campaign-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './campaign-list.html',
  styleUrl: './campaign-list.css'
})
export class CampaignListComponent implements OnInit {
  campaigns: Campaign[] = [];
  filteredCampaigns: Campaign[] = [];
  activeClients: Client[] = [];

  searchTerm = '';
  selectedStatus: 'ALL' | CampaignStatus = 'ALL';
  selectedClientId = 'ALL';

  loading = false;
  errorMessage = '';

  constructor(
    private campaignService: CampaignService,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const clientIdFromQuery = this.route.snapshot.queryParamMap.get('clientId');

    if (clientIdFromQuery) {
      this.selectedClientId = clientIdFromQuery;
    }

    this.loadActiveClients();
    this.loadCampaigns();
  }

  loadCampaigns(): void {
    this.loading = true;
    this.errorMessage = '';

    this.campaignService.getAllCampaigns().subscribe({
      next: (campaigns) => {
        this.campaigns = campaigns;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Failed to load campaigns.';
        this.loading = false;
      }
    });
  }

  loadActiveClients(): void {
    this.clientService.getActiveClients().subscribe({
      next: (clients) => {
        this.activeClients = clients;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Failed to load active clients.';
      }
    });
  }

  applyFilters(): void {
    const search = this.searchTerm.trim().toLowerCase();

    this.filteredCampaigns = this.campaigns.filter((campaign) => {
      const matchesSearch =
        !search ||
        campaign.campaignName.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'ALL' ||
        campaign.status === this.selectedStatus;

      const matchesClient =
        this.selectedClientId === 'ALL' ||
        campaign.clientId === this.selectedClientId;

      return matchesSearch && matchesStatus && matchesClient;
    });
  }

  deactivateCampaign(campaign: Campaign): void {
    const confirmed = confirm(`Deactivate campaign "${campaign.campaignName}"?`);

    if (!confirmed) {
      return;
    }

    this.campaignService.deactivateCampaign(campaign.id).subscribe({
      next: () => {
        this.loadCampaigns();
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Failed to deactivate campaign.';
      }
    });
  }

  completeCampaign(campaign: Campaign): void {
    const confirmed = confirm(`Mark campaign "${campaign.campaignName}" as completed?`);

    if (!confirmed) {
      return;
    }

    this.campaignService.completeCampaign(campaign.id).subscribe({
      next: () => {
        this.loadCampaigns();
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Failed to complete campaign.';
      }
    });
  }

  reactivateCampaign(campaign: Campaign): void {
    const confirmed = confirm(`Reactivate campaign "${campaign.campaignName}"?`);

    if (!confirmed) {
      return;
    }

    this.campaignService.reactivateCampaign(campaign.id).subscribe({
      next: () => {
        this.loadCampaigns();
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Failed to reactivate campaign.';
      }
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.selectedStatus = 'ALL';
    this.selectedClientId = 'ALL';
    this.applyFilters();

    this.router.navigate(['/task-management/campaigns']);
  }
}