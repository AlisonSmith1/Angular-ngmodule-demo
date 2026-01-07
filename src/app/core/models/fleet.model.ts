export interface DriverLocation {
  id: string;
  driverName: string;
  vehicleId: string;
  lat: number;
  lng: number;
  status: string;
  lastUpdated: Date;
  speed: number;
}
