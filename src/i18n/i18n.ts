import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    //call namespace
    translation: {
      'all categories': 'All categories'
    }
  },
  vi: {
    translation: {
      'all categories': 'Tất cả danh mục'
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  }
})
