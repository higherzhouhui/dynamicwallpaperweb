import { Card, Col, Row, Statistic, DatePicker, Table, Tag, Progress } from 'antd';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { 
  UserOutlined, 
  EyeOutlined, 
  DownloadOutlined, 
  ClockCircleOutlined,
  DesktopOutlined,
  MobileOutlined,
  TabletOutlined
} from '@ant-design/icons';

import type { NextPage } from 'next';
import { getDailyStatsRequest, getRealTimeStatsRequest } from '@/services/common';
import { DailyStatsData, RealTimeStatsData } from '@/services/common.d';

const { RangePicker } = DatePicker;

const DailyStats: NextPage = () => {
  const [dailyStats, setDailyStats] = useState<DailyStatsData[]>([]);
  const [realTimeStats, setRealTimeStats] = useState<RealTimeStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(30, 'days'),
    dayjs()
  ]);

  // 获取每日统计数据
  const fetchDailyStats = async () => {
    setLoading(true);
    try {
      const res = await getDailyStatsRequest({
        startDate: dateRange[0].format('YYYY-MM-DD'),
        endDate: dateRange[1].format('YYYY-MM-DD')
      });
      if (res.code === 200) {
        setDailyStats(res.data);
      }
    } catch (error) {
      console.error('获取每日统计数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 获取实时统计数据
  const fetchRealTimeStats = async () => {
    try {
      const res = await getRealTimeStatsRequest();
      if (res.code === 200) {
        setRealTimeStats(res.data);
      }
    } catch (error) {
      console.error('获取实时统计数据失败:', error);
    }
  };

  useEffect(() => {
    fetchDailyStats();
    fetchRealTimeStats();
    
    // 每30秒更新一次实时数据
    const interval = setInterval(fetchRealTimeStats, 30000);
    return () => clearInterval(interval);
  }, [dateRange]);

  const columns = [
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
      width: 120,
    },
    {
      title: '总访问量',
      dataIndex: 'totalVisits',
      key: 'totalVisits',
      width: 100,
      render: (value: number) => <Tag color="blue">{value}</Tag>,
    },
    {
      title: '独立访客',
      dataIndex: 'uniqueVisitors',
      key: 'uniqueVisitors',
      width: 100,
      render: (value: number) => <Tag color="green">{value}</Tag>,
    },
    {
      title: '下载次数',
      dataIndex: 'totalDownloads',
      key: 'totalDownloads',
      width: 100,
      render: (value: number) => <Tag color="orange">{value}</Tag>,
    },
    {
      title: '平均会话时长',
      dataIndex: 'avgSessionDuration',
      key: 'avgSessionDuration',
      width: 120,
      render: (value: number) => `${Math.floor(value / 60)}分${value % 60}秒`,
    },
    {
      title: '跳出率',
      dataIndex: 'bounceRate',
      key: 'bounceRate',
      width: 100,
      render: (value: number) => (
        <Progress 
          percent={value} 
          size="small" 
          status={value > 70 ? 'exception' : value > 50 ? 'normal' : 'success'}
        />
      ),
    },
  ];

  // 设备统计卡片
  const DeviceStatsCards = () => {
    if (!dailyStats.length) return null;
    const stats = dailyStats[0].deviceStats;
    return (
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="桌面端访问"
              value={stats.desktop}
              prefix={<DesktopOutlined {...({} as any)} />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="移动端访问"
              value={stats.mobile}
              prefix={<MobileOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="平板端访问"
              value={stats.tablet}
              prefix={<TabletOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>
    );
  };

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '24px' }}>每日访问量统计</h1>
      
      {/* 实时统计卡片 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="当前在线用户"
              value={realTimeStats?.currentVisitors || 0}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日访问量"
              value={realTimeStats?.todayVisits || 0}
              prefix={<EyeOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="今日下载量"
              value={realTimeStats?.todayDownloads || 0}
              prefix={<DownloadOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均访问时长"
              value={dailyStats.length > 0 ? Math.floor(dailyStats[0].avgSessionDuration / 60) : 0}
              suffix="分钟"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 时间范围选择 */}
      <Card style={{ marginBottom: '24px' }}>
        <RangePicker
          value={dateRange}
          onChange={(dates) => {
            if (dates && dates[0] && dates[1]) {
              setDateRange([dates[0], dates[1]]);
            }
          }}
          format="YYYY-MM-DD"
          style={{ marginRight: '16px' }}
        />
        <span style={{ color: '#666' }}>
          选择时间范围查看统计数据
        </span>
      </Card>

      {/* 设备统计 */}
      <DeviceStatsCards />

      {/* 在线用户详情 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={24}>
          <Card title="在线用户详情" loading={loading}>
            <Table
              dataSource={realTimeStats?.onlineUsers || []}
              columns={[
                {
                  title: '设备ID',
                  dataIndex: 'uuid',
                  key: 'uuid',
                  width: 120,
                  render: (value: string) => value.substring(0, 8) + '...',
                },
                {
                  title: '设备类型',
                  dataIndex: 'deviceType',
                  key: 'deviceType',
                  width: 100,
                  render: (value: string) => {
                    const icon = value.includes('Mobile') ? <MobileOutlined /> : 
                               value.includes('Tablet') ? <TabletOutlined /> : <DesktopOutlined />;
                    return <span>{icon} {value}</span>;
                  },
                },
                {
                  title: '访问时间',
                  dataIndex: 'visitTime',
                  key: 'visitTime',
                  width: 120,
                  render: (value: number) => dayjs(value).format('HH:mm:ss'),
                },
                {
                  title: '当前页面',
                  dataIndex: 'currentPage',
                  key: 'currentPage',
                  render: (value: string) => <Tag color="blue">{value}</Tag>,
                },
              ]}
              pagination={false}
              size="small"
              scroll={{ y: 200 }}
            />
          </Card>
        </Col>
      </Row>

      {/* 详细数据表格 */}
      <Card title="每日详细数据" loading={loading}>
        <Table
          columns={columns}
          dataSource={dailyStats}
          rowKey="date"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  );
};

DailyStats.displayName = 'DailyStats';

export default DailyStats; 