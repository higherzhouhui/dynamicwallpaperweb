import styled from 'styled-components';

export const FooterContainer = styled.footer`
  .main {
    width: 100%;
    position: relative;
    height: 0;
    overflow: hidden;
    padding-bottom: 30%;
    @media screen and (min-width: 1440px) {
      padding-bottom: 27%;
    }
    @media screen and (max-width: 1100px) {
      padding-bottom: 80%;
      .content {
        width: 100%;
      }
    }
  }
  .content {
    width: 1100px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    margin: 30px 0;
    .logoWrapper {
      position: relative;
      width: 400px;
      height: 60px;
    }
  }
  .desContent {
    display: flex;
    justify-content: space-between;
    margin: 12px 0;
    align-items: center;
    .left {
      width: 850px;
      .list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        row-gap: 10px;
        @media screen and (min-width: 1440px) {
          row-gap: 28px;
        }
        .link {
          color: #ddd;
          font-size: 0.9rem;
          background: rgba(0, 0, 0, 0.6);
          width: fit-content;
          padding: 6px 12px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          img {
            margin-right: 4px;
          }
          &:hover {
            color: #fff;
            background: rgba(0, 0, 0, 0.8);
          }
        }
      }
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: center;
      .downBtn {
        transition: all 0.2s;
        font-weight: bold;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
  }
  .comeIn {
    .title {
      display: flex;
      align-items: center;
      background: rgba(0, 0, 0, 0.6);
      width: fit-content;
      padding: 6px 12px;
      border-radius: 12px;
      margin: 8px 0;
      @media screen and (min-width: 1440px) {
        margin: 18px 0;
      }
    }
    .text {
      font-size: 1rem;
      color: #fff;
      font-weight: bold;
    }
    .hzImg {
      width: 32px;
      height: 32px;
      position: relative;
      margin-right: 6px;
    }
    .comeList {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .item {
        color: #eee;
        font-size: 0.9rem;
        background: rgba(0, 0, 0, 0.7);
        width: fit-content;
        padding: 6px 12px;
        border-radius: 8px;
        word-break: break-all;
        &:hover {
          color: #fff;
          background: rgba(0, 0, 0, 0.8);
        }
      }
    }
  }
  .copyright {
    width: 100%;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 0.9rem;
    line-height: 38px;
    display: flex;
    justify-content: center;
    a {
      color: #fff;
      font-size: 0.9rem;
      &:hover {
        color: #8d93e1;
      }
    }
    span {
      margin: 0 3px;
    }
  }
` as any;
