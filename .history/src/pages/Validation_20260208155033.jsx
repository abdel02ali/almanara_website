import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useCreateOrder } from '../hooks/useOrders'
import './Validation.css'

function Validation() {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()
  const { createOrder, loading: orderLoading } = useCreateOrder()
  
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: '',
    lastName: '',
    phone: '',
    deliveryMethod: 'pickup',
    address: '',
    city: '',
    postalCode: '',
    pickupDate: '',
    pickupTime: '',
    notes: '',
    paymentMethod: 'card'
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Submit order to API
      const result = await createOrder(formData, items)
      if (result.success) {
        clearCart()
        navigate(`/commande/confirmation/${result.orderNumber}`)
      }
    }
  }

  const deliveryCost = formData.deliveryMethod === 'delivery' && total < 30 ? 4.90 : 0
  const finalTotal = total + deliveryCost

  if (items.length === 0) {
    return (
      <div className="validation-page">
        <div className="empty-cart">
          <h1>Votre panier est vide</h1>
          <Link to="/boutique" className="btn btn-primary">
            Voir la boutique
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="validation-page">
      <div className="container">
        <div className="checkout-steps">
          <div className={`checkout-step ${step >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Coordonnées</span>
          </div>
          <div className={`checkout-step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Livraison</span>
          </div>
          <div className={`checkout-step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Paiement</span>
          </div>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="form-section animate-fade-in">
                <h2>Vos Coordonnées</h2>
                
                {!isAuthenticated && (
                  <div className="login-notice">
                    <p>Vous avez déjà un compte ?</p>
                    <Link to="/connexion">Se connecter</Link>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Prénom *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Nom *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
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
                  <div className="form-group">
                    <label className="form-label">Téléphone *</label>
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
            )}

            {step === 2 && (
              <div className="form-section animate-fade-in">
                <h2>Mode de Livraison</h2>

                <div className="delivery-options">
                  <label className={`delivery-option ${formData.deliveryMethod === 'pickup' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="pickup"
                      checked={formData.deliveryMethod === 'pickup'}
                      onChange={handleChange}
                    />
                    <div className="delivery-option-content">
                      <span className="delivery-icon">◉</span>
                      <div>
                        <strong>Retrait en boutique</strong>
                        <span>Gratuit - Ksar Sghir Centre, Fahs Anjra</span>
                      </div>
                      <span className="delivery-price">Gratuit</span>
                    </div>
                  </label>

                  <label className={`delivery-option ${formData.deliveryMethod === 'delivery' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="delivery"
                      checked={formData.deliveryMethod === 'delivery'}
                      onChange={handleChange}
                    />
                    <div className="delivery-option-content">
                      <span className="delivery-icon">◎</span>
                      <div>
                        <strong>Livraison à domicile</strong>
                        <span>Paris et proche banlieue</span>
                      </div>
                      <span className="delivery-price">
                        {total >= 30 ? 'Gratuit' : '4,90 €'}
                      </span>
                    </div>
                  </label>
                </div>

                {formData.deliveryMethod === 'pickup' && (
                  <div className="pickup-options">
                    <h3>Choisir un créneau</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Date *</label>
                        <input
                          type="date"
                          name="pickupDate"
                          value={formData.pickupDate}
                          onChange={handleChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Heure *</label>
                        <select
                          name="pickupTime"
                          value={formData.pickupTime}
                          onChange={handleChange}
                          className="form-input"
                          required
                        >
                          <option value="">Sélectionnez...</option>
                          <option value="09:00">09h00</option>
                          <option value="10:00">10h00</option>
                          <option value="11:00">11h00</option>
                          <option value="12:00">12h00</option>
                          <option value="14:00">14h00</option>
                          <option value="15:00">15h00</option>
                          <option value="16:00">16h00</option>
                          <option value="17:00">17h00</option>
                          <option value="18:00">18h00</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {formData.deliveryMethod === 'delivery' && (
                  <div className="delivery-address">
                    <h3>Adresse de livraison</h3>
                    <div className="form-group">
                      <label className="form-label">Adresse *</label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Code postal *</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleChange}
                          className="form-input"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Ville *</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className="form-input"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">Instructions (optionnel)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Code d'accès, étage, instructions particulières..."
                    className="form-input form-textarea"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-section animate-fade-in">
                <h2>Paiement</h2>

                <div className="payment-options">
                  <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                    />
                    <span className="payment-icon">▤</span>
                    <span>Carte bancaire</span>
                  </label>

                  <label className={`payment-option ${formData.paymentMethod === 'pickup' ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pickup"
                      checked={formData.paymentMethod === 'pickup'}
                      onChange={handleChange}
                    />
                    <span className="payment-icon">◉</span>
                    <span>Paiement au retrait</span>
                  </label>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="card-form">
                    <div className="form-group">
                      <label className="form-label">Numéro de carte</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="form-input"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Date d'expiration</label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="secure-notice">
                  <span>⊙</span>
                  <p>Paiement sécurisé par cryptage SSL</p>
                </div>
              </div>
            )}

            <div className="checkout-actions">
              {step > 1 && (
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setStep(step - 1)}
                >
                  ← Retour
                </button>
              )}
              <button type="submit" className="btn btn-gold" disabled={orderLoading}>
                {orderLoading ? 'Traitement...' : step === 3 ? `Payer ${finalTotal.toFixed(2)} €` : 'Continuer →'}
              </button>
            </div>
          </form>

          <aside className="order-summary">
            <h3>Votre commande</h3>
            
            <div className="summary-items">
              {items.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-image">
                    <img src={item.image} alt={item.name} />
                    <span className="summary-item-qty">{item.quantity}</span>
                  </div>
                  <div className="summary-item-info">
                    <span className="summary-item-name">{item.name}</span>
                    <span className="summary-item-price">
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>Sous-total</span>
                <span>{total.toFixed(2)} €</span>
              </div>
              <div className="summary-row">
                <span>Livraison</span>
                <span>{deliveryCost === 0 ? 'Gratuit' : `${deliveryCost.toFixed(2)} €`}</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>{finalTotal.toFixed(2)} €</span>
              </div>
            </div>

            <Link to="/panier" className="edit-cart">
              Modifier le panier
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Validation
