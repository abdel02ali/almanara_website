import { memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useFeaturedProducts, useCategories } from '../hooks/useProducts'
import { usePageTitle } from '../hooks/usePageTitle'
import './Home.css'

function Home() {
  const { t } = useTranslation()
  usePageTitle('pageTitles.home')
  const { products: featuredProducts, loading: productsLoading } = useFeaturedProducts()
  const { categories, loading: categoriesLoading } = useCategories()

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-image">
            <img 
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1280&q=75&auto=format&fit=crop"
              alt="Artisan bread"
              width="1280"
              height="800"
              fetchPriority="high"
            />
          </div>
          <div className="hero-gradient"></div>
        </div>
        
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-label">
              {t('home.heroLabel')}
            </span>
            <h1>
              {t('home.heroTitle1')}<br /><span className="text-rose">{t('home.heroTitle2')}</span>
            </h1>
            <p>
              {t('home.heroDesc')}
            </p>
            <div className="hero-actions">
              <Link to="/boutique" className="btn btn-primary btn-lg">
                {t('home.discover')}
              </Link>
              <Link to="/gateaux-sur-mesure" className="btn btn-secondary btn-lg">
                {t('home.custom')}
              </Link>
            </div>
          </div>
          
          <div className="hero-feature">
            <div className="feature-card">
              <span className="feature-number">12</span>
              <span className="feature-label">{t('home.yearsExcellence')}</span>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <span>{t('home.scroll')}</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section intro-section">
        <div className="container">
          <div className="intro-content">
            <span className="section-subtitle">{t('home.philosophySubtitle')}</span>
            <h2>
              {t('home.philosophyTitle1')}<br />
              {t('home.philosophyTitle2')}
            </h2>
            <div className="deco-line"></div>
            <p>{t('home.philosophyDesc')}</p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('home.selectionSubtitle')}</span>
            <h2>{t('home.signaturesTitle')}</h2>
            <p>{t('home.signaturesDesc')}</p>
          </div>
          
          <div className="featured-grid stagger">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <article
                key={product.slug || product.id}
                className={`product-card ${index === 0 ? 'large' : ''}`}
                data-static-image={product._fromApi ? undefined : 'true'}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                </div>
                {product.badge && (
                  <span className="product-badge">{product.badge}</span>
                )}
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <span className="price">{parseFloat(product.price).toFixed(2)} DH</span>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center" style={{ marginTop: 'var(--space-3xl)' }}>
            <Link to="/boutique" className="btn btn-ghost">
              {t('home.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="section categories-section">
        <div className="container">
          <div className="categories-header">
            <span className="section-subtitle">{t('home.exploreSubtitle')}</span>
            <h2>{t('home.universesTitle')}</h2>
          </div>
          
          <div className="categories-showcase">
            {categories.slice(0, 4).map((category, index) => (
              <Link 
                key={category.slug || category.id} 
                to={`/boutique/${category.slug || category.id}`}
                className="category-showcase-card"
                data-static-image={category._fromApi ? undefined : 'true'}
                style={{ '--index': index }}
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} loading="lazy" />
                </div>
                <div className="category-content">
                  <span className="category-number">0{index + 1}</span>
                  <h3>{category.name}</h3>
                  <span className="category-arrow">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Cakes Banner */}
      <section className="custom-section">
        <div className="custom-bg">
          <img src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1280&q=75&auto=format&fit=crop" alt="Wedding cake" loading="lazy" width="1280" height="600" />
        </div>
        <div className="container">
          <div className="custom-content">
            <span className="section-subtitle">{t('home.customSubtitle')}</span>
            <h2>
              {t('home.customTitle1')}<br />
              {t('home.customTitle2')}
            </h2>
            <p>{t('home.customDesc')}</p>
            <Link to="/gateaux-sur-mesure" className="btn btn-primary btn-lg">
              {t('home.requestQuote')}
            </Link>
          </div>
        </div>
      </section>

      {/* Mariages */}
      <section className="section occasions-home-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('home.weddingsSubtitle')}</span>
            <h2>{t('home.weddingsTitle')}</h2>
            <p>{t('home.weddingsDesc')}</p>
          </div>
          <div className="occasions-home-grid">
            <div className="occasions-home-card" data-static-image="true">
              <img src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=500&q=75&auto=format&fit=crop" alt={t('home.weddingsCake')} loading="lazy" width="500" height="375" />
              <div className="occasions-home-overlay">
                <h3>{t('home.weddingsCake')}</h3>
              </div>
            </div>
            <div className="occasions-home-card" data-static-image="true">
              <img src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=500&q=75&auto=format&fit=crop" alt={t('home.weddingsPieceMontee')} loading="lazy" width="500" height="375" />
              <div className="occasions-home-overlay">
                <h3>{t('home.weddingsPieceMontee')}</h3>
              </div>
            </div>
            <div className="occasions-home-card" data-static-image="true">
              <img src="https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=500&q=75&auto=format&fit=crop" alt={t('home.weddingsCandyBar')} loading="lazy" width="500" height="375" />
              <div className="occasions-home-overlay">
                <h3>{t('home.weddingsCandyBar')}</h3>
              </div>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: 'var(--space-2xl)' }}>
            <Link to="/mariages" className="btn btn-gold btn-lg">
              {t('home.weddingsCta')}
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section values-section">
        <div className="container">
          <div className="values-grid">
            <div className="value-item">
              <span className="value-number">01</span>
              <h3>{t('home.value1Title')}</h3>
              <p>{t('home.value1Desc')}</p>
            </div>
            <div className="value-item">
              <span className="value-number">02</span>
              <h3>{t('home.value2Title')}</h3>
              <p>{t('home.value2Desc')}</p>
            </div>
            <div className="value-item">
              <span className="value-number">03</span>
              <h3>{t('home.value3Title')}</h3>
              <p>{t('home.value3Desc')}</p>
            </div>
            <div className="value-item">
              <span className="value-number">04</span>
              <h3>{t('home.value4Title')}</h3>
              <p>{t('home.value4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <span className="section-subtitle">{t('home.newsletterSubtitle')}</span>
            <h3>{t('home.newsletterTitle')}</h3>
            <p>{t('home.newsletterDesc')}</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t('home.emailPlaceholder')} 
                className="form-input"
                required 
              />
              <button type="submit" className="btn btn-primary">
                {t('home.subscribe')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default memo(Home)
