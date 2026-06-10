import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Confirmation.css'

function Confirmation() {
  const { t } = useTranslation()
  const { id } = useParams()

  return (
    <div className="confirmation-page">
      <div className="confirmation-container">
        <div className="confirmation-icon">
          <svg viewBox="0 0 24 24" width="80" height="80">
            <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 13l3 3 7-7"/>
          </svg>
        </div>

        <h1>{t('confirmation.thanks')}</h1>
        <p className="order-number">{t('confirmation.orderNumber')} <strong>{id}</strong></p>
        
        <div className="confirmation-message">
          <p>{t('confirmation.orderConfirmed')}</p>
        </div>

        <div className="next-steps">
          <h2>{t('confirmation.nextSteps')}</h2>
          <div className="steps-grid">
            <div className="step-card">
              <span className="step-icon">📧</span>
              <h3>{t('confirmation.confirmEmail')}</h3>
              <p>{t('confirmation.confirmEmailDesc')}</p>
            </div>
            <div className="step-card">
              <span className="step-icon">◇</span>
              <h3>{t('confirmation.preparation')}</h3>
              <p>{t('confirmation.preparationDesc')}</p>
            </div>
            <div className="step-card">
              <span className="step-icon">✅</span>
              <h3>{t('confirmation.ready')}</h3>
              <p>{t('confirmation.readyDesc')}</p>
            </div>
          </div>
        </div>

        <div className="confirmation-info">
          <div className="info-card">
            <h3>📍 {t('confirmation.pickup')}</h3>
            <address>
              <strong>{t('contact.shopName')}</strong><br />
              {t('contact.address')}<br />
              {t('contact.city')}<br />
              <a href="tel:0706095907">{t('contact.phone')}</a>
            </address>
            <p className="hours">
              <strong>{t('footer.hoursLabel')}</strong> {t('footer.everyday')}, {t('footer.sevenDays')}
            </p>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="btn btn-primary">
            {t('confirmation.backHome')}
          </Link>
          <Link to="/boutique" className="btn btn-secondary">
            {t('confirmation.continueShopping')}
          </Link>
        </div>

        <div className="share-section">
          <p>{t('confirmation.shareExperience')}</p>
          <div className="social-buttons">
            <a href="#" className="social-btn" data-static-link="true">Facebook</a>
            <a href="#" className="social-btn" data-static-link="true">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
