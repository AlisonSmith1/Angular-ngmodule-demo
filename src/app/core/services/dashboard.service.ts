// src/app/core/services/mock-data.service.ts
import { Injectable } from '@angular/core';
import { interval, map, Observable, startWith } from 'rxjs';
import { DashboardStats } from '../models/dashboard.model';
import { DRIVER_DATA } from '../../data/driver';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  // 模擬頂部統計數據
  getStats(): Observable<DashboardStats> {
    return interval(5000).pipe(
      startWith(0),
      map(() => {
        const activeCount = DRIVER_DATA.filter((d) => d.status === 'active').length;
        const totalOrders = Math.floor(activeCount * Math.random() * 10);
        const driversEnRoute = activeCount;

        let pendingAlerts = totalOrders - driversEnRoute;
        if (pendingAlerts < 0) {
          pendingAlerts = 0;
        }

        return {
          totalOrders,
          driversEnRoute,
          pendingAlerts,
          avgDeliveryTime: 3,
        };
      })
    );
  }

  // // 模擬即時活動日誌
  // getActivityStream(): Observable<DashboardStats> {
  //   return interval(3000).pipe(
  //     startWith(0),
  //     map(() => [
  //       {
  //         id: Math.random().toString(36).substring(7),
  //         time: new Date().toLocaleTimeString(),
  //         status: ['online', 'warning', 'error'][Math.floor(Math.random() * 3)],
  //         message: '模擬事件訊息',
  //       },
  //     ])
  //   );
  // }
}
