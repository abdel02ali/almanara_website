import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './Occasions.css'

const galleryItems = [
  {
    image: 'https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=600&h=400&fit=crop',
    titleKey: 'occasions.gallery1Title',
    descKey: 'occasions.gallery1Desc'
  },
  {
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&h=400&fit=crop',
    titleKey: 'occasions.gallery2Title',
    descKey: 'occasions.gallery2Desc'
  },
  {
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop',
    titleKey: 'occasions.gallery3Title',
    descKey: 'occasions.gallery3Desc'
  },
  {
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=600&h=400&fit=crop',
    titleKey: 'occasions.gallery4Title',
    descKey: 'occasions.gallery4Desc'
  },
  {
    image: 'https://images.unsplash.com/photo-1562440499-64c9a111f713?w=600&h=400&fit=crop',
    titleKey: 'occasions.gallery5Title',
    descKey: 'occasions.gallery5Desc'
  },
  {
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop',
    titleKey: 'occasions.gallery6Title',
    descKey: 'occasions.gallery6Desc'
  }
]

function Occasions() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    occasionType: '',
    eventDate: '',
    guests: '',
    description: '',
    name: '',
    email: '',
    phone: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const eventTypes = [
    { icon: '💍', titleKey: 'occasions.wedding', descKey: 'occasions.weddingDesc' },
    { icon: '💎', titleKey: 'occasions.engagement', descKey: 'occasions.engagementDesc' },
    { icon: '🎂', titleKey: 'occasions.birthday', descKey: 'occasions.birthdayDesc' },
    { icon: '👶', titleKey: 'occasions.baptism', descKey: 'occasions.baptismDesc' },
    { icon: '🏢', titleKey: 'occasions.corporate', descKey: 'occasions.corporateDesc' },
    { icon: '🎉', titleKey: 'occasions.other', descKey: 'occasions.otherDesc' }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Occasions form:', formData)
    setSubmitted(true)
  }

  return (
    <div className="occasions-page">
      {/* Hero */}
      <header className="occasions-hero">
        <div className="occasions-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=1920&h=1080&fit=crop"
            alt={t('occasions.heroAlt')}
          />
          <div className="occasions-hero-overlay"></div>
        </div>
        <div className="container occasions-hero-content">
          <span className="section-subtitle">{t('occasions.heroSubtitle')}</span>
          <h1>{t('occasions.heroTitle1')}<br /><span className="text-rose">{t('occasions.heroTitle2')}</span></h1>
          <p>{t('occasions.heroDesc')}</p>
          <a href="#occasions-devis" className="btn btn-gold btn-lg">
            {t('occasions.heroCta')}
          </a>
        </div>
      </header>

      {/* Event Types */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('occasions.typesSubtitle')}</span>
            <h2>{t('occasions.typesTitle')}</h2>
            <p>{t('occasions.typesDesc')}</p>
          </div>

          <div className="event-types-grid">
            {eventTypes.map((evt, i) => (
              <div key={i} className="event-type-card">
                <span className="event-type-icon">{evt.icon}</span>
                <h3>{t(evt.titleKey)}</h3>
                <p>{t(evt.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section occasions-gallery-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('occasions.gallerySubtitle')}</span>
            <h2>{t('occasions.galleryTitle')}</h2>
            <p>{t('occasions.galleryDesc')}</p>
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
      <section className="section" id="occasions-devis">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('occasions.formSubtitle')}</span>
            <h2>{t('occasions.formTitle')}</h2>
            <p>{t('occasions.formDesc')}</p>
          </div>

          {submitted ? (
            <div className="occasions-success">
              <span className="success-icon">✓</span>
              <h2>{t('occasions.successTitle')}</h2>
              <p>{t('occasions.successDesc')}</p>
              <Link to="/" className="btn btn-primary">{t('occasions.backHome')}</Link>
            </div>
          ) : (
            <div className="occasions-form-layout">
              <form className="occasions-form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3>{t('occasions.formEventSection')}</h3>

                  <div className="form-group">
                    <label className="form-label">{t('occasions.formOccasionType')} *</label>
                    <select
                      name="occasionType"
                      value={formData.occasionType}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">{t('occasions.formSelect')}</option>
                      <option value="mariage">{t('occasions.wedding')}</option>
                      <option value="fiancailles">{t('occasions.engagement')}</option>
                      <option value="anniversaire">{t('occasions.birthday')}</option>
                      <option value="bapteme">{t('occasions.baptism')}</option>
                      <option value="entreprise">{t('occasions.corporate')}</option>
                      <option value="autre">{t('occasions.other')}</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">{t('occasions.formDate')} *</label>
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
                      <label className="form-label">{t('occasions.formGuests')} *</label>
                      <input
                        type="number"
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        placeholder="50"
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('occasions.formDescription')} *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder={t('occasions.formDescPlaceholder')}
                      className="form-input form-textarea"
                      rows="4"
                      required
                    />
                  </div>
                </div>

                <div className="form-section">
                  <h3>{t('occasions.formContactSection')}</h3>

                  <div className="form-group">
                    <label className="form-label">{t('occasions.formName')} *</label>
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
                      <label className="form-label">{t('occasions.formEmail')} *</label>
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
                      <label className="form-label">{t('occasions.formPhone')} *</label>
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
                  {t('occasions.formSubmit')}
                </button>
              </form>

              <aside className="occasions-sidebar">
                <div className="sidebar-card">
                  <h3>{t('occasions.sidebarWhyTitle')}</h3>
                  <ul className="benefits-list">
                    <li><span className="benefit-icon">✓</span><span>{t('occasions.benefit1')}</span></li>
                    <li><span className="benefit-icon">✓</span><span>{t('occasions.benefit2')}</span></li>
                    <li><span className="benefit-icon">✓</span><span>{t('occasions.benefit3')}</span></li>
                    <li><span className="benefit-icon">✓</span><span>{t('occasions.benefit4')}</span></li>
                  </ul>
                </div>
                <div className="sidebar-card contact-card">
                  <h3>{t('occasions.sidebarContactTitle')}</h3>
                  <p>{t('occasions.sidebarContactDesc')}</p>
                  <a href="tel:0706095907" className="contact-phone">📞 0706095907</a>
                  <span className="contact-hours">{t('occasions.sidebarHours')}</span>
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
            <h2>{t('occasions.ctaTitle')}</h2>
            <p>{t('occasions.ctaDesc')}</p>
            <div className="cta-buttons">
              <a href="#occasions-devis" className="btn btn-gold btn-lg">{t('occasions.ctaBtn1')}</a>
              <Link to="/contact" className="btn btn-secondary btn-lg">{t('occasions.ctaBtn2')}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default memo(Occasions)
