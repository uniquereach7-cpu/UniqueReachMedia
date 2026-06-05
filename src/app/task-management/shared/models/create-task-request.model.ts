// create-task-request.model.ts

import { TaskType } from './task.model';

export interface CreateTaskRequest {
  title: string;
  description: string | null;

  taskType: TaskType;
  taskDate: string; // yyyy-MM-dd

  clientId: string;
  campaignId: string | null;
  assignedTo: string;

  // Work task fields
  creativeBrief: string | null;
  requiredOutput: string | null;
  referenceLinks: string | null;
  notes: string | null;

  // Shoot task fields
  shootStartTime: string | null; // HH:mm
  shootEndTime: string | null;   // HH:mm
  shootLocation: string | null;
  shootMapLink: string | null;
  clientContactName: string | null;
  clientContactPhone: string | null;
  shootNotes: string | null;
}
