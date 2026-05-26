import { useState, memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { usePageTitle } from '../hooks/usePageTitle'
import { submitContactMessage } from '../services/api'
import './Contact.css'

function Contact() {
  const { t } = useTranslation()
  usePageTitle('pageTitles.contact')
  const [openFaq, setOpenFaq] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(null)

  const faqItems = [
    { question: t('contact.faq1Q'), answer: t('contact.faq1A') },
    { question: t('contact.faq2Q'), answer: t('contact.faq2A') },
    { question: t('contact.faq3Q'), answer: t('contact.faq3A') },
    { question: t('contact.faq4Q'), answer: t('contact.faq4A') },
    { question: t('contact.faq5Q'), answer: t('contact.faq5A') }
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setSendError(null)
    try {
      await submitContactMessage(formData)
      setSubmitted(true)
    } catch (err) {
      console.error('Contact form error:', err)
      setSendError(t('contact.sendError', 'حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.'))
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="contact-page">
      <header className="page-header">
        <div className="container">
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.desc')}</p>
        </div>
      </header>

      {/* Contact Info */}
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="info-card">
                <div className="info-header">
                  <span className="info-icon">📍</span>
                  <h3>{t('contact.ourShop')}</h3>
                </div>
                <address>
                  <strong>{t('contact.shopName')}</strong><br />
                  {t('contact.address')}<br />
                  {t('contact.city')}
                </address>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="map-link"
                  data-static-link="true"
                >
                  {t('contact.viewOnMap')}
                </a>
              </div>

              <div className="info-card">
                <div className="info-header">
                  <span className="info-icon">🕐</span>
                  <h3>{t('contact.hours')}</h3>
                </div>
                <div className="hours-list">
                  <div className="hours-row">
                    <span>{t('contact.everyday')}</span>
                    <span>{t('contact.hoursValue')}</span>
                  </div>
                  <div className="hours-row">
                    <span>{t('contact.sevenDays')}</span>
                    <span></span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-header">
                  <span className="info-icon">📞</span>
                  <h3>{t('contact.reachUs')}</h3>
                </div>
                <div className="contact-methods">
                  <a href="tel:0706095907" className="contact-method">
                    <strong>{t('contact.phoneLabel')}</strong>
                    <span>{t('contact.phone')}</span>
                  </a>
                  <a href="mailto:contact@almanarasweeties.ma" className="contact-method">
                    <strong>{t('contact.emailLabel')}</strong>
                    <span>{t('contact.email')}</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <h2>{t('contact.sendMessage')}</h2>
              
              {submitted ? (
                <div className="form-success">
                  <span className="success-icon">✅</span>
                  <h3>{t('contact.messageSent')}</h3>
                  <p>{t('contact.messageReply')}</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">{t('contact.name')} *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('contact.emailField')} *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('contact.subject')} *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">{t('common.select')}</option>
                      <option value="commande">{t('contact.subjectOrder')}</option>
                      <option value="produits">{t('contact.subjectProducts')}</option>
                      <option value="gateau">{t('contact.subjectCake')}</option>
                      <option value="recrutement">{t('contact.subjectRecruitment')}</option>
                      <option value="autre">{t('contact.subjectOther')}</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('contact.message')} *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input form-textarea"
                      rows="5"
                      required
                    />
                  </div>

                  {sendError && (
                    <div style={{
                      padding: '0.75rem 1rem',
                      background: 'rgba(231,76,60,0.15)',
                      border: '1px solid rgba(231,76,60,0.3)',
                      borderRadius: '8px',
                      color: '#e74c3c',
                      fontSize: '0.9rem',
                      marginBottom: '1rem'
                    }}>
                      {sendError}
                    </div>
                  )}

                  <button type="submit" className="btn btn-gold" disabled={sending}>
                    {sending ? t('contact.sending', 'جاري الإرسال...') : t('contact.send')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="map-section">
        <div className="map-placeholder">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&h=400&fit=crop" 
            alt="Carte"
            loading="lazy"
            data-static-image="true"
          />
          <div className="map-overlay">
            <span>◎</span>
            <p>Carte interactive disponible prochainement</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section faq-section" id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('contact.faqSubtitle')}</span>
            <h2>{t('contact.faqTitle')}</h2>
          </div>

          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className={`faq-item ${openFaq === index ? 'open' : ''}`}
              >
                <button 
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{item.question}</span>
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default memo(Contact)
