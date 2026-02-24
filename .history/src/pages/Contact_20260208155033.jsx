import { useState } from 'react'
import './Contact.css'

const faqItems = [
  {
    question: 'Quels sont vos horaires d\'ouverture ?',
    answer: 'Nous sommes ouverts tous les jours de 6h30 à 23h00, 7j/7.'
  },
  {
    question: 'Faites-vous des livraisons ?',
    answer: 'Oui, nous livrons sur Paris et proche banlieue. Les frais de livraison sont de 4,90€, gratuits à partir de 30€ d\'achat. Les gâteaux sur mesure bénéficient de conditions de livraison spécifiques.'
  },
  {
    question: 'Peut-on commander un gâteau sur mesure ?',
    answer: 'Absolument ! Nous créons des gâteaux personnalisés pour toutes les occasions. Remplissez notre formulaire de devis et nous vous contacterons sous 48h.'
  },
  {
    question: 'Avez-vous des produits sans gluten ?',
    answer: 'Nous proposons une sélection de pâtisseries sans gluten, préparées dans un espace dédié. N\'hésitez pas à nous consulter pour connaître la disponibilité du jour.'
  },
  {
    question: 'Recrutez-vous ?',
    answer: 'Nous sommes toujours à la recherche de talents passionnés ! Envoyez votre CV et lettre de motivation à almanarabakery@almanara.site'
  }
]

function Contact() {
  const [openFaq, setOpenFaq] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Contact form:', formData)
    setSubmitted(true)
  }

  return (
    <div className="contact-page">
      <header className="page-header">
        <div className="container">
          <h1>Contact & Infos</h1>
          <p>
            Une question ? Besoin d'informations ? 
            Nous sommes là pour vous répondre.
          </p>
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
                  <h3>Notre Boutique</h3>
                </div>
                <address>
                  <strong>Manara Boulangerie</strong><br />
                  Ksar Sghir Centre<br />
                  Fahs Anjra
                </address>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="map-link"
                >
                  Voir sur Google Maps →
                </a>
              </div>

              <div className="info-card">
                <div className="info-header">
                  <span className="info-icon">🕐</span>
                  <h3>Horaires</h3>
                </div>
                <div className="hours-list">
                  <div className="hours-row">
                    <span>Tous les jours</span>
                    <span>6h30 - 23h00</span>
                  </div>
                  <div className="hours-row">
                    <span>7j/7</span>
                    <span></span>
                  </div>
                </div>
              </div>

              <div className="info-card">
                <div className="info-header">
                  <span className="info-icon">📞</span>
                  <h3>Nous joindre</h3>
                </div>
                <div className="contact-methods">
                  <a href="tel:0706095907" className="contact-method">
                    <strong>Téléphone</strong>
                    <span>07 06 09 59 07</span>
                  </a>
                  <a href="mailto:almanarabakery@almanara.site" className="contact-method">
                    <strong>Email</strong>
                    <span>almanarabakery@almanara.site</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-section">
              <h2>Envoyez-nous un message</h2>
              
              {submitted ? (
                <div className="form-success">
                  <span className="success-icon">✅</span>
                  <h3>Message envoyé !</h3>
                  <p>Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Nom *</label>
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
                      <label className="form-label">Email *</label>
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
                    <label className="form-label">Sujet *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Sélectionnez...</option>
                      <option value="commande">Question sur une commande</option>
                      <option value="produits">Information produits</option>
                      <option value="gateau">Gâteau sur mesure</option>
                      <option value="recrutement">Recrutement</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input form-textarea"
                      rows="5"
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-gold">
                    Envoyer le message
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
            <span className="section-subtitle">Besoin d'aide ?</span>
            <h2>Questions Fréquentes</h2>
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

      {/* Recruitment */}
      <section className="recruitment-section">
        <div className="container">
          <div className="recruitment-card">
            <div className="recruitment-content">
              <span className="section-subtitle">Rejoignez-nous</span>
              <h2>Recrutement</h2>
              <p>
                Vous êtes passionné(e) par la boulangerie et la pâtisserie ? 
                Rejoignez notre équipe d'artisans !
              </p>
              <ul className="positions-list">
                <li>Boulanger(ère) H/F</li>
                <li>Pâtissier(ère) H/F</li>
                <li>Vendeur(se) conseil H/F</li>
              </ul>
              <a href="mailto:almanarabakery@almanara.site" className="btn btn-gold">
                Envoyer ma candidature
              </a>
            </div>
            <div className="recruitment-image">
              <img 
                src="https://images.unsplash.com/photo-1556217477-d325251ece38?w=500&h=400&fit=crop" 
                alt="Notre équipe" 
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
