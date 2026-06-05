export type ClientStatus = 'ACTIVE' | 'INACTIVE';

export interface Client {
  id: string;
  clientName: string;
  contactPersonName: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  notes: string;
  status: ClientStatus;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateClientRequest {
  clientName: string;
  contactPersonName: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  notes: string;
  status: ClientStatus;
}

export interface UpdateClientRequest {
  clientName: string;
  contactPersonName: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  notes: string;
  status: ClientStatus;
}