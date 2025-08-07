import {BaseData, SelectTime} from './common.d';

import service from '@/utils/request';

export const loginWeb = (data: BaseData) => {
  return service({
    url: '/api/v1/login',
    method: 'POST',
    data,
  });
};

export const logOutWeb = (data: BaseData) => {
  return service({
    url: '/api/v1/loginOut',
    method: 'POST',
    data,
  });
};

export const clickDownRequest = (data: BaseData) => {
  return service({
    url: '/api/v1/clickDown',
    method: 'POST',
    data,
  });
};

export const getDataRequest = (params: any) => {
  return service({
    url: '/api/v1/search',
    method: 'GET',
    params,
  });
};

export const getStatsRequest = (params: any) => {
  return service({
    url: '/api/v1/stats',
    method: 'GET',
    params
  });
};


// 获取每日访问量统计
export const getDailyStatsRequest = (params: { startDate: string; endDate: string }) => {
  return service({
    url: '/api/v1/dailyStats',
    method: 'GET',
    params,
  });
};

// 获取实时访问量
export const getRealTimeStatsRequest = () => {
  return service({
    url: '/api/v1/realTimeStats',
    method: 'GET',
  });
};

export const getIp = () => {
  return service({
    url: '/checkIp',
    method: 'GET',
  });
}
