/**
 * 屏幕信息接口
 */
export interface ScreenInfo {
  width: number;
  height: number;
  availWidth: number;
  availHeight: number;
  colorDepth: number;
  pixelDepth: number;
  orientation: {
    type: string;
    angle: number;
  };
  devicePixelRatio: number;
  logicalPixelRatio: number;
  screenSize: string;
  deviceType: string;
}

/**
 * 获取屏幕分辨率信息
 * @returns 屏幕信息对象
 */
export const getScreenInfo = (): ScreenInfo => {
  const screen = window.screen;
  const devicePixelRatio = window.devicePixelRatio || 1;
  
  // 获取屏幕基本信息
  const width = screen.width;
  const height = screen.height;
  const availWidth = screen.availWidth;
  const availHeight = screen.availHeight;
  const colorDepth = screen.colorDepth;
  const pixelDepth = screen.pixelDepth;
  
  // 获取屏幕方向
  let orientation = {
    type: 'landscape-primary',
    angle: 0
  };
  
  try {
    if (screen.orientation) {
      orientation = {
        type: screen.orientation.type,
        angle: screen.orientation.angle
      };
    }
  } catch (error) {
    // 降级处理，通过宽高比判断方向
    orientation = {
      type: width > height ? 'landscape-primary' : 'portrait-primary',
      angle: 0
    };
  }
  
  // 计算逻辑像素比
  const logicalPixelRatio = devicePixelRatio;
  
  // 判断屏幕尺寸类型
  const screenSize = getScreenSizeType(width, height);
  
  // 判断设备类型
  const deviceType = getDeviceType(width, height, devicePixelRatio);
  
  return {
    width,
    height,
    availWidth,
    availHeight,
    colorDepth,
    pixelDepth,
    orientation,
    devicePixelRatio,
    logicalPixelRatio,
    screenSize,
    deviceType
  };
};

/**
 * 获取屏幕尺寸类型
 * @param width 屏幕宽度
 * @param height 屏幕高度
 * @returns 屏幕尺寸类型
 */
const getScreenSizeType = (width: number, height: number): string => {
  const diagonal = Math.sqrt(width * width + height * height);
  const dpi = diagonal / (Math.max(width, height) / 96); // 假设96 DPI
  
  if (diagonal < 10) {
    return 'Small Mobile'; // 小屏手机
  } else if (diagonal < 12) {
    return 'Mobile'; // 手机
  } else if (diagonal < 14) {
    return 'Large Mobile'; // 大屏手机
  } else if (diagonal < 17) {
    return 'Tablet'; // 平板
  } else if (diagonal < 24) {
    return 'Laptop'; // 笔记本
  } else if (diagonal < 32) {
    return 'Desktop'; // 桌面显示器
  } else {
    return 'Large Desktop'; // 大屏显示器
  }
};

/**
 * 获取设备类型
 * @param width 屏幕宽度
 * @param height 屏幕高度
 * @param devicePixelRatio 设备像素比
 * @returns 设备类型
 */
const getDeviceType = (width: number, height: number, devicePixelRatio: number): string => {
  const userAgent = navigator.userAgent.toLowerCase();
  const maxDimension = Math.max(width, height);
  
  // 根据用户代理和设备像素比判断
  if (userAgent.includes('mobile') || userAgent.includes('android') || userAgent.includes('iphone')) {
    if (devicePixelRatio >= 2) {
      return 'High-DPI Mobile';
    } else {
      return 'Mobile';
    }
  } else if (userAgent.includes('tablet') || userAgent.includes('ipad')) {
    return 'Tablet';
  } else {
    if (devicePixelRatio >= 2) {
      return 'High-DPI Desktop';
    } else {
      return 'Desktop';
    }
  }
};

/**
 * 获取视口信息
 * @returns 视口信息对象
 */
export const getViewportInfo = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    pageXOffset: window.pageXOffset,
    pageYOffset: window.pageYOffset
  };
};

/**
 * 监听屏幕方向变化
 * @param callback 回调函数
 * @returns 清理函数
 */
export const listenScreenOrientation = (callback: (orientation: any) => void) => {
  const handleOrientationChange = () => {
    const screenInfo = getScreenInfo();
    callback(screenInfo.orientation);
  };
  
  // 监听屏幕方向变化
  window.addEventListener('orientationchange', handleOrientationChange);
  
  // 监听窗口大小变化（可能影响屏幕方向）
  window.addEventListener('resize', handleOrientationChange);
  
  return () => {
    window.removeEventListener('orientationchange', handleOrientationChange);
    window.removeEventListener('resize', handleOrientationChange);
  };
};

/**
 * 监听窗口大小变化
 * @param callback 回调函数
 * @returns 清理函数
 */
export const listenWindowResize = (callback: (viewport: any) => void) => {
  const handleResize = () => {
    const viewport = getViewportInfo();
    callback(viewport);
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
};

/**
 * 格式化屏幕信息显示
 * @param screenInfo 屏幕信息
 * @returns 格式化的字符串
 */
export const formatScreenInfo = (screenInfo: ScreenInfo): string => {
  return `${screenInfo.width}×${screenInfo.height} (${screenInfo.deviceType})`;
};

/**
 * 获取常见屏幕分辨率列表
 * @returns 常见分辨率列表
 */
export const getCommonResolutions = (): Array<{resolution: string, name: string, category: string}> => {
  return [
    // 手机分辨率
    { resolution: '360×640', name: 'Galaxy S5', category: 'Mobile' },
    { resolution: '375×667', name: 'iPhone 6/7/8', category: 'Mobile' },
    { resolution: '414×736', name: 'iPhone 6/7/8 Plus', category: 'Mobile' },
    { resolution: '375×812', name: 'iPhone X/XS', category: 'Mobile' },
    { resolution: '414×896', name: 'iPhone XR/XS Max', category: 'Mobile' },
    { resolution: '390×844', name: 'iPhone 12/13', category: 'Mobile' },
    { resolution: '428×926', name: 'iPhone 12/13 Pro Max', category: 'Mobile' },
    
    // 平板分辨率
    { resolution: '768×1024', name: 'iPad', category: 'Tablet' },
    { resolution: '834×1112', name: 'iPad Pro 10.5"', category: 'Tablet' },
    { resolution: '1024×1366', name: 'iPad Pro 12.9"', category: 'Tablet' },
    
    // 桌面分辨率
    { resolution: '1366×768', name: 'HD', category: 'Desktop' },
    { resolution: '1440×900', name: 'WXGA+', category: 'Desktop' },
    { resolution: '1536×864', name: 'HD+', category: 'Desktop' },
    { resolution: '1920×1080', name: 'Full HD', category: 'Desktop' },
    { resolution: '2560×1440', name: 'QHD', category: 'Desktop' },
    { resolution: '3840×2160', name: '4K UHD', category: 'Desktop' },
    { resolution: '5120×2880', name: '5K', category: 'Desktop' },
  ];
};

/**
 * 获取当前屏幕的完整信息
 * @returns 完整的屏幕和视口信息
 */
export const getCurrentScreenInfo = () => {
  const screenInfo = getScreenInfo();
  const viewportInfo = getViewportInfo();
  
  return {
    screen: screenInfo,
    viewport: viewportInfo,
    formatted: formatScreenInfo(screenInfo),
    timestamp: new Date().toISOString()
  };
}; 