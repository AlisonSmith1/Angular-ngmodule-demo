import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { FleetService } from './fleet.service';
import { AnalyticData } from '../models/analytic.model'; // 模型

@Injectable({
  providedIn: 'root',
})
export class AnalyticService {
  private history: number[] = [];

  constructor(private fleetService: FleetService) {}

  private calculateEfficiency(avgSpeed: number, alertsCount: number = 0): AnalyticData {
    const baseScore = 100;
    const speedPenalty = avgSpeed < 30 ? (30 - avgSpeed) * 2 : 0;
    const alertPenalty = alertsCount * 5;
    const currentScore = Math.max(0, baseScore - speedPenalty - alertPenalty);

    this.history.push(currentScore);
    if (this.history.length > 20) this.history.shift();

    return {
      score: Number(currentScore.toFixed(1)),
      previousScore: 90.0,
      trendPercentage: 4.2,
      isUpward: currentScore >= 90,
      status: currentScore > 85 ? 'optimal' : currentScore > 60 ? 'warning' : 'critical',
      lastUpdated: new Date(),
      chartData: [...this.history],
    };
  }

  getEfficiencyStats$(): Observable<AnalyticData> {
    return this.fleetService.getLiveDriverLocations().pipe(
      map((drivers) => {
        const totalSpeed = drivers.reduce((sum, d) => sum + (d.speed || 0), 0);
        const avgSpeed = drivers.length > 0 ? totalSpeed / drivers.length : 0;
        const alertsCount = drivers.filter((d) => d.status === 'warning').length;

        return this.calculateEfficiency(avgSpeed, alertsCount);
      })
    );
  }

  getAiRecommendation$(stats: AnalyticData): string {
    if (stats.status === 'critical') return '警告：區域效率極低，請立即檢核調度狀態。';
    if (stats.status === 'warning') return '提示：平均時速下降，建議檢查交通流量。';
    return '營運狀況理想，目前車隊效率符合預期。';
  }
}
