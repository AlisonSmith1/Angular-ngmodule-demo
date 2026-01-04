import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '../core/services/dashboard.service';
import { DashboardStats } from '../core/models/dashboard.model';
import { FleetService } from '../core/services/fleet.service';
import { DriverLocation } from '../core/models/fleet.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
// dashboard.component.ts
export class DashboardComponent implements OnInit {
  stats$!: Observable<DashboardStats>;
  driver$!: Observable<DriverLocation[]>;

  constructor(private dashboardService: DashboardService, private fleetService: FleetService) {}

  ngOnInit() {
    this.stats$ = this.dashboardService.getStats();
    this.driver$ = this.fleetService.getLiveDriverLocations();
  }
}
