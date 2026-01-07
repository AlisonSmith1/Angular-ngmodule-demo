import { Injectable } from '@angular/core';
import { map, Observable, scan, shareReplay, startWith } from 'rxjs';

import { AnalyticData } from '../models/analytic.model'; // 模型
import { DashboardService } from './dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class AnalyticService {
  private history: number[] = [];
  private readonly INITIAL_SCORE = 92.4;

  constructor(private dashboardService: DashboardService) {}

  private formatAnalyticData(currentScore: number): AnalyticData {
    this.history.push(currentScore);
    if (this.history.length > 20) this.history.shift();

    const prev =
      this.history.length > 1 ? this.history[this.history.length - 2] : this.INITIAL_SCORE;
    const diff = currentScore - prev;

    return {
      score: Number(currentScore.toFixed(1)),
      previousScore: Number(prev.toFixed(1)),
      trendPercentage: Number(Math.abs(diff).toFixed(1)),
      isUpward: diff >= 0,
      status: currentScore > 85 ? 'optimal' : currentScore > 60 ? 'warning' : 'critical',
      lastUpdated: new Date(),
      chartData: [...this.history],
    };
  }

  getEfficiencyStats$(): Observable<AnalyticData> {
    return this.dashboardService.getActivityStream().pipe(
      scan((accScore, log) => {
        let newScore = accScore;
        if (log.type === 'danger') {
          newScore -= 5;
        } else if (log.type === 'success') {
          newScore += 3;
        } else {
          newScore += newScore < 95 ? 0.2 : -0.1;
        }
        return Math.min(100, Math.max(60, newScore));
      }, this.INITIAL_SCORE),

      map((finalScore) => this.formatAnalyticData(finalScore)),

      startWith(this.formatAnalyticData(this.INITIAL_SCORE)),
      shareReplay(1)
    );
  }

  getAiRecommendation$(stats: AnalyticData): string {
    if (stats.status === 'critical') return '警告：區域發生多起異常事件，系統效率大幅下降。';
    if (stats.status === 'warning') return '注意：事件處理頻率不穩定，建議監控異常點。';
    return '營運狀況理想，事件修復率良好，系統處於高效率狀態。';
  }
}
