export type CampaignStatus = 'ACTIVE' | 'INACTIVE' | 'COMPLETED';

export interface Campaign {
  id: string;
  clientId: string;
  clientName: string;
  campaignName: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  status: CampaignStatus;
  createdAt: string;
  updatedAt: string | null;
}

export interface CreateCampaignRequest {
  clientId: string;
  campaignName: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  status: CampaignStatus;
}

export interface UpdateCampaignRequest {
  campaignName: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  status: CampaignStatus;
}