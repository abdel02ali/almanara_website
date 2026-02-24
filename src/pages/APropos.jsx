import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './APropos.css'

function APropos() {
  const { t } = useTranslation()

  const values = [
    { icon: '🌾', title: t('about.val1Title'), description: t('about.val1Desc') },
    { icon: '🏠', title: t('about.val2Title'), description: t('about.val2Desc') },
    { icon: '👨‍👩‍👧‍👦', title: t('about.val3Title'), description: t('about.val3Desc') },
    { icon: '◈', title: t('about.val4Title'), description: t('about.val4Desc') }
  ]
  return (
    <div className="apropos-page">
      {/* Hero */}
      <header className="apropos-hero">
        <div className="apropos-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1556217477-d325251ece38?w=1920&h=800&fit=crop" 
            alt="Notre boulangerie" 
          />
          <div className="apropos-hero-overlay"></div>
        </div>
        <div className="container apropos-hero-content">
          <span className="section-subtitle">{t('about.since')}</span>
          <h1>{t('about.title')}</h1>
          <p>{t('about.heroDesc')}</p>
        </div>
      </header>

      {/* Story */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <span className="section-subtitle">{t('about.journeySubtitle')}</span>
              <h2>{t('about.journeyTitle')}</h2>
              <p>{t('about.journeyP1')}</p>
              <p>{t('about.journeyP2')}</p>
              <p>{t('about.journeyP3')}</p>
            </div>
            <div className="story-images">
              <img 
                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=500&h=600&fit=crop" 
                alt="Pain artisanal" 
                className="story-img-1"
              />
              <img 
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop" 
                alt="Nos créations" 
                className="story-img-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('about.valuesSubtitle')}</span>
            <h2>{t('about.valuesTitle')}</h2>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <span className="value-icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="apropos-cta">
        <div className="container">
          <h2>{t('about.ctaTitle')}</h2>
          <p>{t('about.ctaDesc')}</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-gold btn-lg">
              {t('about.findUs')}
            </Link>
            <Link to="/boutique" className="btn btn-secondary btn-lg">
              {t('about.discoverProducts')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default APropos
