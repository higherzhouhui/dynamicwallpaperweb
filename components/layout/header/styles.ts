import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 60px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  z-index: 999;
  background: #fff;
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
      .logoWrapper {
        position: relative;
        width: 400px;
        height: 60px;
      }
      .titles {
        margin-left: 60px;
        display: flex;
        .title {
          margin-right: 58px;
          font-size: 18px;
          cursor: pointer;
          color: #000;
          font-weight: bold;
          border-bottom: 2px solid transparent;
          &:hover {
            color: #ef443b;
            border-bottom: 2px solid #ef443b;
          }
        }
        .title:last-child {
          margin-right: 0;
        }
        .active {
          color: #ef443b;
          border-bottom: 2px solid #ef443b;
        }
      }
    }
    .right {
      display: flex;
      align-items: center;
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
    font-size: 15px;
  }
`;
