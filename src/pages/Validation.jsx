import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useCreateOrder } from '../hooks/useOrders'
import './Validation.css'

const getLineTotal = (item) => (Number.parseFloat(item.price) || 0) * item.quantity

function Validation() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()
  const { isAuthenticated, user } = useAuth()
  const { createOrder, loading: orderLoading } = useCreateOrder()
  
  const [step, setStep] = useState(1)
  const [submitError, setSubmitError] = useState('')
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
    setSubmitError('')
    if (step < 3) {
      setStep(step + 1)
    } else {
      const result = await createOrder(formData, items)
      if (result.success) {
        clearCart()
        navigate(`/commande/confirmation/${result.orderNumber}`)
      } else {
        setSubmitError(t('checkout.submitError', 'Impossible d’enregistrer votre commande. Veuillez réessayer sans vider votre panier.'))
      }
    }
  }

  const deliveryCost = formData.deliveryMethod === 'delivery' && total < 30 ? 4.90 : 0
  const finalTotal = total + deliveryCost

  if (items.length === 0) {
    return (
      <div className="validation-page">
        <div className="empty-cart">
          <h1>{t('checkout.emptyCart')}</h1>
          <Link to="/boutique" className="btn btn-primary">
            {t('checkout.viewShop')}
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
            <span className="step-label">{t('checkout.stepContact')}</span>
          </div>
          <div className={`checkout-step ${step >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">{t('checkout.stepDelivery')}</span>
          </div>
          <div className={`checkout-step ${step >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">{t('checkout.stepPayment')}</span>
          </div>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="form-section animate-fade-in">
                <h2>{t('checkout.yourDetails')}</h2>
                
                {!isAuthenticated && (
                  <div className="login-notice">
                    <p>{t('checkout.alreadyAccount')}</p>
                    <Link to="/connexion">{t('checkout.signIn')}</Link>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">{t('checkout.firstName')} *</label>
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
                    <label className="form-label">{t('checkout.lastName')} *</label>
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
                    <label className="form-label">{t('checkout.email')} *</label>
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
                    <label className="form-label">{t('checkout.phone')} *</label>
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
                <h2>{t('checkout.deliveryMode')}</h2>

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
                        <strong>{t('checkout.storePickup')}</strong>
                        <span>{t('checkout.storePickupDesc')}</span>
                      </div>
                      <span className="delivery-price">{t('checkout.free')}</span>
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
                        <strong>{t('checkout.homeDelivery')}</strong>
                        <span>{t('checkout.homeDeliveryDesc')}</span>
                      </div>
                      <span className="delivery-price">
                        {total >= 30 ? t('checkout.free') : '4,90 DH'}
                      </span>
                    </div>
                  </label>
                </div>

                {formData.deliveryMethod === 'pickup' && (
                  <div className="pickup-options">
                    <h3>{t('checkout.chooseSlot')}</h3>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">{t('checkout.date')} *</label>
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
                        <label className="form-label">{t('checkout.time')} *</label>
                        <select
                          name="pickupTime"
                          value={formData.pickupTime}
                          onChange={handleChange}
                          className="form-input"
                          required
                        >
                          <option value="">{t('common.select')}</option>
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
                    <h3>{t('checkout.deliveryAddress')}</h3>
                    <div className="form-group">
                      <label className="form-label">{t('checkout.address')} *</label>
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
                        <label className="form-label">{t('checkout.postalCode')} *</label>
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
                        <label className="form-label">{t('checkout.city')} *</label>
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
                  <label className="form-label">{t('checkout.instructions')}</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder={t('checkout.instructionsPlaceholder')}
                    className="form-input form-textarea"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-section animate-fade-in">
                <h2>{t('checkout.payment')}</h2>

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
                    <span>{t('checkout.cardPayment')}</span>
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
                    <span>{t('checkout.pickupPayment')}</span>
                  </label>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="card-form">
                    <div className="form-group">
                      <label className="form-label">{t('checkout.cardNumber')}</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="form-input"
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">{t('checkout.expiryDate')}</label>
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
                  <p>{t('checkout.securePayment')}</p>
                </div>
              </div>
            )}

            {submitError && (
              <p className="form-error" role="alert">
                {submitError}
              </p>
            )}

            <div className="checkout-actions">
              {step > 1 && (
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setStep(step - 1)}
                >
                  {t('checkout.back')}
                </button>
              )}
              <button type="submit" className="btn btn-gold" disabled={orderLoading}>
                {orderLoading ? t('checkout.processing') : step === 3 ? `${t('checkout.pay')} ${finalTotal.toFixed(2)} DH` : t('checkout.continue')}
              </button>
            </div>
          </form>

          <aside className="order-summary">
            <h3>{t('checkout.yourOrder')}</h3>
            
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
                      {getLineTotal(item).toFixed(2)} DH
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row">
                <span>{t('checkout.subtotal')}</span>
                <span>{total.toFixed(2)} DH</span>
              </div>
              <div className="summary-row">
                <span>{t('checkout.delivery')}</span>
                <span>{deliveryCost === 0 ? t('checkout.free') : `${deliveryCost.toFixed(2)} DH`}</span>
              </div>
              <div className="summary-row total">
                <span>{t('checkout.total')}</span>
                <span>{finalTotal.toFixed(2)} DH</span>
              </div>
            </div>

            <Link to="/panier" className="edit-cart">
              {t('checkout.editCart')}
            </Link>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Validation
