import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useCategories } from '../hooks/useProducts'
import { useCustomCakeTypes } from '../hooks/useCustomCakes'
import LanguageSwitcher from './LanguageSwitcher'
import './Navbar.css'

function Navbar({ onCartClick }) {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const { itemCount } = useCart()
  const { isAuthenticated } = useAuth()
  const { categories } = useCategories()
  const { cakeTypes } = useCustomCakeTypes()

  const boutiqueLinks = categories.map(cat => ({
    path: `/boutique/${cat.slug || cat.id}`,
    label: cat.name
  }))

  const gateauxLinks = [
    ...cakeTypes.map(type => ({
      path: `/gateaux/${type.slug || type.id}`,
      label: type.title
    })),
    { path: '/gateaux/devis', label: t('nav.requestQuote') }
  ]

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
              <path d="M12 2C8.5 2 5.5 4.5 4 8c-1.5 3.5-1 7 1 9.5S9.5 21 12 21s5.5-1 7-3.5 2.5-6 1-9.5C18.5 4.5 15.5 2 12 2zm0 2c2.5 0 4.5 1.5 5.5 4 .8 2 .8 4-.2 5.5-.8 1.5-2.3 2.5-4.3 2.5h-2c-2 0-3.5-1-4.3-2.5-1-1.5-1-3.5-.2-5.5C7.5 5.5 9.5 4 12 4z"/>
            </svg>
          </span>
          <div className="logo-text">
            <span className="logo-name">Al Manara</span>
            <span className="logo-tagline">Boulangerie & Pâtisserie</span>
          </div>
        </Link>

        <nav className={`navbar-nav ${isMenuOpen ? 'is-open' : ''}`}>
          <NavLink to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            {t('nav.home')}
          </NavLink>

          <div 
            className="nav-dropdown"
            onMouseEnter={() => setActiveDropdown('boutique')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <NavLink to="/boutique" className="nav-link">
              {t('nav.shop')}
              <svg className="dropdown-arrow" viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M7 10l5 5 5-5z"/>
              </svg>
            </NavLink>
            {activeDropdown === 'boutique' && (
              <div className="dropdown-menu">
                {boutiqueLinks.map(link => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className="dropdown-link"
                    onClick={() => setActiveDropdown(null)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div 
            className="nav-dropdown"
            onMouseEnter={() => setActiveDropdown('gateaux')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <NavLink to="/gateaux-sur-mesure" className="nav-link">
              {t('nav.custom')}
              <svg className="dropdown-arrow" viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M7 10l5 5 5-5z"/>
              </svg>
            </NavLink>
            {activeDropdown === 'gateaux' && (
              <div className="dropdown-menu">
                {gateauxLinks.map(link => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className="dropdown-link"
                    onClick={() => setActiveDropdown(null)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            {t('nav.news')}
          </NavLink>

          <NavLink to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>
            {t('nav.contact')}
          </NavLink>

          <LanguageSwitcher />
        </nav>

        <div className="navbar-actions">
          <LanguageSwitcher />
          
          <Link 
            to={isAuthenticated ? '/mon-compte' : '/connexion'} 
            className="action-btn"
            aria-label={t('nav.myAccount')}
          >
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </Link>

          <button 
            className="action-btn cart-btn" 
            onClick={onCartClick}
            aria-label={t('nav.cart')}
          >
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path fill="currentColor" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount}</span>
            )}
          </button>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <span className={`hamburger ${isMenuOpen ? 'is-active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
