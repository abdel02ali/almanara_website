import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../context/ThemeContext'
import { useCategories } from '../hooks/useProducts'
import { useCustomCakeTypes } from '../hooks/useCustomCakes'
import './Footer.css'

function Footer() {
  const { t } = useTranslation()
  const { isRamadan } = useTheme()
  const { categories } = useCategories()
  const { cakeTypes } = useCustomCakeTypes()
  
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <span className="logo-icon">
                  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <path d="M12 2C8.5 2 5.5 4.5 4 8c-1.5 3.5-1 7 1 9.5S9.5 21 12 21s5.5-1 7-3.5 2.5-6 1-9.5C18.5 4.5 15.5 2 12 2zm0 2c2.5 0 4.5 1.5 5.5 4 .8 2 .8 4-.2 5.5-.8 1.5-2.3 2.5-4.3 2.5h-2c-2 0-3.5-1-4.3-2.5-1-1.5-1-3.5-.2-5.5C7.5 5.5 9.5 4 12 4z"/>
                  </svg>
                </span>
                <span className="logo-name">Al Manara</span>
              </Link>
              <p className="footer-description">
                {t('footer.description')}
                {isRamadan && (
                  <>
                    <br /><br />
                    <span style={{ color: 'var(--color-gold, #D4AF37)' }}>
                      رمضان مبارك - Ramadan Mubarak
                    </span>
                  </>
                )}
              </p>
              <div className="social-links">
                <a href="#" aria-label="Facebook" className="social-link">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/almanarasweeties/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Pinterest" className="social-link">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-links">
              <h4>{t('footer.shopTitle')}</h4>
              <ul>
                {categories.map(cat => (
                  <li key={cat.id}>
                    <Link to={`/boutique/${cat.slug || cat.id}`}>{cat.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-links">
              <h4>{t('footer.customTitle')}</h4>
              <ul>
                {cakeTypes.map(type => (
                  <li key={type.id}>
                    <Link to={`/gateaux/${type.slug || type.id}`}>{type.title}</Link>
                  </li>
                ))}
                <li><Link to="/gateaux/devis">{t('footer.requestQuote')}</Link></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>{t('footer.infoTitle')}</h4>
              <ul>
                <li><Link to="/occasions">{t('nav.occasions')}</Link></li>
                <li><Link to="/blog">{t('footer.news')}</Link></li>
                <li><Link to="/contact">{t('footer.contact')}</Link></li>
                <li><Link to="/contact#faq">{t('footer.faq')}</Link></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4>{t('footer.findUs')}</h4>
              <address>
                <p>
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"/>
                  </svg>
                  {t('contact.address')}<br />
                  {t('contact.city')}
                </p>
                <p>
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  {t('contact.phone')}
                </p>
                <p>
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  {t('contact.email')}
                </p>
              </address>
              <div className="opening-hours">
                <p><strong>{t('footer.hoursLabel')}</strong></p>
                <p>{t('footer.everyday')}</p>
                <p>{t('footer.sevenDays')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>{t('footer.copyright')}</p>
          <div className="footer-legal">
            <a href="#">{t('footer.legal')}</a>
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default memo(Footer)
