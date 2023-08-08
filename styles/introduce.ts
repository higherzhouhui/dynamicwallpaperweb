import styled from 'styled-components';

export const IntroduceContainer = styled.main`
  background: #f8f8f8;
  padding-bottom: 12px;
  .cover {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 27%;
    .downWrapper {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      transform: translate(-400px, 50px);
      z-index: 9;
      width: fit-content;
      height: fit-content;
      .support {
        display: flex;
        .left {
          margin-right: 60px;
          text-align: center;
          color: #000;
          background: rgba(118, 12, 219, 0.8);
          color: #fff;
          padding: 6px 12px;
          border-radius: 18px;
          p {
            font-size: 13px;
          }
        }
        .left:last-child {
          background: rgba(36, 119, 26, 0.8);
          margin-right: 0;
        }
      }
    }
  }
  .swiperWrapper {
    width: 1100px;
    margin: 0 auto;
    position: relative;
    display: flex;
    justify-content: space-between;
    .mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(2px);
      background: rgba(0, 0, 0, 0.2);
    }
    .handle {
      cursor: pointer;
      background-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      z-index: 9;
      img {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #ccc;
        &:hover {
          background-color: #fff;
        }
      }
    }
    .pre {
      left: 5%;
    }
    .next {
      right: 5%;
    }
  }
  .mySwiper {
    position: relative;
    display: inline-block;
  }

  .content {
    width: 1100px;
    margin: 24px auto;
    padding: 8px 12px;
    background: #fff;
    border-radius: 8px;
    .title {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      line-height: 36px;
      margin: 18px 0;
    }
    .listItem {
      list-style: inside;
      font-size: 16px;
      line-height: 28px;
      margin: 12px 0;
      width: fit-content;
      border-bottom: 1px solid #999;
      color: #666;
      &:hover {
        background: #f5f5f5;
        color: #000;
      }
    }
  }
`;

export const IntroduceSwiper = styled.div`
  width: 100%;
  height: 100%;
  img {
    z-index: 8;
  }
`;
