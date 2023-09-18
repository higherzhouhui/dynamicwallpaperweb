import styled from 'styled-components';

export const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-top: 60px;
  background: #f5f5f5;
`;
export const LayoutMainContentContainer = styled.div`
  position: relative;
`;

export const LayoutListContentContainer = styled.div`
  width: 100%;
  .canvas {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;
