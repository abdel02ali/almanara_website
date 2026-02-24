import { useState, memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCategories, useProducts } from '../hooks/useProducts'
import OptimizedImage from '../components/OptimizedImage'
import './Boutique.css'

function Boutique() {
  const { t } = useTranslation()
  const { categories, loading: catLoading } = useCategories()
  const { products, loading: prodLoading } = useProducts()
  const [activeCategory, setActiveCategory] = useState('tous')

  const loading = catLoading || prodLoading

  // Find the active category object to match by name too
  const activeCatObj = categories.find(c => (c.slug || c.id) === activeCategory)
  
  const filteredProducts = activeCategory === 'tous' 
    ? products 
    : products.filter(p => {
        // Match by slug or id
        if (p.category === activeCategory) return true
        if (p.category_slug === activeCategory) return true
        // Match by category name (handles API vs static mismatch)
        if (activeCatObj && p.category_name === activeCatObj.name) return true
        return false
      })

  return (
    <div className="boutique-page">
      <header className="page-header">
        <div className="container">
          <h1>{t('shop.title')}</h1>
          <p>{t('shop.desc')}</p>
        </div>
      </header>

      {/* Categories Navigation */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('shop.exploreSubtitle')}</span>
            <h2>{t('shop.categoriesTitle')}</h2>
          </div>
          <div className="boutique-categories stagger">
            {categories.map(category => (
              <Link 
                key={category.slug || category.id}
                to={`/boutique/${category.slug || category.id}`}
                className="boutique-category-card"
              >
                <div className="boutique-category-image">
                  <OptimizedImage 
                    src={category.image} 
                    alt={category.name} 
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="boutique-category-overlay"></div>
                </div>
                <div className="boutique-category-content">
                  <span className="boutique-category-icon">{category.icon}</span>
                  <h2>{category.name}</h2>
                  <p>{category.description}</p>
                  <span className="boutique-category-link">
                    {t('shop.viewProducts')}
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Products Section */}
      <section className="section boutique-products-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('shop.allProductsSubtitle')}</span>
            <h2>{t('shop.selectionTitle')}</h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="boutique-filter-tabs">
            <button 
              className={`filter-tab ${activeCategory === 'tous' ? 'active' : ''}`}
              onClick={() => setActiveCategory('tous')}
            >
              {t('shop.all')}
            </button>
            {categories.map(cat => (
              <button 
                key={cat.slug || cat.id}
                className={`filter-tab ${activeCategory === (cat.slug || cat.id) ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.slug || cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading-state">
              <p>{t('shop.loading')}</p>
            </div>
          ) : (
            <>
              <p className="results-count">{filteredProducts.length} {filteredProducts.length > 1 ? t('shop.products') : t('shop.product')}</p>
              <div className="boutique-products-grid stagger">
                {filteredProducts.map(product => (
                  <article key={product.slug || product.id} className="product-card card">
                    <div className="product-image">
                      <OptimizedImage 
                        src={product.image} 
                        alt={product.name}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {product.badge && (
                        <span className={`badge ${
                          product.badge === 'Promo' || product.badge === 'promo' ? 'badge-raspberry' : 
                          product.badge === 'Saison' || product.badge === 'nouveau' ? 'badge-pistachio' : 'badge-gold'
                        }`}>
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <div className="product-content">
                      <h3>{product.name}</h3>
                      <p className="product-description">{product.description}</p>
                      <div className="product-footer">
                        <div className="product-price">
                          {(product.oldPrice || product.old_price) && (
                            <span className="price-old">{parseFloat(product.oldPrice || product.old_price).toFixed(2)} €</span>
                          )}
                          <span className="price">{parseFloat(product.price).toFixed(2)} €</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="empty-category" style={{ textAlign: 'center', padding: 'var(--space-3xl) 0' }}>
                  <span className="empty-icon">◇</span>
                  <h2>{t('shop.noProducts')}</h2>
                  <p>{t('shop.tryAnother')}</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="boutique-info">
        <div className="container">
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon">◎</span>
              <h3>{t('shop.clickCollect')}</h3>
              <p>{t('shop.clickCollectDesc')}</p>
            </div>
            <div className="info-item">
              <span className="info-icon">○</span>
              <h3>{t('shop.expressPickup')}</h3>
              <p>{t('shop.expressPickupDesc')}</p>
            </div>
            <div className="info-item">
              <span className="info-icon">★</span>
              <h3>{t('shop.loyalty')}</h3>
              <p>{t('shop.loyaltyDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default memo(Boutique)
