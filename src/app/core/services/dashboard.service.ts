import { Injectable } from '@angular/core';
import { interval, map, Observable, startWith, shareReplay, Subject, scan } from 'rxjs';

import { DashboardStats, ActivityLog } from '../models/dashboard.model'; // 模型
import { DriverLocation } from '../models/fleet.model'; // 模型
import { DRIVER_DATA } from '../../data/driver'; // 初始資料
import { ACTIVITY_MESSAGES } from '../../data/activity'; // 初始資料

@Injectable({ providedIn: 'root' })
export class DashboardService {
  // 共享事件
  private activityStream$ = interval(5000).pipe(
    startWith(0),
    map(() => {
      const randomDriver = DRIVER_DATA[Math.floor(Math.random() * DRIVER_DATA.length)];
      const eventTemplate = ACTIVITY_MESSAGES[Math.floor(Math.random() * ACTIVITY_MESSAGES.length)];

      return {
        id: `${randomDriver.id}-${Date.now()}`,
        timestamp: new Date(),
        type: eventTemplate.type || 'info',
        message: `[${randomDriver.vehicleId}] ${randomDriver.driverName}，${eventTemplate.message}`,
        actor: '系統中心',

        driverId: randomDriver.id,
      } as ActivityLog;
    }),
    shareReplay(1)
  );

  // ActivityStream日誌
  getActivityStream(): Observable<ActivityLog> {
    return this.activityStream$;
  }

  // 上方card片的數據
  getStats(drivers: DriverLocation[], latestLog: ActivityLog): DashboardStats {
    // 💡 直接從 fleetService 已經改好的狀態裡去算數量
    const activeCount = drivers.filter((d) => d.status === 'active').length;
    const warningCount = drivers.filter((d) => d.status === 'warning').length;

    return {
      totalOrders: 150,
      driversEnRoute: activeCount, // 同步 FleetService 的結果
      pendingAlerts: warningCount > 0 ? 12 : 5, // 如果地圖上有警告，卡片數值就跳動
      avgDeliveryTime: warningCount > 0 ? 30 : 25,
    };
  }
}
