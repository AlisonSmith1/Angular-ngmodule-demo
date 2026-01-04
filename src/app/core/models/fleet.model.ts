export interface DriverLocation {
  id: string;
  driverName: string;
  vehicleId: string;
  lat: number;
  lng: number;
  status: 'active' | 'idle' | 'warning';
  lastUpdated: Date;
  speed: number;
}
