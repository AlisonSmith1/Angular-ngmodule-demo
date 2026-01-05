// src/app/core/services/fleet.service.ts
import { Injectable } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { DriverLocation } from '../models/fleet.model';
import { DRIVER_DATA } from '../../data/driver';
import { DashboardService } from './dashboard.service';

@Injectable({ providedIn: 'root' })
export class FleetService {
  private currentDrivers: DriverLocation[] = [...DRIVER_DATA];

  constructor(private dashboardService: DashboardService) {}

  getLiveDriverLocations(): Observable<DriverLocation[]> {
    return this.dashboardService.getActivityStream().pipe(
      map((latestLog: any) => {
        this.currentDrivers = this.currentDrivers.map((driver) => {
          if (driver.status === 'active') {
            driver = {
              ...driver,
              lat: driver.lat + (Math.random() - 0.5) * 0.001,
              lng: driver.lng + (Math.random() - 0.5) * 0.001,
              speed: 40 + Math.floor(Math.random() * 20),
              lastUpdated: new Date(),
            };
          }

          if (driver.id === latestLog.driverId) {
            return {
              ...driver,
              status: latestLog.type === 'danger' ? 'warning' : driver.status,
            };
          }

          return driver;
        });

        return [...this.currentDrivers];
      }),

      startWith([...this.currentDrivers])
    );
  }
}
