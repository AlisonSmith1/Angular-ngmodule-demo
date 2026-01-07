import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../core/services/dashboard.service';
import { DashboardStats } from '../core/models/dashboard.model';
import { FleetService } from '../core/services/fleet.service';
import { DriverLocation } from '../core/models/fleet.model';
import { combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  stats$!: Observable<DashboardStats>;
  driver$!: Observable<DriverLocation[]>;

  constructor(private dashboardService: DashboardService, private fleetService: FleetService) {}

  ngOnInit() {
    this.driver$ = this.fleetService.getFleetUpdates();
    const log$ = this.dashboardService.getActivityStream();

    this.stats$ = combineLatest([this.driver$, log$]).pipe(
      map(([drivers, latestLog]) => {
        const activeCount = drivers.filter((d) => d.status === 'active').length;

        const alertModifier = latestLog.type === 'danger' ? 12 : 5;
        const avgDeliveryTime = latestLog.type === 'warning' ? 30 : 25;

        return {
          totalOrders: 150,
          driversEnRoute: activeCount,
          pendingAlerts: alertModifier,
          avgDeliveryTime: avgDeliveryTime,
        } as DashboardStats;
      })
    );
  }
}
