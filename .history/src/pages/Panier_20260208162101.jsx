import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import './Panier.css'

function Panier() {
  const { t } = useTranslation()
  const { items, removeItem, updateQuantity, total, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="panier-page">
        <div className="empty-cart">
          <span className="empty-icon">🛒</span>
          <h1>{t('cart.emptyCart')}</h1>
          <p>{t('cart.emptyCartAction')}</p>
          <Link to="/boutique" className="btn btn-primary btn-lg">
            {t('cart.discoverProducts')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="panier-page">
      <header className="page-header">
        <div className="container">
          <h1>{t('cart.myCart')}</h1>
          <p>{items.length} {items.length > 1 ? t('cart.articles') : t('cart.article')} {t('cart.inYourCart')}</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="panier-layout">
            <div className="panier-items">
              <div className="panier-header">
                <span>{t('cart.product')}</span>
                <span>{t('cart.price')}</span>
                <span>{t('cart.quantity')}</span>
                <span>{t('cart.total')}</span>
                <span></span>
              </div>

              {items.map(item => (
                <div key={item.id} className="panier-item">
                  <div className="panier-product">
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.description?.slice(0, 60)}...</p>
                    </div>
                  </div>
                  <div className="panier-price">
                    {item.price.toFixed(2)} €
                  </div>
                  <div className="panier-quantity">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <div className="panier-total">
                    {(item.price * item.quantity).toFixed(2)} €
                  </div>
                  <button 
                    className="panier-remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={t('cart.remove')}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                  </button>
                </div>
              ))}

              <div className="panier-actions">
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={clearCart}
                >
                  {t('cart.clearCart')}
                </button>
                <Link to="/boutique" className="continue-shopping">
                  {t('cart.continueShopping')}
                </Link>
              </div>
            </div>

            <aside className="panier-summary">
              <h2>{t('cart.summary')}</h2>
              
              <div className="summary-row">
                <span>{t('cart.subtotal')}</span>
                <span>{total.toFixed(2)} €</span>
              </div>
              
              <div className="summary-row">
                <span>{t('cart.deliveryLabel')}</span>
                <span className="delivery-info">
                  {total >= 30 ? (
                    <span className="free-delivery">{t('cart.free')}</span>
                  ) : (
                    t('cart.calculatedNext')
                  )}
                </span>
              </div>

              {total < 30 && (
                <div className="free-delivery-notice">
                  <p>
                    {t('cart.freeDeliveryNotice', { amount: (30 - total).toFixed(2) })}
                  </p>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${(total / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="summary-total">
                <span>{t('cart.estimatedTotal')}</span>
                <span className="total-price">{total.toFixed(2)} €</span>
              </div>

              <Link to="/commande/validation" className="btn btn-gold btn-lg btn-block">
                {t('cart.checkout')}
              </Link>

              <div className="payment-methods">
                <p>{t('cart.securePayment')}</p>
                <div className="payment-icons">
                  <span>▤</span>
                  <span>▥</span>
                  <span>📱</span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Panier
