const express = require('express');
const cors = require('cors');
const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 模拟数据库存储
let visitData = [];
let onlineUsers = new Map();

// 记录用户访问
app.post('/v1/login', (req, res) => {
  const { deviceType, lang, platform, timezone, screenInfo, comeTime, uuid, originUrl } = req.body;
  
  // 记录访问数据
  const visitRecord = {
    id: Date.now(),
    deviceType,
    lang,
    platform,
    timezone,
    screenInfo,
    comeTime,
    uuid,
    originUrl,
    leaveTime: null,
    loginNum: 1,
    clickNum: 0
  };
  
  // 检查是否已存在该用户的访问记录
  const existingRecord = visitData.find(record => record.uuid === uuid);
  if (existingRecord) {
    existingRecord.loginNum += 1;
    existingRecord.comeTime = comeTime;
  } else {
    visitData.push(visitRecord);
  }
  
  // 添加到在线用户
  onlineUsers.set(uuid, {
    uuid,
    deviceType,
    visitTime: comeTime,
    currentPage: req.headers.referer || '/'
  });
  
  res.json({ code: 200, message: '访问记录成功' });
});

// 记录用户离开
app.post('/v1/loginOut', (req, res) => {
  const { leaveTime, uuid } = req.body;
  
  // 更新访问记录
  const record = visitData.find(r => r.uuid === uuid);
  if (record) {
    record.leaveTime = leaveTime;
  }
  
  // 从在线用户中移除
  onlineUsers.delete(uuid);
  
  res.json({ code: 200, message: '离开记录成功' });
});

// 记录下载点击
app.post('/v1/clickDown', (req, res) => {
  const { uuid } = req.body;
  
  const record = visitData.find(r => r.uuid === uuid);
  if (record) {
    record.clickNum += 1;
  }
  
  res.json({ code: 200, message: '下载记录成功' });
});

// 获取统计数据
app.get('/v1/getData', (req, res) => {
  const { startTime, endTime, pageNum = 1, pageSize = 50 } = req.query;
  
  let filteredData = visitData;
  
  // 时间过滤
  if (startTime && endTime) {
    filteredData = visitData.filter(record => 
      record.comeTime >= parseInt(startTime) && record.comeTime <= parseInt(endTime)
    );
  }
  
  // 分页
  const start = (pageNum - 1) * pageSize;
  const end = start + parseInt(pageSize);
  const paginatedData = filteredData.slice(start, end);
  
  // 计算总计
  const totalClick = filteredData.reduce((sum, record) => sum + record.clickNum, 0);
  const totalLogin = filteredData.reduce((sum, record) => sum + record.loginNum, 0);
  
  res.json({
    code: 200,
    data: {
      list: paginatedData,
      totalSize: filteredData.length,
      totalClick,
      totalLogin
    }
  });
});

// 获取每日统计数据
app.get('/v1/dailyStats', (req, res) => {
  const { startDate, endDate } = req.query;
  
  // 按日期分组统计
  const dailyStats = {};
  
  visitData.forEach(record => {
    const date = new Date(record.comeTime).toISOString().split('T')[0];
    
    if (date >= startDate && date <= endDate) {
      if (!dailyStats[date]) {
        dailyStats[date] = {
          date,
          totalVisits: 0,
          uniqueVisitors: new Set(),
          totalDownloads: 0,
          sessionDurations: [],
          deviceStats: { desktop: 0, mobile: 0, tablet: 0 },
          languageStats: {},
          referrers: {}
        };
      }
      
      const dayData = dailyStats[date];
      dayData.totalVisits += record.loginNum;
      dayData.uniqueVisitors.add(record.uuid);
      dayData.totalDownloads += record.clickNum;
      
      // 计算会话时长
      if (record.leaveTime && record.comeTime) {
        const duration = record.leaveTime - record.comeTime;
        dayData.sessionDurations.push(duration);
      }
      
      // 设备类型统计
      if (record.deviceType.includes('Mobile')) {
        dayData.deviceStats.mobile++;
      } else if (record.deviceType.includes('Tablet')) {
        dayData.deviceStats.tablet++;
      } else {
        dayData.deviceStats.desktop++;
      }
      
      // 语言统计
      dayData.languageStats[record.lang] = (dayData.languageStats[record.lang] || 0) + 1;
      
      // 来源统计
      if (record.originUrl) {
        dayData.referrers[record.originUrl] = (dayData.referrers[record.originUrl] || 0) + 1;
      }
    }
  });
  
  // 转换为数组格式并计算平均值
  const result = Object.values(dailyStats).map(dayData => {
    const avgSessionDuration = dayData.sessionDurations.length > 0 
      ? Math.floor(dayData.sessionDurations.reduce((a, b) => a + b, 0) / dayData.sessionDurations.length)
      : 0;
    
    const bounceRate = dayData.totalVisits > 0 
      ? Math.round((dayData.totalVisits - dayData.uniqueVisitors.size) / dayData.totalVisits * 100)
      : 0;
    
    return {
      date: dayData.date,
      totalVisits: dayData.totalVisits,
      uniqueVisitors: dayData.uniqueVisitors.size,
      totalDownloads: dayData.totalDownloads,
      avgSessionDuration,
      bounceRate,
      deviceStats: dayData.deviceStats,
      languageStats: Object.entries(dayData.languageStats).map(([lang, count]) => ({ lang, count })),
      topReferrers: Object.entries(dayData.referrers)
        .map(([url, count]) => ({ url, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)
    };
  });
  
  res.json({
    code: 200,
    data: result.sort((a, b) => a.date.localeCompare(b.date))
  });
});

// 获取实时统计数据
app.get('/v1/realTimeStats', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const todayStart = new Date(today).getTime();
  const todayEnd = todayStart + 24 * 60 * 60 * 1000;
  
  // 今日访问量
  const todayVisits = visitData
    .filter(record => record.comeTime >= todayStart && record.comeTime < todayEnd)
    .reduce((sum, record) => sum + record.loginNum, 0);
  
  // 今日下载量
  const todayDownloads = visitData
    .filter(record => record.comeTime >= todayStart && record.comeTime < todayEnd)
    .reduce((sum, record) => sum + record.clickNum, 0);
  
  res.json({
    code: 200,
    data: {
      currentVisitors: onlineUsers.size,
      todayVisits,
      todayDownloads,
      onlineUsers: Array.from(onlineUsers.values())
    }
  });
});

// 定时清理过期数据（保留30天）
setInterval(() => {
  const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
  visitData = visitData.filter(record => record.comeTime > thirtyDaysAgo);
  
  // 清理超时的在线用户（超过30分钟无活动）
  const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
  for (const [uuid, user] of onlineUsers.entries()) {
    if (user.visitTime < thirtyMinutesAgo) {
      onlineUsers.delete(uuid);
    }
  }
}, 60 * 60 * 1000); // 每小时执行一次

const PORT = process.env.PORT || 2202;
app.listen(PORT, () => {
  console.log(`统计服务运行在端口 ${PORT}`);
});

module.exports = app; 