import {BaseData, SelectTime} from './common.d';

import service from '@/utils/request';

export const loginWeb = (data: BaseData) => {
  return service({
    url: '/api/login',
    method: 'POST',
    data,
  });
};

export const logOutWeb = (data: BaseData) => {
  return service({
    url: '/api/loginOut',
    method: 'POST',
    data,
  });
};

export const clickDownRequest = (data: BaseData) => {
  return service({
    url: '/api/clickDown',
    method: 'POST',
    data,
  });
};

export const getDataRequest = (params: SelectTime) => {
  return service({
    url: '/api/getData',
    method: 'GET',
    params,
  });
};
