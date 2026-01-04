import { Component, Input } from '@angular/core';
import { DashboardStats } from '../../../core/models/dashboard.model';

@Component({
  selector: 'app-data-overview',
  standalone: false,
  templateUrl: './data-overview.html',
  styleUrl: './data-overview.scss',
})
export class DataOverview {
  @Input() data: DashboardStats | null = null;
}
