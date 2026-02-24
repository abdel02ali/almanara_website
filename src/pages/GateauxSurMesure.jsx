import { memo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCustomCakeTypes, useProcessSteps } from '../hooks/useCustomCakes'
import { usePageTitle } from '../hooks/usePageTitle'
import './GateauxSurMesure.css'

function GateauxSurMesure() {
  const { t } = useTranslation()
  usePageTitle('pageTitles.custom')
  const { cakeTypes, loading: typesLoading } = useCustomCakeTypes()
  const { steps, loading: stepsLoading } = useProcessSteps()

  return (
    <div className="gateaux-page">
      <header className="gateaux-hero">
        <div className="gateaux-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1920&h=1080&fit=crop" 
            alt="Gâteau de mariage" 
          />
          <div className="gateaux-hero-overlay"></div>
        </div>
        <div className="container gateaux-hero-content">
          <span className="section-subtitle">{t('custom.heroSubtitle')}</span>
          <h1>{t('custom.heroTitle1')}<br /><span className="text-gold">{t('custom.heroTitle2')}</span></h1>
          <p>{t('custom.heroDesc')}</p>
          <Link to="/gateaux/devis" className="btn btn-gold btn-lg">
            {t('custom.requestQuote')}
          </Link>
        </div>
      </header>

      {/* Cake Types */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('custom.specialtiesSubtitle')}</span>
            <h2>{t('custom.specialtiesTitle')}</h2>
          </div>

          {typesLoading ? (
            <div className="loading-placeholder">{t('custom.loading')}</div>
          ) : (
            <div className="cake-types-grid">
              {cakeTypes.map(type => (
                <Link 
                  key={type.id}
                  to={`/gateaux/${type.slug || type.id}`}
                  className="cake-type-card"
                >
                  <div className="cake-type-image">
                    <img src={type.image} alt={type.title} loading="lazy" />
                  </div>
                  <div className="cake-type-content">
                    <h3>{type.title}</h3>
                    <p>{type.description}</p>
                    <div className="cake-type-footer">
                      <span className="price-from">{t('custom.priceFrom')} {type.price_from} DH{type.price_unit ? ` ${type.price_unit}` : ''}</span>
                      <span className="discover-link">
                        {t('custom.discoverLink')}
                        <svg viewBox="0 0 24 24" width="18" height="18">
                          <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="section process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('custom.processSubtitle')}</span>
            <h2>{t('custom.processTitle')}</h2>
          </div>

          {stepsLoading ? (
            <div className="loading-placeholder">{t('custom.loading')}</div>
          ) : (
            <div className="process-grid">
              {steps.map(item => (
                <div key={item.id || item.step_number} className="process-card">
                  <div className="process-number">{item.step_number}</div>
                  <span className="process-icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('custom.testimonialsSubtitle')}</span>
            <h2>{t('custom.testimonialsTitle')}</h2>
          </div>

          <div className="testimonials-grid">
            <blockquote className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p>"{t('custom.testimonial1')}"</p>
              <footer>
                <strong>{t('custom.testimonial1Author')}</strong>
                <span>{t('custom.testimonial1Event')}</span>
              </footer>
            </blockquote>

            <blockquote className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p>"{t('custom.testimonial2')}"</p>
              <footer>
                <strong>{t('custom.testimonial2Author')}</strong>
                <span>{t('custom.testimonial2Event')}</span>
              </footer>
            </blockquote>

            <blockquote className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p>"{t('custom.testimonial3')}"</p>
              <footer>
                <strong>{t('custom.testimonial3Author')}</strong>
                <span>{t('custom.testimonial3Event')}</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>{t('custom.ctaTitle1')}<br />{t('custom.ctaTitle2')}</h2>
            <p>{t('custom.ctaDesc')}</p>
            <div className="cta-buttons">
              <Link to="/gateaux/devis" className="btn btn-gold btn-lg">
                {t('custom.requestQuote')}
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">
                {t('custom.contactUs')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default memo(GateauxSurMesure)
