export interface DashboardStats {
  totalOrders: number;
  driversEnRoute: number;
  pendingAlerts: number;
  avgDeliveryTime: number;
}

export interface ActivityLog {
  id: string;
  time: string;
  status: 'online' | 'warning' | 'error';
  message: string;
}
