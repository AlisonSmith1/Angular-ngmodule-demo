import { DriverLocation } from '../core/models/fleet.model';

function getRandomStatus(): 'active' | 'warning' | 'idle' {
  const statuses: Array<'active' | 'warning' | 'idle'> = ['active', 'warning', 'idle'];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

export const DRIVER_DATA: DriverLocation[] = [
  {
    id: 'DRV-001',
    driverName: '王大明',
    vehicleId: 'TPL-1111',
    lat: 25.033,
    lng: 121.5654,
    status: getRandomStatus(),
    lastUpdated: new Date('2026-01-04T20:28:00Z'),
    speed: 45,
  },
  {
    id: 'DRV-002',
    driverName: '李小華',
    vehicleId: 'TPL-2222',
    lat: 25.053,
    lng: 121.5454,
    status: getRandomStatus(),
    lastUpdated: new Date('2026-01-04T20:28:00Z'),
    speed: 40,
  },
  {
    id: 'DRV-003',
    driverName: '陳曉明',
    vehicleId: 'TPL-3333',
    lat: 25.043,
    lng: 121.5488,
    status: getRandomStatus(),
    lastUpdated: new Date('2026-01-04T20:28:00Z'),
    speed: 50,
  },
  {
    id: 'DRV-004',
    driverName: '陳小玲',
    vehicleId: 'TPL-4444',
    lat: 25.111,
    lng: 121.5,
    status: getRandomStatus(),
    lastUpdated: new Date('2026-01-04T20:28:00Z'),
    speed: 46,
  },
  {
    id: 'DRV-005',
    driverName: '吳怡萱',
    vehicleId: 'TPL-5555',
    lat: 25.0,
    lng: 121.4114,
    status: getRandomStatus(),
    lastUpdated: new Date('2026-01-04T20:28:00Z'),
    speed: 33,
  },
];
