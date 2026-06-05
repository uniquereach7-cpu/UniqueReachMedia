import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { ClientService } from '../../services/client.service';
import { CampaignService } from '../../services/campaign.service';
import { UserService } from '../../services/user.service';

import { Client } from '../../shared/models/client.model';
import { Campaign } from '../../shared/models/campaign.model';
import { CreateTaskRequest } from '../../shared/models/create-task-request.model';
import { EmployeeType, TaskType } from '../../shared/models/task.model';
import {User} from '../../shared/models/task.model';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './task-create.html',
  styleUrl: './task-create.css'
})
export class TaskCreateComponent implements OnInit {

  taskTypes: TaskType[] = [
    'DESIGN',
    'VIDEO_EDIT',
    'COPYWRITING',
    'REVISION',
    'SHOOT',
    'OTHER'
  ];

  selectedTaskType: TaskType | '' = '';

  clients: Client[] = [];
  campaigns: Campaign[] = [];
  employees: User[] = [];

  loading = false;
  saving = false;
  errorMessage = '';

  shootForm = {
    title: '',
    clientId: '',
    campaignId: '',
    assignedTo: '',
    taskDate: '',
    shootStartTime: '',
    shootEndTime: '',
    shootLocation: '',
    shootMapLink: '',
    clientContactName: '',
    clientContactPhone: '',
    shootNotes: ''
  };

  constructor(
    private taskService: TaskService,
    private clientService: ClientService,
    private campaignService: CampaignService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadCampaigns();
    this.loadEmployees();
  }

  isWorkTask(): boolean {
    return this.selectedTaskType !== '' && this.selectedTaskType !== 'SHOOT';
  }

  isShootTask(): boolean {
    return this.selectedTaskType === 'SHOOT';
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

  loadEmployees(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.employees = users;
      },
      error: () => {
        this.employees = [];
      }
    });
  }

  get videographers(): User[] {
    return this.employees.filter(user =>
      user.role === 'EMPLOYEE'
      && user.status === 'ACTIVE'
      && user.employeeType === 'VIDEOGRAPHER'
    );
  }

  get filteredCampaigns(): Campaign[] {
    if (!this.shootForm.clientId) {
      return this.campaigns;
    }

    return this.campaigns.filter(campaign =>
      campaign.clientId === this.shootForm.clientId
      && campaign.status === 'ACTIVE'
    );
  }

  onTaskTypeChange(): void {
    this.errorMessage = '';

    if (this.selectedTaskType !== 'SHOOT') {
      this.resetShootForm();
    }
  }

  createShootTask(): void {
    this.errorMessage = '';

    if (!this.validateShootForm()) {
      return;
    }

    const request: CreateTaskRequest = {
      title: this.shootForm.title.trim(),
      description: null,

      taskType: 'SHOOT',
      taskDate: this.shootForm.taskDate,

      clientId: this.shootForm.clientId,
      campaignId: this.shootForm.campaignId || null,
      assignedTo: this.shootForm.assignedTo,

      creativeBrief: null,
      requiredOutput: null,
      referenceLinks: null,
      notes: null,

      shootStartTime: this.shootForm.shootStartTime,
      shootEndTime: this.shootForm.shootEndTime,
      shootLocation: this.shootForm.shootLocation.trim(),
      shootMapLink: this.emptyToNull(this.shootForm.shootMapLink),
      clientContactName: this.shootForm.clientContactName.trim(),
      clientContactPhone: this.shootForm.clientContactPhone.trim(),
      shootNotes: this.emptyToNull(this.shootForm.shootNotes)
    };

    this.saving = true;

    this.taskService.createTask(request).subscribe({
      next: (response) => {
        this.saving = false;
        this.router.navigate(['/task-management/tasks', response.data.id]);
      },
      error: (error) => {
        this.saving = false;
        this.errorMessage = error?.error?.message || 'Failed to create shoot task';
      }
    });
  }

  validateShootForm(): boolean {
    if (!this.shootForm.title.trim()) {
      this.errorMessage = 'Title is required';
      return false;
    }

    if (!this.shootForm.clientId) {
      this.errorMessage = 'Client is required';
      return false;
    }

    if (!this.shootForm.assignedTo) {
      this.errorMessage = 'Videographer is required';
      return false;
    }

    if (!this.shootForm.taskDate) {
      this.errorMessage = 'Shoot date is required';
      return false;
    }

    if (!this.shootForm.shootStartTime) {
      this.errorMessage = 'Shoot start time is required';
      return false;
    }

    if (!this.shootForm.shootEndTime) {
      this.errorMessage = 'Shoot end time is required';
      return false;
    }

    if (this.shootForm.shootEndTime <= this.shootForm.shootStartTime) {
      this.errorMessage = 'Shoot end time must be after start time';
      return false;
    }

    if (!this.shootForm.shootLocation.trim()) {
      this.errorMessage = 'Location is required';
      return false;
    }

    if (!this.shootForm.clientContactName.trim()) {
      this.errorMessage = 'Client contact name is required';
      return false;
    }

    if (!this.shootForm.clientContactPhone.trim()) {
      this.errorMessage = 'Client contact phone is required';
      return false;
    }

    return true;
  }

  resetShootForm(): void {
    this.shootForm = {
      title: '',
      clientId: '',
      campaignId: '',
      assignedTo: '',
      taskDate: '',
      shootStartTime: '',
      shootEndTime: '',
      shootLocation: '',
      shootMapLink: '',
      clientContactName: '',
      clientContactPhone: '',
      shootNotes: ''
    };
  }

  emptyToNull(value: string): string | null {
    const trimmed = value.trim();
    return trimmed ? trimmed : null;
  }

  formatLabel(value: string): string {
    return value.replaceAll('_', ' ');
  }
}
