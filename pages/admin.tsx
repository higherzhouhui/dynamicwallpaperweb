import {Button, DatePicker, Table} from 'antd';
import {useState, useEffect} from 'react';

import type {NextPage} from 'next';

import {getDataRequest} from '@/services/common';
import {AdminContainer} from '@/styles/introduce';

const {RangePicker} = DatePicker;

const Introduce: NextPage = () => {
  const [list, setList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, settotal] = useState(0);
  const [startTime, setStartTime] = useState<any>();
  const [endTime, setEndTime] = useState<any>();
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      title: '设备ID',
      dataIndex: 'uuid',
      key: 'uuid',
    },
    {
      title: '使用设备',
      dataIndex: 'shebei',
      key: 'shebei',
    },
    {
      title: '语言',
      dataIndex: 'lang',
      key: 'lang',
      width: 100,
    },
    {
      title: '最近一次访问时间',
      dataIndex: 'comeTime',
      key: 'comeTime',
    },
    {
      title: '最后一次离开时间',
      dataIndex: 'leaveTime',
      key: 'leaveTime',
    },
    {
      title: '总共访问次数',
      dataIndex: 'loginNum',
      key: 'loginNum',
      width: 110,
    },
    {
      title: '跳转APP下载次数',
      dataIndex: 'clickNum',
      key: 'clickNum',
      width: 130,
    },
  ];
  const handleOnchange = (e: any) => {
    if (e.length === 2) {
      setStartTime(new Date(e[0]).getTime());
      setEndTime(new Date(e[1]).getTime());
    } else {
      setStartTime(0);
      setEndTime(new Date().getTime());
    }
    setTimeout(() => {
      getInitData();
    }, 10);
  };

  const getInitData = () => {
    setLoading(true);
    getDataRequest({
      startTime: startTime || 0,
      endTime: endTime || new Date().getTime(),
      pageNum,
      pageSize,
    }).then((res: any) => {
      setLoading(false);
      if (res.code === 200) {
        res.data.list.forEach((item: any) => {
          item.comeTime = `${new Date(item.comeTime)}`;
          if (item.leaveTime) {
            item.leaveTime = `${new Date(item.leaveTime)}`;
          }
        });
        setList(res.data.list);
        settotal(res.data.totalSize);
      }
    });
  };

  useEffect(() => {
    getInitData();
  }, []);
  return (
    <AdminContainer>
      <h1>网站统计</h1>
      <div className='timeWrapper'>
        <span className='time'>访问日期范围</span>
        <RangePicker
          format='YYYY-MM-DD HH:mm:ss'
          showTime={{
            hideDisabledOptions: true,
          }}
          onChange={(e) => {
            handleOnchange(e);
          }}
        />
        <Button
          size='small'
          type='primary'
          onClick={() => {
            getInitData();
          }}
        >
          刷新
        </Button>
      </div>

      <Table
        sticky
        columns={columns}
        dataSource={list}
        loading={loading}
        pagination={{pageSize, current: pageNum}}
        rowKey='uuid'
        scroll={{
          x: 1500,
          y: 600,
        }}
        size='small'
      />
    </AdminContainer>
  );
};

Introduce.displayName = 'Introduce';

export default Introduce;
