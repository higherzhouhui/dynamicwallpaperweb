export interface BaseData {
  id?: string;
  deviceType?: string;
  lang?: string;
  platform?: string;
  timezone?: string;
  screenResolution?: string;
  comeTime?: number;
  leaveTime?: number;
  uuid?: string;
  originUrl?: string;
}

export interface SelectTime {
  startTime: number;
  endTime: number;
  pageSize: number;
  pageNum: number;
}

// 每日统计数据接口
export interface DailyStatsData {
  date: string;
  totalVisits: number;
  uniqueVisitors: number;
  totalDownloads: number;
  avgSessionDuration: number;
  bounceRate: number;
  topReferrers: Array<{
    url: string;
    count: number;
  }>;
  deviceStats: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  languageStats: Array<{
    lang: string;
    count: number;
  }>;
}

// 实时统计数据接口
export interface RealTimeStatsData {
  currentVisitors: number;
  todayVisits: number;
  todayDownloads: number;
  onlineUsers: Array<{
    uuid: string;
    deviceType: string;
    visitTime: number;
    currentPage: string;
  }>;
}
