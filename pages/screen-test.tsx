import { Card, Col, Row, Statistic, Table, Tag, Typography, Progress } from 'antd';
import { useState, useEffect } from 'react';
import { 
  MonitorOutlined, 
  MobileOutlined,
  TabletOutlined,
  DesktopOutlined,
  EyeOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

import type { NextPage } from 'next';
import { 
  getScreenInfo, 
  getViewportInfo, 
  getCurrentScreenInfo, 
  getCommonResolutions,
  listenWindowResize,
  listenScreenOrientation
} from '@/utils/screen';

const { Title, Text, Paragraph } = Typography;

const ScreenTest: NextPage = () => {
  const [screenInfo, setScreenInfo] = useState<any>(null);
  const [viewportInfo, setViewportInfo] = useState<any>(null);
  const [commonResolutions, setCommonResolutions] = useState<any[]>([]);

  useEffect(() => {
    // 获取当前屏幕信息
    const currentScreenInfo = getCurrentScreenInfo();
    setScreenInfo(currentScreenInfo.screen);
    setViewportInfo(currentScreenInfo.viewport);
    
    // 获取常见分辨率列表
    const resolutions = getCommonResolutions();
    setCommonResolutions(resolutions);
    
    // 监听窗口大小变化
    const cleanupResize = listenWindowResize((viewport) => {
      setViewportInfo(viewport);
    });
    
    // 监听屏幕方向变化
    const cleanupOrientation = listenScreenOrientation((orientation) => {
      const newScreenInfo = getScreenInfo();
      setScreenInfo(newScreenInfo);
    });
    
    return () => {
      cleanupResize();
      cleanupOrientation();
    };
  }, []);

  const screenInfoColumns = [
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
        if (typeof value === 'number') {
          return <Text strong>{value}</Text>;
        }
        if (typeof value === 'string' && value.includes('×')) {
          return <Tag color="blue">{value}</Tag>;
        }
        if (typeof value === 'object') {
          return <Text code>{JSON.stringify(value)}</Text>;
        }
        return <Text>{value}</Text>;
      },
    },
  ];

  const viewportColumns = [
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
      render: (value: any) => <Text strong>{value}</Text>,
    },
  ];

  const resolutionColumns = [
    {
      title: '分辨率',
      dataIndex: 'resolution',
      key: 'resolution',
      render: (value: string) => <Tag color="blue">{value}</Tag>,
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类别',
      dataIndex: 'category',
      key: 'category',
      render: (value: string) => {
        const color = value === 'Mobile' ? 'green' : value === 'Tablet' ? 'orange' : 'purple';
        return <Tag color={color}>{value}</Tag>;
      },
    },
  ];

  if (!screenInfo || !viewportInfo) {
    return <div>加载中...</div>;
  }

  const screenInfoData = [
    { key: '屏幕分辨率', value: `${screenInfo.width}×${screenInfo.height}` },
    { key: '可用分辨率', value: `${screenInfo.availWidth}×${screenInfo.availHeight}` },
    { key: '设备像素比', value: screenInfo.devicePixelRatio },
    { key: '颜色深度', value: `${screenInfo.colorDepth}位` },
    { key: '像素深度', value: `${screenInfo.pixelDepth}位` },
    { key: '屏幕尺寸类型', value: screenInfo.screenSize },
    { key: '设备类型', value: screenInfo.deviceType },
    { key: '屏幕方向', value: `${screenInfo.orientation.type} (${screenInfo.orientation.angle}°)` },
  ];

  const viewportData = [
    { key: '视口宽度', value: viewportInfo.width },
    { key: '视口高度', value: viewportInfo.height },
    { key: '水平滚动', value: viewportInfo.scrollX },
    { key: '垂直滚动', value: viewportInfo.scrollY },
  ];

  const getDeviceIcon = (deviceType: string) => {
    if (deviceType.includes('Mobile')) {
      return <MobileOutlined />;
    } else if (deviceType.includes('Tablet')) {
      return <TabletOutlined />;
    } else {
      return <DesktopOutlined />;
    }
  };

  return (
    <div style={{ padding: '24px', background: '#f0f2f5', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        <MonitorOutlined /> 屏幕分辨率测试
      </Title>
      
      {/* 当前屏幕信息 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="屏幕分辨率"
              value={`${screenInfo.width}×${screenInfo.height}`}
              prefix={<MonitorOutlined />}
              valueStyle={{ fontSize: '16px' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="设备像素比"
              value={screenInfo.devicePixelRatio}
              prefix={<EyeOutlined />}
              valueStyle={{ fontSize: '16px' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="设备类型"
              value={screenInfo.deviceType}
              prefix={getDeviceIcon(screenInfo.deviceType)}
              valueStyle={{ fontSize: '16px' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="屏幕尺寸"
              value={screenInfo.screenSize}
              prefix={<InfoCircleOutlined />}
              valueStyle={{ fontSize: '16px' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 屏幕信息详情 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={12}>
          <Card title="屏幕详细信息">
            <Table
              columns={screenInfoColumns}
              dataSource={screenInfoData}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="视口信息">
            <Table
              columns={viewportColumns}
              dataSource={viewportData}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* 分辨率对比 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={24}>
          <Card title="分辨率对比">
            <div style={{ marginBottom: '16px' }}>
              <Text strong>当前分辨率: </Text>
              <Tag color="red" style={{ fontSize: '16px', padding: '4px 8px' }}>
                {screenInfo.width}×{screenInfo.height}
              </Tag>
              <Text style={{ marginLeft: '16px' }}>
                在所有常见设备中的占比:
              </Text>
            </div>
            <Progress 
              percent={Math.round((screenInfo.width * screenInfo.height) / (3840 * 2160) * 100)} 
              status="active"
              strokeColor={{
                '0%': '#108ee9',
                '100%': '#87d068',
              }}
            />
            <Text type="secondary" style={{ fontSize: '12px' }}>
              相对于4K分辨率 (3840×2160) 的像素密度
            </Text>
          </Card>
        </Col>
      </Row>

      {/* 常见分辨率列表 */}
      <Card title="常见设备分辨率">
        <Table
          columns={resolutionColumns}
          dataSource={commonResolutions}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
          }}
          size="small"
          rowKey="resolution"
        />
      </Card>

      {/* 代码示例 */}
      <Card title="使用示例" style={{ marginTop: '24px' }}>
        <Paragraph>
          <Text strong>1. 获取屏幕信息:</Text>
        </Paragraph>
        <pre style={{ background: '#f6f8fa', padding: '16px', borderRadius: '6px' }}>
{`import { getScreenInfo } from '@/utils/screen';

const screenInfo = getScreenInfo();
console.log(screenInfo);
// 输出: {
//   width: 1920,
//   height: 1080,
//   devicePixelRatio: 1,
//   screenSize: "Desktop",
//   deviceType: "Desktop",
//   orientation: { type: "landscape-primary", angle: 0 }
// }`}
        </pre>

        <Paragraph>
          <Text strong>2. 获取视口信息:</Text>
        </Paragraph>
        <pre style={{ background: '#f6f8fa', padding: '16px', borderRadius: '6px' }}>
{`import { getViewportInfo } from '@/utils/screen';

const viewport = getViewportInfo();
console.log(viewport);
// 输出: {
//   width: 1920,
//   height: 937,
//   scrollX: 0,
//   scrollY: 0
// }`}
        </pre>

        <Paragraph>
          <Text strong>3. 监听窗口大小变化:</Text>
        </Paragraph>
        <pre style={{ background: '#f6f8fa', padding: '16px', borderRadius: '6px' }}>
{`import { listenWindowResize } from '@/utils/screen';

const cleanup = listenWindowResize((viewport) => {
  console.log('窗口大小变化:', viewport);
});

// 清理监听器
cleanup();`}
        </pre>

        <Paragraph>
          <Text strong>4. 格式化显示:</Text>
        </Paragraph>
        <pre style={{ background: '#f6f8fa', padding: '16px', borderRadius: '6px' }}>
{`import { formatScreenInfo } from '@/utils/screen';

const formatted = formatScreenInfo(screenInfo);
console.log(formatted);
// 输出: "1920×1080 (Desktop)"`}
        </pre>
      </Card>
    </div>
  );
};

ScreenTest.displayName = 'ScreenTest';

export default ScreenTest; 