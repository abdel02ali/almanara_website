import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import './CartSidebar.css'

const formatPrice = (price) => (Number.parseFloat(price) || 0).toFixed(2)

function CartSidebar({ isOpen, onClose }) {
  const { t } = useTranslation()
  const { items, removeItem, updateQuantity, total, itemCount } = useCart()

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'is-open' : ''}`} onClick={onClose} />
      <aside className={`cart-sidebar ${isOpen ? 'is-open' : ''}`}>
        <div className="cart-header">
          <h2>{t('cart.yourCart')}</h2>
          <span className="cart-count">{itemCount} {itemCount > 1 ? t('cart.articles') : t('cart.article')}</span>
          <button className="cart-close" onClick={onClose} aria-label={t('cart.close')}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">🧺</span>
            <p>{t('cart.emptyCart')}</p>
            <p className="cart-empty-text">{t('cart.emptyCartDesc')}</p>
            <Link to="/boutique" className="btn btn-primary" onClick={onClose}>
              {t('cart.viewShop')}
            </Link>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">{formatPrice(item.price)} DH</p>
                    <div className="cart-item-quantity">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        aria-label={t('cart.decrease')}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label={t('cart.increase')}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    className="cart-item-remove"
                    onClick={() => removeItem(item.id)}
                    aria-label={t('cart.remove')}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path fill="currentColor" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-subtotal">
                <span>{t('cart.subtotal')}</span>
                <span className="cart-total-price">{total.toFixed(2)} DH</span>
              </div>
              <p className="cart-shipping">{t('cart.shippingCalc')}</p>
              <Link 
                to="/panier" 
                className="btn btn-secondary btn-block"
                onClick={onClose}
              >
                {t('cart.viewCart')}
              </Link>
              <Link 
                to="/commande/validation" 
                className="btn btn-primary btn-block"
                onClick={onClose}
              >
                {t('cart.order')}
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

export default CartSidebar
