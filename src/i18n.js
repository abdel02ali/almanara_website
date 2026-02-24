import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import fr from './locales/fr.json'
import ar from './locales/ar.json'
import en from './locales/en.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      ar: { translation: ar },
      en: { translation: en }
    },
    fallbackLng: 'ar',
    lng: localStorage.getItem('i18nextLng') || 'ar',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

// Set document direction based on language
i18n.on('languageChanged', (lng) => {
  const dir = lng?.startsWith('ar') ? 'rtl' : 'ltr'
  document.documentElement.setAttribute('dir', dir)
  document.documentElement.setAttribute('lang', lng)
})

// Set initial direction
const dir = (i18n.language || 'ar').startsWith('ar') ? 'rtl' : 'ltr'
document.documentElement.setAttribute('dir', dir)
document.documentElement.setAttribute('lang', i18n.language || 'ar')

export default i18n
