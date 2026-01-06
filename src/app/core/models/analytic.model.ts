export interface AnalyticData {
  score: number; // 當前效率分數
  previousScore: number; // 上一階段的分數
  trendPercentage: number; // 趨勢百分比
  isUpward: boolean; // 趨勢是上升還是下降
  status: 'optimal' | 'warning' | 'critical'; // 系統狀態
  lastUpdated: Date; // 最後更新時間
  chartData: number[]; // 給 mini-chart 用的數值陣列 (例如過去 10 次的記錄)
}
