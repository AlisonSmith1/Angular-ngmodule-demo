import { Injectable } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';

import { DriverLocation } from '../models/fleet.model'; // 模型
import { DRIVER_DATA } from '../../data/driver'; // 初始資料
import { DashboardService } from './dashboard.service';

@Injectable({ providedIn: 'root' })
export class FleetService {
  private currentDrivers: DriverLocation[] = [...DRIVER_DATA];

  constructor(private dashboardService: DashboardService) {}

  getFleetUpdates(): Observable<DriverLocation[]> {
    return this.dashboardService.getActivityStream().pipe(
      map((log: any) => {
        // success -> active
        // danger / warning -> warning
        // info -> idle
        let mappedStatus: 'active' | 'warning' | 'idle' = 'idle';

        if (log) {
          switch (log.type) {
            case 'success':
              mappedStatus = 'active';
              break;
            case 'danger':
            case 'warning':
              mappedStatus = 'warning';
              break;
            case 'info':
              mappedStatus = 'idle';
              break;
            default:
              mappedStatus = 'active';
          }
        }

        this.currentDrivers = this.currentDrivers.map((driver) => {
          const isTarget = Math.random() > 0.7;

          return {
            ...driver,
            status: isTarget ? mappedStatus : driver.status,
            lat: driver.lat + (driver.status === 'idle' ? 0 : (Math.random() - 0.5) * 0.001),
            lng: driver.lng + (driver.status === 'idle' ? 0 : (Math.random() - 0.5) * 0.001),
            speed: driver.status === 'idle' ? 0 : 40 + Math.floor(Math.random() * 20),
            lastUpdated: new Date(),
          };
        });

        return [...this.currentDrivers];
      }),
      startWith([...this.currentDrivers])
    );
  }
}
