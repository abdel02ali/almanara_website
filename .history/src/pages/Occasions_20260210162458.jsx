import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Occasions.css'

const galleryItems = [
  {
    image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=500&q=75&auto=format&fit=crop',
    titleKey: 'mariages.gallery1Title',
    descKey: 'mariages.gallery1Desc'
  },
  {
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=500&q=75&auto=format&fit=crop',
    titleKey: 'mariages.gallery2Title',
    descKey: 'mariages.gallery2Desc'
  },
  {
    image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=500&q=75&auto=format&fit=crop',
    titleKey: 'mariages.gallery3Title',
    descKey: 'mariages.gallery3Desc'
  },
  {
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=500&q=75&auto=format&fit=crop',
    titleKey: 'mariages.gallery4Title',
    descKey: 'mariages.gallery4Desc'
  },
  {
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=75&auto=format&fit=crop',
    titleKey: 'mariages.gallery5Title',
    descKey: 'mariages.gallery5Desc'
  },
  {
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=75&auto=format&fit=crop',
    titleKey: 'mariages.gallery6Title',
    descKey: 'mariages.gallery6Desc'
  }
]

function Mariages() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    weddingStyle: '',
    eventDate: '',
    guests: '',
    cakeStyle: '',
    flavors: '',
    description: '',
    name: '',
    email: '',
    phone: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const services = [
    { icon: '🎂', titleKey: 'mariages.svcCake', descKey: 'mariages.svcCakeDesc' },
    { icon: '🗼', titleKey: 'mariages.svcPieceMontee', descKey: 'mariages.svcPieceMonteeDesc' },
    { icon: '🍬', titleKey: 'mariages.svcCandyBar', descKey: 'mariages.svcCandyBarDesc' },
    { icon: '🍰', titleKey: 'mariages.svcSweetTable', descKey: 'mariages.svcSweetTableDesc' },
    { icon: '🧁', titleKey: 'mariages.svcMignardises', descKey: 'mariages.svcMignardisesDesc' },
    { icon: '🎁', titleKey: 'mariages.svcFavors', descKey: 'mariages.svcFavorsDesc' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Wedding form:', formData)
    setSubmitted(true)
  }

  return (
    <div className="occasions-page">
      {/* Hero */}
      <header className="occasions-hero">
        <div className="occasions-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=1280&q=75&auto=format&fit=crop"
            alt={t('mariages.heroAlt')}
            width="1280"
            height="720"
            fetchPriority="high"
          />
          <div className="occasions-hero-overlay"></div>
        </div>
        <div className="container occasions-hero-content">
          <span className="section-subtitle">{t('mariages.heroSubtitle')}</span>
          <h1>{t('mariages.heroTitle1')}<br /><span className="text-rose">{t('mariages.heroTitle2')}</span></h1>
          <p>{t('mariages.heroDesc')}</p>
          <a href="#mariages-devis" className="btn btn-gold btn-lg">
            {t('mariages.heroCta')}
          </a>
        </div>
      </header>

      {/* Wedding Services */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('mariages.servicesSubtitle')}</span>
            <h2>{t('mariages.servicesTitle')}</h2>
            <p>{t('mariages.servicesDesc')}</p>
          </div>

          <div className="event-types-grid">
            {services.map((svc, i) => (
              <div key={i} className="event-type-card">
                <span className="event-type-icon">{svc.icon}</span>
                <h3>{t(svc.titleKey)}</h3>
                <p>{t(svc.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section occasions-gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('mariages.gallerySubtitle')}</span>
            <h2>{t('mariages.galleryTitle')}</h2>
            <p>{t('mariages.galleryDesc')}</p>
          </div>

          <div className="occasions-gallery-grid">
            {galleryItems.map((item, i) => (
              <div key={i} className="occasions-gallery-item">
                <img src={item.image} alt={t(item.titleKey)} loading="lazy" />
                <div className="occasions-gallery-overlay">
                  <h3>{t(item.titleKey)}</h3>
                  <p>{t(item.descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section className="section" id="mariages-devis">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('mariages.formSubtitle')}</span>
            <h2>{t('mariages.formTitle')}</h2>
            <p>{t('mariages.formDesc')}</p>
          </div>

          {submitted ? (
            <div className="occasions-success">
              <span className="success-icon">✓</span>
              <h2>{t('mariages.successTitle')}</h2>
              <p>{t('mariages.successDesc')}</p>
              <Link to="/" className="btn btn-primary">{t('mariages.backHome')}</Link>
            </div>
          ) : (
            <div className="occasions-form-layout">
              <form className="occasions-form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3>{t('mariages.formWeddingSection')}</h3>

                  <div className="form-group">
                    <label className="form-label">{t('mariages.formWeddingStyle')} *</label>
                    <select
                      name="weddingStyle"
                      value={formData.weddingStyle}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">{t('mariages.formSelect')}</option>
                      <option value="traditionnel">{t('mariages.styleTraditional')}</option>
                      <option value="moderne">{t('mariages.styleModern')}</option>
                      <option value="boheme">{t('mariages.styleBoheme')}</option>
                      <option value="luxe">{t('mariages.styleLuxury')}</option>
                      <option value="intime">{t('mariages.styleIntimate')}</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">{t('mariages.formDate')} *</label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('mariages.formGuests')} *</label>
                      <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        placeholder="100"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('mariages.formCakeStyle')}</label>
                    <select
                      name="cakeStyle"
                      value={formData.cakeStyle}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">{t('mariages.formSelect')}</option>
                      <option value="wedding-cake">{t('mariages.cakeWeddingCake')}</option>
                      <option value="piece-montee">{t('mariages.cakePieceMontee')}</option>
                      <option value="naked-cake">{t('mariages.cakeNaked')}</option>
                      <option value="candy-bar">{t('mariages.cakeCandyBar')}</option>
                      <option value="assortiment">{t('mariages.cakeAssortment')}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('mariages.formFlavors')}</label>
                    <input
                      type="text"
                      name="flavors"
                      value={formData.flavors}
                      onChange={handleChange}
                      placeholder={t('mariages.formFlavorsPlaceholder')}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('mariages.formDescription')} *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder={t('mariages.formDescPlaceholder')}
                      className="form-input form-textarea"
                      rows="4"
                      required
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>{t('mariages.formContactSection')}</h3>

                  <div className="form-group">
                    <label className="form-label">{t('mariages.formName')} *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">{t('mariages.formEmail')} *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('mariages.formPhone')} *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-gold btn-lg submit-btn">
                  {t('mariages.formSubmit')}
                </button>
              </form>

              <aside className="occasions-sidebar">
                <div className="sidebar-card">
                  <h3>{t('mariages.sidebarWhyTitle')}</h3>
                  <ul className="benefits-list">
                    <li><span className="benefit-icon">✓</span><span>{t('mariages.benefit1')}</span></li>
                    <li><span className="benefit-icon">✓</span><span>{t('mariages.benefit2')}</span></li>
                    <li><span className="benefit-icon">✓</span><span>{t('mariages.benefit3')}</span></li>
                    <li><span className="benefit-icon">✓</span><span>{t('mariages.benefit4')}</span></li>
                  </ul>
                </div>
                <div className="sidebar-card contact-card">
                  <h3>{t('mariages.sidebarContactTitle')}</h3>
                  <p>{t('mariages.sidebarContactDesc')}</p>
                  <a href="tel:0706095907" className="contact-phone">0706095907</a>
                  <span className="contact-hours">{t('mariages.sidebarHours')}</span>
                </div>
                <div className="sidebar-card">
                  <h3>{t('mariages.sidebarDelayTitle')}</h3>
                  <p>{t('mariages.sidebarDelayDesc')}</p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="occasions-cta">
        <div className="container">
          <div className="cta-card">
            <h2>{t('mariages.ctaTitle')}</h2>
            <p>{t('mariages.ctaDesc')}</p>
            <div className="cta-buttons">
              <a href="#mariages-devis" className="btn btn-gold btn-lg">{t('mariages.ctaBtn1')}</a>
              <Link to="/contact" className="btn btn-secondary btn-lg">{t('mariages.ctaBtn2')}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default memo(Mariages)
