import styled from 'styled-components';

export const AboutContainer = styled.main`
  background: #f5f5f5;
  .cover {
    position: relative;
    width: 100%;
    height: 0;
    padding-bottom: 24%;
    .about {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      p {
        font-size: 28px;
        color: #fff;
        font-weight: bold;
        border-bottom: 3px solid #fff;
      }
    }
  }
  .introduce {
    width: 1100px;
    background: #fff;
    border-radius: 8px;
    margin: 24px auto;
    padding: 32px;
    position: relative;
    @media screen and (max-width: 1100px) {
      width: 100%;
    }
    .title {
      font-size: 23px;
      font-weight: bold;
      margin: 12px 0;
      width: fit-content;
      border-bottom: 2px solid;
    }
    .item {
      font-size: 19px;
      line-height: 36px;
      text-indent: 2em;
      margin-bottom: 18px;
    }
  }
  .link {
    color: blue;
    text-decoration: underline;
    margin-left: 6px;
  }
`;
