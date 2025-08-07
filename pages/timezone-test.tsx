import { Card, Col, Row, Statistic, Table, Tag, Typography } from 'antd';
import { useState, useEffect } from 'react';
import { 
  ClockCircleOutlined, 
  GlobalOutlined,
  EnvironmentOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

import type { NextPage } from 'next';
import { getBrowserTimezone, getCurrentTimeInfo, getCommonTimezones, convertToTimezone } from '@/utils/timezone';

const { Title, Text, Paragraph } = Typography;

const TimezoneTest: NextPage = () => {
  const [timeInfo, setTimeInfo] = useState<any>(null);
  const [commonTimezones, setCommonTimezones] = useState<any[]>([]);

  useEffect(() => {
    // 获取当前时区信息
    const currentTimeInfo = getCurrentTimeInfo();
    setTimeInfo(currentTimeInfo);
    
    // 获取常见时区列表
    const timezones = getCommonTimezones();
    setCommonTimezones(timezones);
    
    // 每秒更新一次时间
    const interval = setInterval(() => {
      setTimeInfo(getCurrentTimeInfo());
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const timezoneColumns = [
    {
      title: '时区名称',
      dataIndex: 'value',
      key: 'value',
      render: (value: string) => <Tag color="blue">{value}</Tag>,
    },
    {
      title: '显示名称',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: '当前时间',
      key: 'currentTime',
      render: (record: any) => {
        try {
          const time = convertToTimezone(new Date(), record.value);
          return <Text code>{time}</Text>;
        } catch (error) {
          return <Text type="secondary">无法获取</Text>;
        }
      },
    },
  ];

  const browserInfoColumns = [
    {
      title: '属性',
      dataIndex: 'key',
      key: 'key',
      width: 150,
    },
    {
      title: '值',
      dataIndex: 'value',
      key: 'value',
      render: (value: any) => {
        if (typeof value === 'boolean') {
          return <Tag color={value ? 'green' : 'red'}>{value ? '是' : '否'}</Tag>;
        }
        if (typeof value === 'string' && value.includes('UTC')) {
          return <Tag color="orange">{value}</Tag>;
        }
        return <Text>{value}</Text>;
      },
    },
  ];

  if (!timeInfo) {
    return <div>加载中...</div>;
  }

  const browserInfo = [
    { key: '时区名称', value: timeInfo.timezone.timezone },
    { key: '时区偏移', value: timeInfo.timezone.offset },
    { key: '偏移分钟数', value: timeInfo.timezone.offsetMinutes },
    { key: '夏令时', value: timeInfo.timezone.isDST },
    { key: '地区', value: timeInfo.timezone.region },
    { key: '格式化显示', value: timeInfo.formattedTimezone },
  ];

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        <GlobalOutlined /> 浏览器时区测试
      </Title>
      
      {/* 当前时间信息 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="本地时间"
              value={timeInfo.localTime}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ fontSize: '16px' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="UTC时间"
              value={timeInfo.utcTime}
              prefix={<EnvironmentOutlined />}
              valueStyle={{ fontSize: '16px' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="时区信息"
              value={timeInfo.formattedTimezone}
              prefix={<InfoCircleOutlined />}
              valueStyle={{ fontSize: '16px' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 浏览器时区详细信息 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={12}>
          <Card title="浏览器时区详细信息">
            <Table
              columns={browserInfoColumns}
              dataSource={browserInfo}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="时区获取方法说明">
            <Paragraph>
              <Text strong>方法1: Intl.DateTimeFormat (推荐)</Text>
            </Paragraph>
            <Paragraph>
              使用 <Text code>Intl.DateTimeFormat().resolvedOptions().timeZone</Text> 获取时区名称，
              这是最准确的方法，支持 IANA 时区数据库。
            </Paragraph>
            <Paragraph>
              <Text strong>方法2: getTimezoneOffset (降级)</Text>
            </Paragraph>
            <Paragraph>
              使用 <Text code>new Date().getTimezoneOffset()</Text> 获取时区偏移分钟数，
              作为降级方案，但无法获取具体的时区名称。
            </Paragraph>
            <Paragraph>
              <Text strong>夏令时检测</Text>
            </Paragraph>
            <Paragraph>
              通过比较1月和7月的时区偏移来检测是否处于夏令时。
            </Paragraph>
          </Card>
        </Col>
      </Row>

      {/* 常见时区列表 */}
      <Card title="常见时区列表">
        <Table
          columns={timezoneColumns}
          dataSource={commonTimezones}
          pagination={false}
          size="small"
          rowKey="value"
        />
      </Card>

      {/* 代码示例 */}
      <Card title="使用示例" style={{ marginTop: '24px' }}>
        <Paragraph>
          <Text strong>1. 获取浏览器时区信息:</Text>
        </Paragraph>
        <pre style={{ background: '#f6f8fa', padding: '16px', borderRadius: '6px' }}>
{`import { getBrowserTimezone } from '@/utils/timezone';

const timezoneInfo = getBrowserTimezone();
console.log(timezoneInfo);
// 输出: {
//   timezone: "Asia/Shanghai",
//   offset: "+08:00",
//   offsetMinutes: 480,
//   isDST: false,
//   region: "Shanghai"
// }`}
        </pre>

        <Paragraph>
          <Text strong>2. 格式化时区显示:</Text>
        </Paragraph>
        <pre style={{ background: '#f6f8fa', padding: '16px', borderRadius: '6px' }}>
{`import { formatTimezone } from '@/utils/timezone';

const formatted = formatTimezone(timezoneInfo);
console.log(formatted);
// 输出: "Asia/Shanghai +08:00"`}
        </pre>

        <Paragraph>
          <Text strong>3. 时间转换:</Text>
        </Paragraph>
        <pre style={{ background: '#f6f8fa', padding: '16px', borderRadius: '6px' }}>
{`import { convertToTimezone } from '@/utils/timezone';

const localTime = new Date();
const tokyoTime = convertToTimezone(localTime, 'Asia/Tokyo');
console.log(tokyoTime);
// 输出: "2024/1/15 10:30:00"`}
        </pre>
      </Card>
    </div>
  );
};

TimezoneTest.displayName = 'TimezoneTest';

export default TimezoneTest; 