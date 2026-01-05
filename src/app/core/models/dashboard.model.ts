export interface DashboardStats {
  totalOrders: number;
  driversEnRoute: number;
  pendingAlerts: number;
  avgDeliveryTime: number;
}

export interface ActivityLog {
  id: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'danger' | 'success';
  message: string;
  actor?: string;
}
