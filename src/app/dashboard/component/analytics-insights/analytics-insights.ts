import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { AnalyticService } from '../../../core/services/analytic.service';
import { AnalyticData } from '../../../core/models/analytic.model';

@Component({
  selector: 'app-analytics-insights',
  standalone: false,
  templateUrl: './analytics-insights.html',
  styleUrl: './analytics-insights.scss',
})

// component.ts
export class AnalyticsInsights {
  stats$: Observable<AnalyticData>;
  recommendation$: Observable<string>;

  // 圓形圖
  readonly STROKE_ARRAY = 377;

  calculateOffset(score: number): number {
    return this.STROKE_ARRAY - (score / 100) * this.STROKE_ARRAY;
  }

  getStatusColor(status: string): string {
    if (status === 'critical') return '#f87171';
    if (status === 'warning') return '#fbbf24';
    return '#38bdf8';
  }

  constructor(private analyticService: AnalyticService) {
    this.stats$ = this.analyticService.getEfficiencyStats$().pipe(shareReplay(1));

    this.recommendation$ = this.stats$.pipe(
      map((stats) => this.analyticService.getAiRecommendation$(stats))
    );
  }
}
