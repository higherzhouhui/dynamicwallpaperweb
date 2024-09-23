import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 1);
  z-index: 999;
  background: #1d1d1d;
  max-width: 100vw;
  .content {
    width: 1100px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 8px;
    .left {
      display: flex;
      align-items: center;
      .logoCon {
        display: flex;
        align-items: center;
        width: 450px;
        span {
          font-size: 1.2rem;
          font-weight: bold;
          color: #fff;
        }
      }
      .logoWrapper {
        position: relative;
        width: 3rem;
        height: 3rem;
        margin-right: 4px;
      }
      .titles {
        margin-left: 60px;
        display: flex;
        .title {
          margin-right: 58px;
          font-size: 1.3rem;
          cursor: pointer;
          color: #fff;
          font-weight: bold;
          border-bottom: 2px solid transparent;
          &:hover {
            color: #3cef3b;
            border-bottom: 2px solid #3cef3b;
          }
        }
        .title:last-child {
          margin-right: 0;
        }
        .active {
          color: #3cef3b;
          border-bottom: 2px solid #3cef3b;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
    }
    @media (max-width: 768px) {
      width: 100%;
      .logoCon {
        width: fit-content !important;
        span {
          display: none;
        }
      }
      .titles {
        margin-left: 8px !important;
        .title {
          margin-right: 8px !important;
        }
      }
    }
  }
`;

export const LangShowCompent = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  .imgWrapper {
    position: relative;
    width: 26px;
    height: 20px;
  }
  .lang {
    margin-left: 6px;
    font-size: 1rem;
    color: #fff;
  }
`;
