import {useSize} from 'ahooks';
import {useRouter} from 'next/router';
import {memo, useEffect, useRef} from 'react';

import {LayoutListContentContainer} from './styles';
type dot = {
  x: number;
  y: number;
  xa: number;
  ya: number;
  color: string;
  radius: number;
};
export const ListLayout = memo(({children}) => {
  const router = useRouter();
  const layOutRef = useRef<any>();
  const size = useSize(layOutRef);
  useEffect(() => {
    if (router.pathname === '/admin') {
      return;
    }
    function getRandomNumber(min: number, max: number) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomColor() {
      const a = Math.random() * 0.8 + 0.1;
      const r = 155;
      const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
        Math.random() * 255
      }, ${a})`;
      return color;
    }

    const canvas = document.getElementById('canvasId') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const dots: dot[] = [];
    const getTotal = () => {
      let total = 300;

      if (!size) {
        return total;
      }
      if (size?.height > 1500) {
        total = 400;
      } else if (size.height > 3000) {
        total = 800;
      } else if (size.height > 6000) {
        total = 1100;
      }
      return total;
    };
    for (let i = 0; i < getTotal(); i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const xa = 0;
      const ya = Math.random() * 2 - 1;
      dots.push({
        x,
        y,
        xa,
        ya: ya / 2,
        color: getRandomColor(),
        radius: getRandomNumber(1, 10),
      });
    }
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        dot.y += dot.ya;
        dot.xa *= dot.x > canvas.width || dot.x < 0 ? -1 : 1;
        dot.ya *= dot.y > canvas.height || dot.y < 0 ? -1 : 1;

        ctx.fillStyle = dot.color;

        ctx.beginPath();
        ctx.arc(dot.x - 0.5, dot.y - 0.5, dot.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });

      window.requestAnimationFrame(animate);
    };
    animate();
  }, [size]);
  return (
    <LayoutListContentContainer ref={layOutRef}>
      <canvas className='canvas' id='canvasId' />
      <div className='children'>{children}</div>
    </LayoutListContentContainer>
  );
});

ListLayout.displayName = 'ListLayout';
