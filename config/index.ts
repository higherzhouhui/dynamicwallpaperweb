// 网站地址
let webUrl = '//localhost:7890';
// api
let apiUrl = '//192.168.2.253:7001';

if (process.env.APP_ENV === 'development') {
  webUrl = '//localhost:7890';
  apiUrl = '//192.168.2.253:7001';
}

if (process.env.APP_ENV === 'test') {
  webUrl = 'https://www.pd-1st.com';
  apiUrl = '//192.168.2.253:7001';
}

if (process.env.APP_ENV === 'production') {
  webUrl = 'https://www.pd-1st.com';
  apiUrl = '//192.168.2.253:7001';
}

const DOWNURL = 'https://mac.macsc.com/mac/92.html?id=MzI1OTY2';

export {webUrl, apiUrl, DOWNURL};
