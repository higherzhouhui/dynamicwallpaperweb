import React, { useEffect, useState } from 'react';

interface PerformanceProps {
  children: React.ReactNode;
}

const Performance: React.FC<PerformanceProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 预加载关键资源
    const preloadResources = () => {
      const criticalImages = [
        '/static/image/logo.png',
        '/static/image/cover.png',
        '/favicon.ico'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // 延迟加载非关键资源
    const loadNonCriticalResources = () => {
      const nonCriticalImages = [
        '/static/image/aboutus.png',
        '/static/image/introduceCover.png'
      ];

      nonCriticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    };

    preloadResources();
    
    // 页面加载完成后加载非关键资源
    if (document.readyState === 'complete') {
      loadNonCriticalResources();
    } else {
      window.addEventListener('load', loadNonCriticalResources);
    }

    setIsLoaded(true);

    return () => {
      window.removeEventListener('load', loadNonCriticalResources);
    };
  }, []);

  // 添加性能监控
  useEffect(() => {
    if ('performance' in window) {
      // 监控页面加载性能
      window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        // 记录关键性能指标
        const metrics = {
          dns: perfData.domainLookupEnd - perfData.domainLookupStart,
          tcp: perfData.connectEnd - perfData.connectStart,
          ttfb: perfData.responseStart - perfData.requestStart,
          domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
          load: perfData.loadEventEnd - perfData.loadEventStart,
        };

        // 发送性能数据到分析服务
        console.log('Performance Metrics:', metrics);
      });
    }
  }, []);

  return <>{children}</>;
};

export default Performance; 