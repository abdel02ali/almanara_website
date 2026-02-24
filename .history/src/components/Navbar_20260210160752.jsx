import { useState, useEffect, useCallback } from 'react'
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

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
    setActiveDropdown(null)
  }, [])

  const closeAll = useCallback(() => {
    setIsMenuOpen(false)
    setActiveDropdown(null)
  }, [])

  return (
    <>
      {/* ===== TOP BAR (always visible) ===== */}
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

          {/* Desktop navigation — hidden on mobile via CSS */}
          <nav className="desktop-nav">
            <NavLink to="/" className="nav-link">
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
                  <Link to="/boutique" className="dropdown-link dropdown-link-all" onClick={() => setActiveDropdown(null)}>
                    {t('shop.all')}
                  </Link>
                {boutiqueLinks.map(link => (
                    <Link key={link.path} to={link.path} className="dropdown-link" onClick={() => setActiveDropdown(null)}>
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
                    <Link key={link.path} to={link.path} className="dropdown-link" onClick={() => setActiveDropdown(null)}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

            <NavLink to="/mariages" className="nav-link">
              {t('nav.weddings')}
            </NavLink>

            <NavLink to="/blog" className="nav-link">
              {t('nav.news')}
          </NavLink>

            <NavLink to="/contact" className="nav-link">
              {t('nav.contact')}
          </NavLink>
        </nav>

          {/* Right side actions */}
        <div className="navbar-actions">
            <div className="desktop-lang">
              <LanguageSwitcher />
            </div>
          <button 
              type="button"
            className="mobile-menu-btn"
              onClick={toggleMenu}
            aria-label="Menu"
          >
              {isMenuOpen ? (
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path fill="white" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="28" height="28">
                  <path fill="white" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
              )}
          </button>
        </div>
      </div>
    </header>

      {/* ===== MOBILE MENU (renders only when open) ===== */}
      {isMenuOpen && (
        <div 
          className="mobile-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 900,
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
          onClick={closeAll}
        >
          <div 
            style={{
              position: 'fixed',
              top: 64,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 901,
              backgroundColor: '#0D0D0D',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <NavLink to="/" className="mob-link" onClick={closeAll}>
              {t('nav.home')}
            </NavLink>

            <button type="button" className="mob-link" onClick={(e) => { e.preventDefault(); setActiveDropdown(prev => prev === 'boutique' ? null : 'boutique') }}>
              <span>{t('nav.shop')}</span>
              <span style={{ marginLeft: 'auto', transform: activeDropdown === 'boutique' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
            </button>
            {activeDropdown === 'boutique' && (
              <div className="mob-submenu">
                <Link to="/boutique" className="mob-sublink" onClick={closeAll}>{t('shop.all')}</Link>
                {boutiqueLinks.map(link => (
                  <Link key={link.path} to={link.path} className="mob-sublink" onClick={closeAll}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <button type="button" className="mob-link" onClick={(e) => { e.preventDefault(); setActiveDropdown(prev => prev === 'gateaux' ? null : 'gateaux') }}>
              <span>{t('nav.custom')}</span>
              <span style={{ marginLeft: 'auto', transform: activeDropdown === 'gateaux' ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▾</span>
            </button>
            {activeDropdown === 'gateaux' && (
              <div className="mob-submenu">
                {gateauxLinks.map(link => (
                  <Link key={link.path} to={link.path} className="mob-sublink" onClick={closeAll}>
                    {link.label}
                  </Link>
                ))}
              </div>
            )}

            <NavLink to="/mariages" className="mob-link" onClick={closeAll}>
              {t('nav.weddings')}
            </NavLink>

            <NavLink to="/blog" className="mob-link" onClick={closeAll}>
              {t('nav.news')}
            </NavLink>

            <NavLink to="/contact" className="mob-link" onClick={closeAll}>
              {t('nav.contact')}
            </NavLink>

            <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
