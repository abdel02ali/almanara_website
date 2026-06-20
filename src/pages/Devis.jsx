import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useSubmitDevis } from '../hooks/useOrders'
import './Devis.css'

function Devis() {
  const { t } = useTranslation()
  const { submitDevis, loading, error } = useSubmitDevis()
  const [formData, setFormData] = useState({
    eventType: '',
    eventDate: '',
    guests: '',
    budget: '',
    flavors: [],
    description: '',
    name: '',
    email: '',
    phone: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [referenceNumber, setReferenceNumber] = useState('')

  const flavorOptions = [
    'Vanille', 'Chocolat', 'Fraise', 'Citron', 'Caramel',
    'Fruits rouges', 'Praliné', 'Pistache', 'Café', 'Rose & Litchi'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFlavorToggle = (flavor) => {
    setFormData(prev => ({
      ...prev,
      flavors: prev.flavors.includes(flavor)
        ? prev.flavors.filter(f => f !== flavor)
        : [...prev.flavors, flavor]
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const devisData = {
      firstName: formData.name.split(' ')[0] || '',
      lastName: formData.name.split(' ').slice(1).join(' ') || '',
      email: formData.email,
      phone: formData.phone,
      eventType: formData.eventType,
      eventDate: formData.eventDate,
      guestCount: formData.guests,
      budget: formData.budget,
      description: `Parfums: ${formData.flavors.join(', ')}\n\n${formData.description}`
    }

    const result = await submitDevis(devisData)
    if (result.success) {
      setReferenceNumber(result.referenceNumber)
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="devis-page">
        <div className="devis-success">
          <span className="success-icon">✓</span>
          <h1>{t('devis.successTitle')}</h1>
          <p>{t('devis.successDesc')}</p>
          {referenceNumber && (
            <p className="reference-number">
              {t('devis.reference')} : <strong>{referenceNumber}</strong>
            </p>
          )}
          <div className="success-actions">
            <Link to="/" className="btn btn-primary">
              {t('devis.backHome')}
            </Link>
            <Link to="/boutique" className="btn btn-secondary">
              {t('devis.viewShop')}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="devis-page">
      <header className="page-header">
        <div className="container">
          <h1>{t('devis.title')}</h1>
          <p>{t('devis.desc')}</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="devis-layout">
            <form className="devis-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h2>{t('devis.eventSection')}</h2>
                
                <div className="form-group">
                  <label className="form-label">{t('devis.eventType')} *</label>
                  <select 
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">{t('devis.selectOption')}</option>
                    <option value="anniversaire">{t('devis.birthday')}</option>
                    <option value="mariage">{t('devis.wedding')}</option>
                    <option value="bapteme">{t('devis.baptism')}</option>
                    <option value="entreprise">{t('devis.corporate')}</option>
                    <option value="autre">{t('devis.other')}</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t('devis.eventDate')} *</label>
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
                    <label className="form-label">{t('devis.guestCount')} *</label>
                    <input 
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      placeholder={t('devis.guestPlaceholder')}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('devis.budget')}</label>
                  <select 
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">{t('devis.selectOption')}</option>
                    <option value="50-100">50 DH - 100 DH</option>
                    <option value="100-200">100 DH - 200 DH</option>
                    <option value="200-400">200 DH - 400 DH</option>
                    <option value="400+">Plus de 400 DH</option>
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h2>{t('devis.preferencesSection')}</h2>

                <div className="form-group">
                  <label className="form-label">{t('devis.flavors')}</label>
                  <div className="flavor-grid">
                    {flavorOptions.map(flavor => (
                      <button
                        key={flavor}
                        type="button"
                        className={`flavor-btn ${formData.flavors.includes(flavor) ? 'selected' : ''}`}
                        onClick={() => handleFlavorToggle(flavor)}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('devis.projectDesc')} *</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder={t('devis.projectPlaceholder')}
                    className="form-input form-textarea"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>{t('devis.contactSection')}</h2>

                <div className="form-group">
                  <label className="form-label">{t('devis.fullName')} *</label>
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
                    <label className="form-label">{t('devis.email')} *</label>
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
                    <label className="form-label">{t('devis.phone')} *</label>
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

              <button type="submit" className="btn btn-gold btn-lg submit-btn" disabled={loading}>
                {loading ? t('devis.sending') : t('devis.submit')}
              </button>
              {error && (
                <p className="form-error" role="alert">
                  {t('devis.submitError', "Impossible d'envoyer votre demande pour le moment. Veuillez reessayer.")}
                </p>
              )}
            </form>

            <aside className="devis-sidebar">
              <div className="sidebar-card">
                <h3>{t('devis.whyUs')}</h3>
                <ul className="benefits-list">
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>{t('devis.benefit1')}</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>{t('devis.benefit2')}</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>{t('devis.benefit3')}</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>{t('devis.benefit4')}</span>
                  </li>
                </ul>
              </div>

              <div className="sidebar-card contact-card">
                <h3>{t('devis.question')}</h3>
                <p>{t('devis.teamAvailable')}</p>
                <a href="tel:0706095907" className="contact-phone">
                  📞 {t('contact.phone')}
                </a>
                <span className="contact-hours">{t('footer.everyday')}</span>
              </div>

              <div className="sidebar-card">
                <h3>{t('devis.delays')}</h3>
                <ul className="delay-list">
                  <li>{t('devis.delayBirthday')}</li>
                  <li>{t('devis.delayWedding')}</li>
                  <li>{t('devis.delayCorporate')}</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Devis
