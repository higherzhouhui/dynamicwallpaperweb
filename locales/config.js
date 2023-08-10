import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en';
import zh from './zh';
const resources = {
  zh: {
    translation: zh,
  },
  en: {
    translation: en,
  },
};

const getInitLng = () => {
  let lang = 'zh';
  if (typeof window !== 'undefined') {
    const localLang = localStorage.getItem('lang');
    if (localLang) {
      lang = localLang;
    } else if (!(navigator?.language || '').includes('zh')) {
      lang = 'en';
    }
    return lang;
  }
  return lang;
};

i18n.use(initReactI18next).init({
  resources,
  lng: getInitLng(),
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
