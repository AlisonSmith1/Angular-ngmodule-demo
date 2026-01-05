import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from '../../../core/services/dashboard.service';
import { ActivityLog } from '../../../core/models/dashboard.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-activity-stream',
  standalone: false,
  templateUrl: './activity-stream.html',
  styleUrl: './activity-stream.scss',
})
export class ActivityStream implements OnInit, OnDestroy {
  logs: ActivityLog[] = [];
  private subscription?: Subscription;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.subscription = this.dashboardService.getActivityStream().subscribe((newLog) => {
      this.logs.unshift(newLog);

      if (this.logs.length > 8) {
        this.logs.pop();
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
