import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { AnalyticService } from '../../../core/services/analytic.service';
import { AnalyticData } from '../../../core/models/analytic.mode';

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

  constructor(private analyticService: AnalyticService) {
    this.stats$ = this.analyticService.getEfficiencyStats$().pipe(shareReplay(1));

    this.recommendation$ = this.stats$.pipe(
      map((stats) => this.analyticService.getAiRecommendation$(stats))
    );
  }
}
