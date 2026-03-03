export type AppStatus = 'Active' | 'Slow' | 'Inactive' | 'Completed';

export interface CommunityApp {
  id: string;
  name: string;
  builder: string;
  stage: string;
  progress: number;
  lastUpdate: string;
  status: AppStatus;
}

export interface DashboardStats {
  totalApps: number;
  active: number;
  stalled: number;
  completed: number;
}
