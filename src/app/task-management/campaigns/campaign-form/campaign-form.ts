import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import {
  CampaignStatus,
  CreateCampaignRequest,
  UpdateCampaignRequest
} from '../../shared/models/campaign.model';

import { Client } from '../../shared/models/client.model';
import { CampaignService } from '../../services/campaign.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-campaign-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './campaign-form.html',
  styleUrl: './campaign-form.css'
})
export class CampaignFormComponent implements OnInit {
  isEditMode = false;
  campaignId: string | null = null;

  activeClients: Client[] = [];

  clientId = '';
  clientName = '';
  campaignName = '';
  description = '';
  startDate: string | null = null;
  endDate: string | null = null;
  status: CampaignStatus = 'ACTIVE';

  loading = false;
  saving = false;
  errorMessage = '';

  constructor(
    private campaignService: CampaignService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.campaignId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.campaignId;

    if (this.isEditMode && this.campaignId) {
      this.loadCampaign(this.campaignId);
    } else {
      this.loadActiveClients();
    }
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

  loadCampaign(id: string): void {
    this.loading = true;
    this.errorMessage = '';

    this.campaignService.getCampaignById(id).subscribe({
      next: (campaign) => {
        this.clientId = campaign.clientId;
        this.clientName = campaign.clientName;
        this.campaignName = campaign.campaignName;
        this.description = campaign.description || '';
        this.startDate = campaign.startDate;
        this.endDate = campaign.endDate;
        this.status = campaign.status;

        this.loading = false;
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Failed to load campaign.';
        this.loading = false;
      }
    });
  }

  saveCampaign(): void {
    this.errorMessage = '';

    if (!this.isEditMode && !this.clientId) {
      this.errorMessage = 'Client is required.';
      return;
    }

    if (!this.campaignName.trim()) {
      this.errorMessage = 'Campaign name is required.';
      return;
    }

    if (this.startDate && this.endDate && this.endDate < this.startDate) {
      this.errorMessage = 'End date cannot be before start date.';
      return;
    }

    if (this.isEditMode) {
      this.updateCampaign();
    } else {
      this.createCampaign();
    }
  }

  createCampaign(): void {
    const request: CreateCampaignRequest = {
      clientId: this.clientId,
      campaignName: this.campaignName.trim(),
      description: this.description.trim(),
      startDate: this.startDate || null,
      endDate: this.endDate || null,
      status: this.status
    };

    this.saving = true;

    this.campaignService.createCampaign(request).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/task-management/campaigns']);
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Failed to create campaign.';
        this.saving = false;
      }
    });
  }

  updateCampaign(): void {
    if (!this.campaignId) {
      this.errorMessage = 'Campaign ID is missing.';
      return;
    }

    const request: UpdateCampaignRequest = {
      campaignName: this.campaignName.trim(),
      description: this.description.trim(),
      startDate: this.startDate || null,
      endDate: this.endDate || null,
      status: this.status
    };

    this.saving = true;

    this.campaignService.updateCampaign(this.campaignId, request).subscribe({
      next: () => {
        this.saving = false;
        this.router.navigate(['/task-management/campaigns']);
      },
      error: (error) => {
        this.errorMessage =
          error?.error?.message || 'Failed to update campaign.';
        this.saving = false;
      }
    });
  }
}