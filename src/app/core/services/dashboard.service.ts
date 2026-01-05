// src/app/core/services/mock-data.service.ts
import { Injectable } from '@angular/core';
import { interval, map, Observable, startWith } from 'rxjs';
import { DashboardStats, ActivityLog } from '../models/dashboard.model';
import { DRIVER_DATA } from '../../data/driver';
import { ACTIVITY_MESSAGES } from '../../data/activity';

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
        const avgDeliveryTime =
          DRIVER_DATA.reduce((sum, d) => sum + d.speed, 0) / DRIVER_DATA.length;

        let pendingAlerts = totalOrders - driversEnRoute;
        if (pendingAlerts < 0) {
          pendingAlerts = 0;
        }

        return {
          totalOrders,
          driversEnRoute,
          pendingAlerts,
          avgDeliveryTime,
        };
      })
    );
  }

  // 模擬即時活動日誌
  getActivityStream(): Observable<ActivityLog> {
    return interval(10000).pipe(
      startWith(0),
      map(() => {
        // 💡 確保這裡的 type 存在於介面的聯合型別中
        const types: ActivityLog['type'][] = ['info', 'warning', 'danger', 'success'];
        const randomDriver = DRIVER_DATA[Math.floor(Math.random() * DRIVER_DATA.length)];
        const eventTemplate =
          ACTIVITY_MESSAGES[Math.floor(Math.random() * ACTIVITY_MESSAGES.length)];

        return {
          id: `${randomDriver.id}-${Date.now()}`,
          timestamp: new Date(),
          type: eventTemplate.type || 'info',
          message: `[${randomDriver.vehicleId}] ${randomDriver.driverName}，${eventTemplate.message}`,
          actor: '系統中心',
        };
      })
    );
  }
}
