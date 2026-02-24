import { useParams, Link } from 'react-router-dom'
import './Confirmation.css'

function Confirmation() {
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

        <h1>Merci pour votre commande !</h1>
        <p className="order-number">Commande n° <strong>{id}</strong></p>
        
        <div className="confirmation-message">
          <p>
            Votre commande a bien été enregistrée. Vous recevrez un email 
            de confirmation avec tous les détails.
          </p>
        </div>

        <div className="next-steps">
          <h2>Prochaines étapes</h2>
          <div className="steps-grid">
            <div className="step-card">
              <span className="step-icon">📧</span>
              <h3>Email de confirmation</h3>
              <p>Vous allez recevoir un email avec le récapitulatif de votre commande.</p>
            </div>
            <div className="step-card">
              <span className="step-icon">◇</span>
              <h3>Préparation</h3>
              <p>Notre équipe prépare vos produits avec soin.</p>
            </div>
            <div className="step-card">
              <span className="step-icon">✅</span>
              <h3>Prêt !</h3>
              <p>Nous vous préviendrons quand votre commande sera prête.</p>
            </div>
          </div>
        </div>

        <div className="confirmation-info">
          <div className="info-card">
            <h3>📍 Retrait en boutique</h3>
            <address>
              <strong>Manara Boulangerie</strong><br />
              Ksar Sghir Centre<br />
              Fahs Anjra<br />
              <a href="tel:0706095907">07 06 09 59 07</a>
            </address>
            <p className="hours">
              <strong>Horaires :</strong> Tous les jours 6h30 - 23h00, 7j/7
            </p>
          </div>
        </div>

        <div className="confirmation-actions">
          <Link to="/" className="btn btn-primary">
            Retour à l'accueil
          </Link>
          <Link to="/boutique" className="btn btn-secondary">
            Continuer mes achats
          </Link>
        </div>

        <div className="share-section">
          <p>Partagez votre expérience avec nous !</p>
          <div className="social-buttons">
            <a href="#" className="social-btn">Facebook</a>
            <a href="#" className="social-btn">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Confirmation
