import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MockDataService } from '../core/services/mock-data';
import { DashboardStats } from '../core/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
// dashboard.component.ts
export class Dashboard implements OnInit {
  stats$!: Observable<DashboardStats>;

  constructor(private dataService: MockDataService) {}

  ngOnInit() {
    this.stats$ = this.dataService.getStats();
  }
}
