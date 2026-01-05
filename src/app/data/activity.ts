import { ActivityLog } from '../core/models/dashboard.model';

export const ACTIVITY_MESSAGES: Partial<ActivityLog>[] = [
  { message: '已進入地理圍欄區域：台北總部', type: 'success' },
  { message: '車速異常：超過時速 80 公里', type: 'danger' },
  { message: '油量偏低，請提醒司機加油', type: 'warning' },
  { message: '配送任務已完成', type: 'info' },
  { message: '車輛感測器連線正常', type: 'success' },
  { message: 'GPS 訊號弱，更新延遲', type: 'warning' },
];
