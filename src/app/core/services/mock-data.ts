// src/app/core/services/mock-data.service.ts
import { Injectable } from '@angular/core';
import { interval, map, Observable, startWith } from 'rxjs';
import { DashboardStats } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class MockDataService {
  // 模擬頂部統計數據
  getStats(): Observable<DashboardStats> {
    return interval(5000).pipe(
      startWith(0),
      map(() => ({
        totalOrders: Math.floor(Math.random() * 2000),
        driversEnRoute: Math.floor(Math.random() * 100),
        pendingAlerts: Math.floor(Math.random() * 10),
        avgDeliveryTime: 22,
      }))
    );
  }

  // // 模擬即時活動日誌
  // getActivityStream(): Observable<any[]> {
  //   return interval(3000).pipe(...);
  // }
}
