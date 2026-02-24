import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSubmitDevis } from '../hooks/useOrders'
import './Devis.css'

function Devis() {
  const { submitDevis, loading } = useSubmitDevis()
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
    
    // Format data for API
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
          <h1>Demande Envoyée !</h1>
          <p>
            Merci pour votre demande de devis. Notre équipe vous contactera 
            dans les 48h pour discuter de votre projet.
          </p>
          {referenceNumber && (
            <p className="reference-number">
              Référence : <strong>{referenceNumber}</strong>
            </p>
          )}
          <div className="success-actions">
            <Link to="/" className="btn btn-primary">
              Retour à l'accueil
            </Link>
            <Link to="/boutique" className="btn btn-secondary">
              Voir la boutique
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
          <h1>Demande de Devis</h1>
          <p>
            Décrivez-nous votre projet et recevez un devis personnalisé 
            sous 48h. Consultation gratuite et sans engagement.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="devis-layout">
            <form className="devis-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <h2>Votre Événement</h2>
                
                <div className="form-group">
                  <label className="form-label">Type d'événement *</label>
                  <select 
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="anniversaire">Anniversaire</option>
                    <option value="mariage">Mariage</option>
                    <option value="bapteme">Baptême / Communion</option>
                    <option value="entreprise">Événement d'entreprise</option>
                    <option value="autre">Autre occasion</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Date de l'événement *</label>
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
                    <label className="form-label">Nombre d'invités *</label>
                    <input 
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      placeholder="Ex: 30"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Budget approximatif</label>
                  <select 
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="form-input"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="50-100">50 € - 100 €</option>
                    <option value="100-200">100 € - 200 €</option>
                    <option value="200-400">200 € - 400 €</option>
                    <option value="400+">Plus de 400 €</option>
                  </select>
                </div>
              </div>

              <div className="form-section">
                <h2>Vos Préférences</h2>

                <div className="form-group">
                  <label className="form-label">Parfums souhaités</label>
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
                  <label className="form-label">Décrivez votre projet *</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Thème, couleurs, inspirations, allergies alimentaires..."
                    className="form-input form-textarea"
                    required
                  />
                </div>
              </div>

              <div className="form-section">
                <h2>Vos Coordonnées</h2>

                <div className="form-group">
                  <label className="form-label">Nom complet *</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Marie Dupont"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input 
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="marie@email.com"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Téléphone *</label>
                    <input 
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="06 12 34 56 78"
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-gold btn-lg submit-btn" disabled={loading}>
                {loading ? 'Envoi en cours...' : 'Envoyer ma demande'}
              </button>
            </form>

            <aside className="devis-sidebar">
              <div className="sidebar-card">
                <h3>Pourquoi Manara ?</h3>
                <ul className="benefits-list">
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Consultation gratuite</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Ingrédients premium</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Personnalisation totale</span>
                  </li>
                  <li>
                    <span className="benefit-icon">✓</span>
                    <span>Livraison soignée</span>
                  </li>
                </ul>
              </div>

              <div className="sidebar-card contact-card">
                <h3>Une question ?</h3>
                <p>Notre équipe est disponible pour vous conseiller.</p>
                <a href="tel:0706095907" className="contact-phone">
                  📞 07 06 09 59 07
                </a>
                <span className="contact-hours">Tous les jours : 6h30 - 23h00</span>
              </div>

              <div className="sidebar-card">
                <h3>Délais</h3>
                <ul className="delay-list">
                  <li><strong>Anniversaires :</strong> 7 jours min.</li>
                  <li><strong>Mariages :</strong> 3 semaines min.</li>
                  <li><strong>Corporate :</strong> 5 jours min.</li>
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
