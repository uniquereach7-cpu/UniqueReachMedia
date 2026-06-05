import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { ClientService } from '../../services/client.service';
import { CampaignService } from '../../services/campaign.service';

import {
  EmployeeType,
  TaskListItem,
  TaskStatus,
  TaskType
} from '../../shared/models/task.model';

import { TaskFilter } from '../../shared/models/task-filter.model';
import { Client } from '../../shared/models/client.model';
import { Campaign } from '../../shared/models/campaign.model';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DatePipe
  ],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskListComponent implements OnInit {

  tasks: TaskListItem[] = [];
  clients: Client[] = [];
  campaigns: Campaign[] = [];

  loading = false;
  errorMessage = '';

  taskTypes: TaskType[] = [
    'DESIGN',
    'VIDEO_EDIT',
    'COPYWRITING',
    'REVISION',
    'SHOOT',
    'OTHER'
  ];

  taskStatuses: TaskStatus[] = [
    'ASSIGNED',
    'IN_PROGRESS',
    'SUBMITTED',
    'CHANGES_REQUESTED',
    'COMPLETED',
    'CANCELLED',
    'SCHEDULED',
    'RESCHEDULED'
  ];

  employeeTypes: EmployeeType[] = [
    'DESIGNER',
    'VIDEO_EDITOR',
    'VIDEOGRAPHER'
  ];

  filter: TaskFilter = {
    status: undefined,
    type: undefined,
    date: undefined,
    clientId: undefined,
    campaignId: undefined,
    assignedTo: undefined
  };

  constructor(
    private taskService: TaskService,
    private clientService: ClientService,
    private campaignService: CampaignService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadCampaigns();
    this.loadTasks();
  }

  loadTasks(): void {
    this.loading = true;
    this.errorMessage = '';

    this.taskService.getTasks(this.filter).subscribe({
      next: (response) => {
        this.tasks = response.data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Failed to load tasks';
        this.loading = false;
      }
    });
  }

  loadClients(): void {
    this.clientService.getActiveClients().subscribe({
      next: (clients) => {
        this.clients = clients;
      },
      error: () => {
        this.clients = [];
      }
    });
  }

  loadCampaigns(): void {
    this.campaignService.getAllCampaigns().subscribe({
      next: (campaigns) => {
        this.campaigns = campaigns;
      },
      error: () => {
        this.campaigns = [];
      }
    });
  }

  applyFilters(): void {
    this.loadTasks();
  }

  clearFilters(): void {
    this.filter = {
      status: undefined,
      type: undefined,
      date: undefined,
      clientId: undefined,
      campaignId: undefined,
      assignedTo: undefined
    };

    this.loadTasks();
  }

  viewTask(taskId: string): void {
    this.router.navigate(['/task-management/tasks', taskId]);
  }

  editTask(taskId: string): void {
    this.router.navigate(['/task-management/tasks', taskId, 'edit']);
  }

  cancelTask(task: TaskListItem): void {
    if (task.status === 'CANCELLED') {
      return;
    }

    const confirmed = confirm(`Cancel task "${task.title}"?`);

    if (!confirmed) {
      return;
    }

    this.taskService.cancelTask(task.id).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (error) => {
        this.errorMessage = error?.error?.message || 'Failed to cancel task';
      }
    });
  }

  formatLabel(value: string | null | undefined): string {
    if (!value) {
      return '-';
    }

    return value.replaceAll('_', ' ');
  }
}
