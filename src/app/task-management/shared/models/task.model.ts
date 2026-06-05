export type TaskType =
  | 'DESIGN'
  | 'VIDEO_EDIT'
  | 'COPYWRITING'
  | 'REVISION'
  | 'SHOOT'
  | 'OTHER';

export type EmployeeType =
  | 'DESIGNER'
  | 'VIDEO_EDITOR'
  | 'VIDEOGRAPHER';

export type TaskStatus =
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'SUBMITTED'
  | 'CHANGES_REQUESTED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'SCHEDULED'
  | 'RESCHEDULED';

export interface User {
  id: string;
  fullName: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'EMPLOYEE';
  employeeType: 'DESIGNER' | 'VIDEO_EDITOR' | 'VIDEOGRAPHER' | null;
  status: 'ACTIVE' | 'INACTIVE';
}

export interface TaskListItem {
  id: string;

  title: string;

  taskType: TaskType;
  status: TaskStatus;
  taskDate: string;

  clientId: string;
  clientName: string;

  campaignId: string | null;
  campaignName: string | null;

  assignedTo: string;
  assignedToName: string;
  assignedEmployeeType: EmployeeType;

  createdAt: string;
}

export interface Task {
  id: string;

  title: string;
  description: string | null;

  taskType: TaskType;
  status: TaskStatus;
  taskDate: string;

  clientId: string;
  clientName: string;

  campaignId: string | null;
  campaignName: string | null;

  assignedTo: string;
  assignedToName: string;
  assignedEmployeeType: EmployeeType;

  createdBy: string;
  createdByName: string;

  updatedBy: string | null;
  updatedByName: string | null;

  creativeBrief: string | null;
  requiredOutput: string | null;
  referenceLinks: string | null;
  notes: string | null;

  shootStartTime: string | null;
  shootEndTime: string | null;
  shootLocation: string | null;
  shootMapLink: string | null;
  clientContactName: string | null;
  clientContactPhone: string | null;
  shootNotes: string | null;

  createdAt: string;
  updatedAt: string | null;
  cancelledAt: string | null;
}
