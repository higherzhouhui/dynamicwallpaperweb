export interface BaseData {
  id?: number;
  shebei?: string;
  lang?: string;
  comeTime?: number;
  leaveTime?: number;
  uuid: string;
  originUrl: string;
}

export interface SelectTime {
  startTime: number;
  endTime: number;
  pageSize: number;
  pageNum: number;
}
