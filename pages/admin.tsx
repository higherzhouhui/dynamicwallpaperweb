import {Button, DatePicker, Table, TablePaginationConfig, Tag, Card, Row, Col, Input, Select} from 'antd';
import moment from 'moment';
import {useState, useEffect, useCallback, useRef} from 'react';

import type {NextPage} from 'next';
import {getStatsRequest, getDataRequest} from '@/services/common';

const {RangePicker} = DatePicker;
const {Option} = Select;

interface UserData {
  id: number;
  uuid: string;
  lang: string;
  ip: string;
  address: string;
  originUrl: string;
  downNum: number;
  visitNum: number;
  stayTime: number;
  comeTime: string;
  leaveTime: string;
  deviceType: string;
  platform: string;
  screenResolution: string;
  timezone: string;
}

interface StatsData {
  today: {
    visitors: number;
    visits: number;
    clicks: number;
    avgStayTime: number;
    date: string;
  };
  total: {
    visitors: number;
    visits: number;
    clicks: number;
    avgStayTime: number;
  };
}

const Admin: NextPage = () => {
  const [list, setList] = useState<UserData[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState<StatsData | null>(null);
  const resetAndSearchRef = useRef(false);
  const [tableScrollY, setTableScrollY] = useState(600);
  
  // 搜索条件（包括分页和时间范围）
  const [searchConditions, setSearchConditions] = useState({
    uuid: '',
    platform: '',
    originUrl: '',
    ip: '',
    address: '',
    lang: '',
    comeTimeStart: '',
    comeTimeEnd: '',
    visitNumMin: '',
    downNumMin: '',
    manager: '',
    page: 1,
    pageSize: 20,
    timeRange: null as any,
  });

  const columns = [
    {
      title: '编号',
      dataIndex: 'index',
      key: 'index',
      width: 60,
      fixed: 'left' as const,
    },
    {
      title: '设备ID',
      dataIndex: 'uuid',
      key: 'uuid',
      width: 180,
      ellipsis: true,
    },
    {
      title: '平台',
      dataIndex: 'platform',
      key: 'platform',
      width: 100,
      render: (text: string) => {
        const colorMap: { [key: string]: string } = {
          'Windows': 'blue',
          'macOS': 'green', 
          'iOS': 'orange',
          'Android': 'red',
        };
        return <Tag color={colorMap[text] || 'default'}>{text || 'Unknown'}</Tag>;
      },
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
      width: 120,
    },
    // {
    //   title: '地址',
    //   dataIndex: 'address',
    //   key: 'address',
    //   width: 150,
    //   ellipsis: true,
    // },
    {
      title: '来源',
      dataIndex: 'originUrl',
      key: 'originUrl',
      width: 200,
      ellipsis: true,
      render: (text: string) => (
        <span title={text}>{text === 'direct' ? '直接访问' : text}</span>
      ),
    },
          {
        title: '语言',
        dataIndex: 'lang',
        key: 'lang',
        width: 80,
        render: (text: string) => {
          const langMap: { [key: string]: string } = {
            'zh': '中文',
            'zh-CN': '简体中文',
            'zh-TW': '繁体中文',
            'en': '英文',
            'en-US': '美式英语',
            'en-GB': '英式英语',
            'ru': '俄文',
            'ja': '日文',
            'ko': '韩文',
            'fr': '法文',
            'de': '德文',
            'es': '西班牙文',
            'pt': '葡萄牙文',
            'it': '意大利文',
            'ar': '阿拉伯文',
            'hi': '印地文',
            'th': '泰文',
            'vi': '越南文',
            'tr': '土耳其文',
            'pl': '波兰文',
            'nl': '荷兰文',
            'sv': '瑞典文',
            'da': '丹麦文',
            'no': '挪威文',
            'fi': '芬兰文',
            'cs': '捷克文',
            'hu': '匈牙利文',
            'ro': '罗马尼亚文',
            'bg': '保加利亚文',
            'hr': '克罗地亚文',
            'sk': '斯洛伐克文',
            'sl': '斯洛文尼亚文',
            'et': '爱沙尼亚文',
            'lv': '拉脱维亚文',
            'lt': '立陶宛文',
            'he': '希伯来文',
            'fa': '波斯文',
            'ur': '乌尔都文',
            'bn': '孟加拉文',
            'ta': '泰米尔文',
            'te': '泰卢固文',
            'ml': '马拉雅拉姆文',
            'kn': '卡纳达文',
            'gu': '古吉拉特文',
            'pa': '旁遮普文',
            'mr': '马拉地文',
            'ne': '尼泊尔文',
            'si': '僧伽罗文',
            'my': '缅甸文',
            'km': '高棉文',
            'lo': '老挝文',
            'ka': '格鲁吉亚文',
            'hy': '亚美尼亚文',
            'az': '阿塞拜疆文',
            'kk': '哈萨克文',
            'ky': '吉尔吉斯文',
            'uz': '乌兹别克文',
            'tg': '塔吉克文',
            'mn': '蒙古文',
            'bo': '藏文',
            'ug': '维吾尔文'
          };
          return <Tag color="blue">{langMap[text] || text || 'Unknown'}</Tag>;
        },
      },
    {
      title: '访问时间',
      dataIndex: 'comeTime',
      key: 'comeTime',
      width: 160,
      render: (text: string) => moment(text).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: '最后一次离开时间',
      dataIndex: 'leaveTime',
      key: 'leaveTime',
      width: 160,
      render: (text: string) => text ? moment(text).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: '停留时长',
      dataIndex: 'stayTime',
      key: 'stayTime',
      width: 100,
      render: (time: number) => `${Math.round(time)}s`,
    },
    {
      title: '访问次数',
      dataIndex: 'visitNum',
      key: 'visitNum',
      width: 100,
      render: (num: number) => <Tag color="processing">{num}</Tag>,
    },
    {
      title: '下载次数',
      dataIndex: 'downNum',
      key: 'downNum',
      width: 100,
      render: (num: number) => <Tag color={num > 0 ? "success" : "default"}>{num}</Tag>,
    },
    {
      title: '设备信息',
      dataIndex: 'deviceType',
      key: 'deviceType',
      width: 200,
      ellipsis: true,
    },
    {
      title: '屏幕分辨率',
      dataIndex: 'screenResolution',
      key: 'screenResolution',
      width: 120,
    },
    {
      title: '时区',
      dataIndex: 'timezone',
      key: 'timezone',
      width: 100,
    },
    {
      title: '管理员',
      dataIndex: 'manager',
      key: 'manager',
      width: 100,
    },
  ];

  const handleTimeRangeChange = (dates: any) => {
    if (dates && dates.length === 2) {
      setSearchConditions(prev => ({
        ...prev,
        timeRange: dates,
        comeTimeStart: new Date(dates[0]).getTime().toString(),
        comeTimeEnd: new Date(dates[1]).getTime().toString(),
      }));
    } else {
      setSearchConditions(prev => ({
        ...prev,
        timeRange: null,
        comeTimeStart: '',
        comeTimeEnd: '',
      }));
    }
  };

  const handleChangePage = (pagination: TablePaginationConfig) => {
    setSearchConditions(prev => ({
      ...prev,
      page: pagination.current || 1,
      pageSize: pagination.pageSize || 20,
    }));
  };

  // 获取统计数据
  const getStatsData = async () => {
    try {
      const result = await getStatsRequest({id: sessionStorage.getItem('id')});
      if (result.code === 200) {
        setStatsData(result.data);
      }
    } catch (error) {
      console.error('获取统计数据失败:', error);
    }
  };

  // 搜索用户数据
  const searchUsers = async () => {
    setLoading(true);
    getStatsData();
    try {
      const params = new URLSearchParams({
        page: searchConditions.page.toString(),
        pageSize: searchConditions.pageSize.toString(),
        ...Object.fromEntries(
          Object.entries(searchConditions)
            .filter(([key, value]) => key !== 'page' && key !== 'pageSize' && value !== '')
        ),
      });

      const result = await getDataRequest(params);
      
      if (result.code === 200) {
        const users = result.data.list.map((item: UserData, index: number) => ({
          ...item,
          index: index + 1 + (searchConditions.page - 1) * searchConditions.pageSize,
        }));
        
        setList(users);
        setTotal(result.data.pagination.totalCount);
      }
    } catch (error) {
      console.error('搜索用户失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 重置搜索条件
  const resetSearch = useCallback(() => {
    // 设置标记，表示这是一次重置操作
    resetAndSearchRef.current = true;
    
    setSearchConditions({
      uuid: '',
      platform: '',
      originUrl: '',
      ip: '',
      address: '',
      lang: '',
      comeTimeStart: '',
      comeTimeEnd: '',
      visitNumMin: '',
      downNumMin: '',
      page: 1,
      pageSize: 20,
      timeRange: null,
    });
  }, []);

  // 计算表格滚动高度
  const calculateTableHeight = useCallback(() => {
    // 获取屏幕高度
    const screenHeight = window.innerHeight;
    // 预估其他元素的高度：页面边距(48) + 标题(60) + 统计卡片(120) + 搜索条件(120) + 分页(60) + 其他边距(50)
    const otherElementsHeight = 48 + 60 + 120 + 120 + 60 + 50 + 90;
    // 计算表格可用高度
    const availableHeight = screenHeight - otherElementsHeight;
    // 设置最小高度为400，最大高度为计算出的可用高度
    const tableHeight = Math.max(400, availableHeight);
    setTableScrollY(tableHeight);
  }, []);

  useEffect(() => {
    getStatsData();
    calculateTableHeight();
    
    // 监听窗口大小变化
    const handleResize = () => {
      calculateTableHeight();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateTableHeight]);

  useEffect(() => {
    searchUsers();
  }, [searchConditions.page, searchConditions.pageSize]);

  // 监听重置操作，确保状态更新完成后执行搜索
  useEffect(() => {
    if (resetAndSearchRef.current) {
      resetAndSearchRef.current = false;
      searchUsers();
    }
  }, [searchConditions]);

  return (
    <div style={{ position: 'relative', margin: 24 }}>
        {/* 统计卡片 */}
        {statsData && (
          <Row gutter={16} style={{ marginBottom: 24 }}>
            <Col span={6}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ color: '#1890ff', margin: 0 }}>今日访问用户</h3>
                  <h2 style={{ margin: '8px 0' }}>{statsData.today.visitors}</h2>
                  <p>总用户: {statsData.total.visitors}</p>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ color: '#52c41a', margin: 0 }}>今日访问次数</h3>
                  <h2 style={{ margin: '8px 0' }}>{statsData.today.visits}</h2>
                  <p>总访问: {statsData.total.visits}</p>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ color: '#fa541c', margin: 0 }}>今日下载次数</h3>
                  <h2 style={{ margin: '8px 0' }}>{statsData.today.clicks}</h2>
                  <p>总下载: {statsData.total.clicks}</p>
                </div>
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ color: '#722ed1', margin: 0 }}>今日平均停留</h3>
                  <h2 style={{ margin: '8px 0' }}>{statsData.today.avgStayTime}s</h2>
                  <p>总平均: {statsData.total.avgStayTime}s</p>
                </div>
              </Card>
            </Col>
          </Row>
        )}

        {/* 搜索条件 */}
        <Card style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col span={6}>
              <Input
                placeholder="搜索UUID"
                value={searchConditions.uuid}
                onChange={(e) => setSearchConditions(prev => ({ ...prev, uuid: e.target.value }))}
              />
            </Col>
            <Col span={4}>
              <Select
                placeholder="选择平台"
                value={searchConditions.platform || undefined}
                onChange={(value) => setSearchConditions(prev => ({ ...prev, platform: value || '' }))}
                style={{ width: '100%' }}
                allowClear
              >
                <Option value="Windows">Windows</Option>
                <Option value="macOS">macOS</Option>
                <Option value="iOS">iOS</Option>
                <Option value="Android">Android</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Input
                placeholder="来源URL(如果查询直接访问输入direct)"
                value={searchConditions.originUrl}
                onChange={(e) => setSearchConditions(prev => ({ ...prev, originUrl: e.target.value }))}
              />
            </Col>
            <Col span={4}>
                <Select
                  placeholder="语言"
                  value={searchConditions.lang || undefined}
                  onChange={(value) => setSearchConditions(prev => ({ ...prev, lang: value || '' }))}
                  style={{ width: '100%' }}
                  allowClear
                  showSearch
                  filterOption={(input, option) =>
                    (option?.children as unknown as string)?.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {/* 主要语言 */}
                  <Option value="zh">中文</Option>
                  <Option value="zh-CN">简体中文</Option>
                  <Option value="zh-TW">繁体中文</Option>
                  <Option value="en">英文</Option>
                  <Option value="en-US">美式英语</Option>
                  <Option value="en-GB">英式英语</Option>
                  <Option value="ru">俄文</Option>
                  <Option value="ja">日文</Option>
                  <Option value="ko">韩文</Option>
                  <Option value="fr">法文</Option>
                  <Option value="de">德文</Option>
                  <Option value="es">西班牙文</Option>
                  <Option value="pt">葡萄牙文</Option>
                  <Option value="it">意大利文</Option>
                  <Option value="ar">阿拉伯文</Option>
                  <Option value="hi">印地文</Option>
                  <Option value="th">泰文</Option>
                  <Option value="vi">越南文</Option>
                  <Option value="tr">土耳其文</Option>
                  
                  {/* 欧洲语言 */}
                  <Option value="pl">波兰文</Option>
                  <Option value="nl">荷兰文</Option>
                  <Option value="sv">瑞典文</Option>
                  <Option value="da">丹麦文</Option>
                  <Option value="no">挪威文</Option>
                  <Option value="fi">芬兰文</Option>
                  <Option value="cs">捷克文</Option>
                  <Option value="hu">匈牙利文</Option>
                  <Option value="ro">罗马尼亚文</Option>
                  <Option value="bg">保加利亚文</Option>
                  <Option value="hr">克罗地亚文</Option>
                  <Option value="sk">斯洛伐克文</Option>
                  <Option value="sl">斯洛文尼亚文</Option>
                  <Option value="et">爱沙尼亚文</Option>
                  <Option value="lv">拉脱维亚文</Option>
                  <Option value="lt">立陶宛文</Option>
                  
                  {/* 中东和南亚语言 */}
                  <Option value="he">希伯来文</Option>
                  <Option value="fa">波斯文</Option>
                  <Option value="ur">乌尔都文</Option>
                  <Option value="bn">孟加拉文</Option>
                  <Option value="ta">泰米尔文</Option>
                  <Option value="te">泰卢固文</Option>
                  <Option value="ml">马拉雅拉姆文</Option>
                  <Option value="kn">卡纳达文</Option>
                  <Option value="gu">古吉拉特文</Option>
                  <Option value="pa">旁遮普文</Option>
                  <Option value="mr">马拉地文</Option>
                  <Option value="ne">尼泊尔文</Option>
                  <Option value="si">僧伽罗文</Option>
                  
                  {/* 东南亚语言 */}
                  <Option value="my">缅甸文</Option>
                  <Option value="km">高棉文</Option>
                  <Option value="lo">老挝文</Option>
                  
                  {/* 高加索和中亚语言 */}
                  <Option value="ka">格鲁吉亚文</Option>
                  <Option value="hy">亚美尼亚文</Option>
                  <Option value="az">阿塞拜疆文</Option>
                  <Option value="kk">哈萨克文</Option>
                  <Option value="ky">吉尔吉斯文</Option>
                  <Option value="uz">乌兹别克文</Option>
                  <Option value="tg">塔吉克文</Option>
                  <Option value="mn">蒙古文</Option>
                  
                  {/* 中国少数民族语言 */}
                  <Option value="bo">藏文</Option>
                  <Option value="ug">维吾尔文</Option>
                </Select>
              </Col>
          </Row>
          <Row gutter={16} style={{ marginTop: 16 }}>
            <Col span={6}>
            <RangePicker
              format='YYYY-MM-DD HH:mm:ss'
              showTime={{
                hideDisabledOptions: true,
              }}
              value={searchConditions.timeRange}
              onChange={handleTimeRangeChange}
              placeholder={['访问开始时间', '访问结束时间']}
              style={{ width: '100%' }}
            />
            </Col>
            <Col span={4}>
              <Input
                placeholder="最小访问次数"
                type="number"
                value={searchConditions.visitNumMin}
                onChange={(e) => setSearchConditions(prev => ({ ...prev, visitNumMin: e.target.value }))}
              />
            </Col>
            <Col span={4}>
              <Input
                placeholder="最小下载次数"
                type="number"
                value={searchConditions.downNumMin}
                onChange={(e) => setSearchConditions(prev => ({ ...prev, downNumMin: e.target.value }))}
              />
            </Col>
            <Col span={4}> 
                <Select placeholder='管理员' value={searchConditions.manager || undefined} onChange={(value) => setSearchConditions(prev => ({ ...prev, manager: value || '' }))} style={{ width: '100%' }} allowClear>
                  <Select.Option value='true'>是</Select.Option>
                  <Select.Option value='false'>否</Select.Option>
                </Select>
            </Col>
            <Col span={6}>
              <Button type="primary" onClick={searchUsers} style={{ marginRight: 12 }}>搜索</Button>
              <Button onClick={resetSearch}>重置</Button>
            </Col>
          </Row>
        </Card>

        <Table
          bordered
          sticky
          columns={columns}
          dataSource={list}
          loading={loading}
          pagination={{
          pageSize: searchConditions.pageSize,
          total,
          current: searchConditions.page,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['20', '50', '100', '200', '500'],
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`,
        }}
          rowKey='id'
                  scroll={{
          x: 1800,
          y: tableScrollY,
        }}
          size='small'
          onChange={handleChangePage}
        />
    </div>
  );
};

Admin.displayName = 'Admin';

export default Admin;
