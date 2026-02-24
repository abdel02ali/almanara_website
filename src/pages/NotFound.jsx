import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '../hooks/usePageTitle'

function NotFound() {
  const { t } = useTranslation()
  usePageTitle('pageTitles.notFound')

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div>
        <span style={{
          display: 'block',
          fontSize: 'clamp(5rem, 15vw, 10rem)',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          background: 'linear-gradient(135deg, var(--color-rose-gold), var(--color-copper))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1
        }}>
          404
        </span>
        <h1 style={{
          fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
          color: 'var(--color-text-primary)',
          margin: '1rem 0 0.5rem'
        }}>
          {t('notFound.title', 'الصفحة غير موجودة')}
        </h1>
        <p style={{
          color: 'var(--color-text-secondary)',
          maxWidth: '420px',
          margin: '0 auto 2rem',
          lineHeight: 1.6
        }}>
          {t('notFound.desc', 'عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.')}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-gold btn-lg">
            {t('notFound.home', 'العودة للرئيسية')}
          </Link>
          <Link to="/boutique" className="btn btn-secondary btn-lg" style={{
            border: '1px solid var(--color-rose-gold)',
            color: 'var(--color-rose-gold)',
            background: 'transparent'
          }}>
            {t('notFound.shop', 'تصفح المتجر')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default memo(NotFound)

