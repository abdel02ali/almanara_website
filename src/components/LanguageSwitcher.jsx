import { useTranslation } from 'react-i18next'
import './LanguageSwitcher.css'

const languages = [
  { code: 'fr', label: 'FR', flag: '🇫🇷' },
  { code: 'ar', label: 'AR', flag: '🇲🇦' },
  { code: 'en', label: 'EN', flag: '🇬🇧' }
]

function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const currentLang = i18n.language?.substring(0, 2) || 'fr'

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="lang-switcher">
      {languages.map(lang => (
        <button
          key={lang.code}
          className={`lang-btn ${currentLang === lang.code ? 'active' : ''}`}
          onClick={() => changeLanguage(lang.code)}
          aria-label={`Switch to ${lang.label}`}
          title={lang.label}
        >
          <span className="lang-code">{lang.label}</span>
        </button>
      ))}
    </div>
  )
}

export default LanguageSwitcher
