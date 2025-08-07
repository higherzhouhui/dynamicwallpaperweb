/**
 * 获取浏览器时区信息
 * @returns 时区信息对象
 */
export interface TimezoneInfo {
  timezone: string;
  offset: string;
  offsetMinutes: number;
  isDST: boolean;
  region: string;
}

export const getBrowserTimezone = (): TimezoneInfo => {
  let timezone = 'UTC';
  let offset = '+00:00';
  let offsetMinutes = 0;
  let isDST = false;
  let region = 'Unknown';

  try {
    // 方法1: 使用 Intl.DateTimeFormat (推荐)
    const dateTimeFormat = Intl.DateTimeFormat();
    const resolvedOptions = dateTimeFormat.resolvedOptions();
    timezone = resolvedOptions.timeZone;
    
    // 获取时区偏移
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const targetTime = new Date(utc + (0 * 60000));
    const offsetMs = targetTime.getTime() - now.getTime();
    offsetMinutes = Math.round(offsetMs / 60000);
    
    // 格式化偏移字符串
    const hours = Math.abs(Math.floor(offsetMinutes / 60));
    const minutes = Math.abs(offsetMinutes % 60);
    offset = `${offsetMinutes >= 0 ? '+' : '-'}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
    // 检测夏令时
    const jan = new Date(now.getFullYear(), 0, 1);
    const jul = new Date(now.getFullYear(), 6, 1);
    const janOffset = jan.getTimezoneOffset();
    const julOffset = jul.getTimezoneOffset();
    isDST = Math.min(janOffset, julOffset) === now.getTimezoneOffset();
    
    // 提取地区信息
    if (timezone.includes('/')) {
      region = timezone.split('/').pop() || 'Unknown';
    } else {
      region = timezone;
    }
    
  } catch (error) {
    // 方法2: 降级处理，使用 getTimezoneOffset
    const offsetMinutes = new Date().getTimezoneOffset();
    const hours = Math.abs(Math.floor(offsetMinutes / 60));
    const minutes = Math.abs(offsetMinutes % 60);
    
    timezone = `UTC${offsetMinutes <= 0 ? '+' : '-'}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    offset = `${offsetMinutes <= 0 ? '+' : '-'}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    region = 'Unknown';
  }

  return {
    timezone,
    offset,
    offsetMinutes,
    isDST,
    region
  };
};

/**
 * 格式化时区显示
 * @param timezoneInfo 时区信息
 * @returns 格式化的时区字符串
 */
export const formatTimezone = (timezoneInfo: TimezoneInfo): string => {
  const { timezone, offset, isDST } = timezoneInfo;
  
  if (timezone === 'UTC') {
    return `UTC ${offset}`;
  }
  
  const dstSuffix = isDST ? ' (DST)' : '';
  return `${timezone} ${offset}${dstSuffix}`;
};

/**
 * 获取常见时区列表
 * @returns 时区列表
 */
export const getCommonTimezones = (): Array<{value: string, label: string}> => {
  return [
    { value: 'Asia/Shanghai', label: '中国标准时间 (UTC+8)' },
    { value: 'Asia/Tokyo', label: '日本标准时间 (UTC+9)' },
    { value: 'Asia/Seoul', label: '韩国标准时间 (UTC+9)' },
    { value: 'America/New_York', label: '美国东部时间 (UTC-5)' },
    { value: 'America/Los_Angeles', label: '美国西部时间 (UTC-8)' },
    { value: 'Europe/London', label: '英国时间 (UTC+0)' },
    { value: 'Europe/Paris', label: '欧洲中部时间 (UTC+1)' },
    { value: 'Australia/Sydney', label: '澳大利亚东部时间 (UTC+10)' },
    { value: 'UTC', label: '协调世界时 (UTC+0)' }
  ];
};

/**
 * 转换时间到指定时区
 * @param date 日期对象
 * @param targetTimezone 目标时区
 * @returns 转换后的日期字符串
 */
export const convertToTimezone = (date: Date, targetTimezone: string): string => {
  try {
    return date.toLocaleString('en-US', { timeZone: targetTimezone });
  } catch (error) {
    return date.toISOString();
  }
};

/**
 * 获取当前时间的时区信息
 * @returns 当前时间的时区信息
 */
export const getCurrentTimeInfo = () => {
  const timezoneInfo = getBrowserTimezone();
  const now = new Date();
  
  return {
    localTime: now.toLocaleString(),
    utcTime: now.toISOString(),
    timezone: timezoneInfo,
    formattedTimezone: formatTimezone(timezoneInfo)
  };
}; 