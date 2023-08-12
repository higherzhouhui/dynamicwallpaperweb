import {Button, DatePicker, Table, TablePaginationConfig} from 'antd';
import moment from 'moment';
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
  const [totalLogin, setTotalLogin] = useState(0);
  const [totalClick, setTotalClick] = useState(0);
  const columns = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      width: 50,
    },
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

  const handleChangePage = (e: TablePaginationConfig) => {
    setPageNum(e.current || 1);
    setPageSize(e.pageSize || 10);
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
      let tempLogin = 0;
      let tempClick = 0;
      if (res.code === 200) {
        res.data.list.forEach((item: any, index: number) => {
          item.comeTime = moment(new Date(item.comeTime)).format(
            'YYYY-MM-DD HH:mm:ss'
          );
          item.index = index + 1 + (pageNum - 1) * pageSize;
          if (item.leaveTime) {
            item.leaveTime = moment(new Date(item.leaveTime)).format(
              'YYYY-MM-DD HH:mm:ss'
            );
          }
          tempLogin += item.loginNum;
          tempClick += item.clickNum;
        });
        setTotalLogin(tempLogin);
        setTotalClick(tempClick);
        setList(res.data.list);
        settotal(res.data.totalSize);
      }
    });
  };

  useEffect(() => {
    getInitData();
  }, [pageNum, pageSize]);
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
        pagination={{
          pageSize,
          total,
          current: pageNum,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: [20, 50, 300, 1000],
        }}
        rowKey='id'
        scroll={{
          x: 1500,
          y: 600,
        }}
        size='small'
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} />
              <Table.Summary.Cell index={1}>合计</Table.Summary.Cell>
              <Table.Summary.Cell index={2} />
              <Table.Summary.Cell index={3} />
              <Table.Summary.Cell index={4} />
              <Table.Summary.Cell index={5} />
              <Table.Summary.Cell index={6}>
                <span style={{color: 'red'}}>{totalLogin}</span>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={6}>
                <span style={{color: 'red'}}>{totalClick}</span>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
        onChange={(e) => {
          handleChangePage(e);
        }}
      />
    </AdminContainer>
  );
};

Introduce.displayName = 'Introduce';

export default Introduce;
