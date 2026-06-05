import { TaskStatus, TaskType } from './task.model';

export interface TaskFilter {
  status?: TaskStatus;
  type?: TaskType;
  date?: string;
  clientId?: string;
  campaignId?: string;
  assignedTo?: string;
}
