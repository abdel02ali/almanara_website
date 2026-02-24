import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCategories } from '../hooks/useProducts'
import { useCustomCakeTypes } from '../hooks/useCustomCakes'
import LanguageSwitcher from './LanguageSwitcher'
import './Navbar.css'

function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const { categories } = useCategories()
  const { cakeTypes } = useCustomCakeTypes()

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

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

  const handleDropdownToggle = (name, e) => {
    // On mobile, toggle dropdown on click instead of navigating
    if (window.innerWidth <= 1024) {
      e.preventDefault()
      setActiveDropdown(activeDropdown === name ? null : name)
    }
  }

  const closeAll = () => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeAll}>
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
          <NavLink to="/" className="nav-link" onClick={closeAll}>
            {t('nav.home')}
          </NavLink>

          <div 
            className={`nav-dropdown ${activeDropdown === 'boutique' ? 'is-open' : ''}`}
            onMouseEnter={() => { if (window.innerWidth > 1024) setActiveDropdown('boutique') }}
            onMouseLeave={() => { if (window.innerWidth > 1024) setActiveDropdown(null) }}
          >
            <NavLink 
              to="/boutique" 
              className="nav-link"
              onClick={(e) => handleDropdownToggle('boutique', e)}
            >
              {t('nav.shop')}
              <svg className="dropdown-arrow" viewBox="0 0 24 24" width="16" height="16">
                <path fill="currentColor" d="M7 10l5 5 5-5z"/>
              </svg>
            </NavLink>
            {activeDropdown === 'boutique' && (
              <div className="dropdown-menu">
                <Link 
                  to="/boutique" 
                  className="dropdown-link dropdown-link-all"
                  onClick={closeAll}
                >
                  {t('shop.all')}
                </Link>
                {boutiqueLinks.map(link => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className="dropdown-link"
                    onClick={closeAll}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div 
            className={`nav-dropdown ${activeDropdown === 'gateaux' ? 'is-open' : ''}`}
            onMouseEnter={() => { if (window.innerWidth > 1024) setActiveDropdown('gateaux') }}
            onMouseLeave={() => { if (window.innerWidth > 1024) setActiveDropdown(null) }}
          >
            <NavLink 
              to="/gateaux-sur-mesure" 
              className="nav-link"
              onClick={(e) => handleDropdownToggle('gateaux', e)}
            >
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
                    onClick={closeAll}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <NavLink to="/blog" className="nav-link" onClick={closeAll}>
            {t('nav.news')}
          </NavLink>

          <NavLink to="/contact" className="nav-link" onClick={closeAll}>
            {t('nav.contact')}
          </NavLink>

          <LanguageSwitcher />
        </nav>

        <div className="navbar-actions">
          <LanguageSwitcher />

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
