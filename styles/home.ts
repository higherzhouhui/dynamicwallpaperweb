import styled from 'styled-components';

export const HomeContainer = styled.main`
  background: #f5f5f5;
  .cover {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 28%;
    .downWrapper {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      transform: translate(-400px, 120px);
      z-index: 9;
      width: fit-content;
      height: fit-content;
      text-align: center;
      border-radius: 8px;
      color: #eee;
      padding: 3px 10px;
      @media screen and (max-width: 1440px) {
        transform: translate(-300px, 80px);
      }
      .title {
        font-size: 1rem;
        margin: 0 auto 18px auto;
        font-weight: bold;
        background: rgba(0, 0, 0, 0.6);
        width: fit-content;
        padding: 5px;
        border-radius: 4px;
      }
      .slogo {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: space-between;
        div {
          font-size: 1.2rem;
          font-weight: bold;
          margin-bottom: 24px;
        }
        .color1 {
          color: #007aff;
        }
        .color2 {
          color: rgb(217, 238, 10);
        }
      }
      .svgIcon {
        transition: all 0.2s;
        &:hover {
          transform: scale(1.1);
        }
      }
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
            font-size: 0.8rem;
          }
        }
        .left:last-child {
          background: rgba(36, 119, 26, 0.8);
          margin-right: 0;
        }
      }
    }
    .downBtn {
      margin: 50px auto 0 auto;
      width: 150px;
      height: 50px;
      border-radius: 30px;
      font-size: 1.2rem;
      text-align: center;
      line-height: 50px;
      background: #ef443b;
      color: #eee;
      font-weight: bold;
      &:hover {
        transform: scale(1.05);
        color: #fff;
        background: #e91308;
      }
    }
  }
  .mainContent {
    width: 1100px;
    margin: 20px auto 0 auto;
    padding: 0 0 40px 0;
    position: relative;
    z-index: 9;
    @media (max-width: 1100px) {
      width: 100%;
    }
    .title {
      text-align: center;
      font-size: 1.8rem;
      font-weight: bold;
      line-height: 36px;
      margin: 18px 0;
      padding-bottom: 6px;
      border-bottom: 1px dotted #ccc;
    }
    .listItem {
      list-style: inside;
      font-size: 1.1rem;
      line-height: 28px;
      margin: 12px 0;
      width: fit-content;
      border-bottom: 1px solid #999;
      color: #666;
      display: flex;
      align-items: center;
      &::before {
        content: '';
        width: 6px;
        height: 6px;
        background: #333;
        border-radius: 50%;
        margin-right: 12px;
        min-width: 6px;
      }
      &:hover {
        background: #f5f5f5;
        color: #000;
      }
    }
  }
  .introduce {
    padding: 8px 12px;
    background: #fff;
    border-radius: 8px;
    .produceDesc {
      font-size: 20px;
      line-height: 34px;
      font-style: oblique;
    }
    .subTitle {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
      line-height: 30px;
      margin: 12px 0;
      color: #007aff;
      text-decoration: underline;
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
  .gongneng {
    background: #fff;
    padding: 12px;
    border-radius: 8px;
    margin-top: 18px;
    .Statistic {
      display: flex;
      justify-content: center;
    }
    .content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      @media (max-width: 1100px) {
        grid-template-columns: repeat(1, 1fr);
      }
      column-gap: 18px;
      row-gap: 18px;
      transition: all 0.5s;
      .item {
        border-radius: 8px;
        overflow: hidden;
        border: 1px solid transparent;
        background: #fff;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2);
        &:hover {
          .imgWrapper {
            transform: scale(1.05);
          }
        }
        .imgWrapper {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 64%;
          transition: all 0.5s;
          cursor: pointer;
        }
        .desc {
          width: 100%;
          padding: 18px 12px;
          font-size: 1rem;
          font-weight: 500;
          font-style: italic;
        }
      }
    }
    .lookMore {
      margin: 24px auto 0 auto;
      font-size: 1rem;
      display: flex;
      justify-content: center;
      color: #007aff;
      align-items: center;
      width: fit-content;
      padding: 6px 12px;
      border-radius: 1rem;
      cursor: pointer;
      border: 1px solid #007aff;
      .imgWrapper {
        width: 18px;
        height: 18px;
        position: relative;
        margin-left: 12px;
      }
    }
    .notAll {
      border: none;
      animation: outLine infinite 1.5s;
    }
    @keyframes outLine {
      0% {
        outline: 1px solid #007aff;
        outline-offset: 0;
      }
      100% {
        outline: 1px solid #f5f5f5;
        outline-offset: 5px;
      }
    }
  }
  .user {
    background: #fff;
    padding: 12px;
    border-radius: 8px;
    margin-top: 18px;
    .Statistic {
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: 'fangsong';
    }
  }
  .video {
    background: #fff;
    padding: 12px;
    border-radius: 8px;
    margin-top: 18px;
    text-align: center;
    video {
      width: 800px;
      @media (max-width: 1100px) {
        width: 100%;
      }
    }
  }
`;

export const SwipperItem = styled.div`
  position: relative;
  .bg {
    width: 100%;
    height: 0;
    padding-bottom: 48%;
    position: relative;
    z-index: -1;
  }
  .describe {
    background: #3b0150;
    border-radius: 18px;
    padding: 24px 12px;
    margin-top: -20px;
    z-index: 9;
    .number {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .total {
        font-size: 18px;
        color: #fff;
        margin: 0 auto;
      }
    }
    .proWrapper {
      position: relative;
      width: 100%;
      border-radius: 6px;
      margin: 24px 0;
      .showNumber {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4px 12px;
        z-index: 9;
        position: relative;
        > div {
          font-size: 22px;
          color: #fff;
          margin: 0 auto;
          height: 32px;
          line-height: 32px;
        }
      }

      .proTotal {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        z-index: 1;
      }

      .level0 {
        background: linear-gradient(to right, #0e57a0, #0d9bdb);
      }
      .level1 {
        background: linear-gradient(to right, #0b131c, #4795a7);
      }
      .level2 {
        background: linear-gradient(to right, #a8a299, #d3f6f6);
      }
      .proRemain {
        position: absolute;
        background: linear-gradient(to left, #9752ff, #7e6fff);
        right: 0;
        top: 0;
        height: 100%;
        z-index: 1;
      }
      .divide {
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        width: 28px;
        height: 75px;
        z-index: 98;
      }
    }
    .priceWrapper {
      color: #fff;
      font-size: 14px;
      .priceNumber {
        span {
          margin-right: 10px;
          font-weight: bold;
        }
      }
      .price {
        letter-spacing: 18px;
      }
    }
    .btn {
      margin-top: 24px;
      width: 100%;
      height: 48px;
      border-radius: 8px;
      text-align: center;
      line-height: 48px;
      color: #fff;
      font-size: 20px;
      background: #d158e9;
      font-weight: bold;
      letter-spacing: 6px;
    }
    .donghua {
      animation: shandong 2s infinite alternate;
    }

    @keyframes shandong {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.03);
      }
      100% {
        transform: scale(1);
      }
    }
    .disMint {
      background: #555;
      color: #eee;
    }
  }
  .hint {
    margin-top: 36px;
    .title {
      font-size: 1rem;
      font-weight: bold;
      color: #fff;
      margin-bottom: 6px;
    }
    .list {
      color: #fff;
      opacity: 0.9;
      font-size: 1rem;
      line-height: 26px;
    }
  }
`;
