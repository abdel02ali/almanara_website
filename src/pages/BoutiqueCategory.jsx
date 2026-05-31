import { memo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCategoryProducts, useCategories } from '../hooks/useProducts'
import { usePageTitle } from '../hooks/usePageTitle'
import './BoutiqueCategory.css'

/** Pick the right name based on current language */
const isArabic = (lang) => lang === 'ar' || lang?.startsWith('ar-') || lang?.startsWith('ar_')
const getCatName = (cat, lang) => (isArabic(lang) && cat.name_ar) ? cat.name_ar : cat.name

function BoutiqueCategory() {
  const { t, i18n } = useTranslation()
  const { category } = useParams()
  const { categories } = useCategories()
  const { category: categoryInfo, products, loading } = useCategoryProducts(category)
  usePageTitle(categoryInfo ? getCatName(categoryInfo, i18n.language) : 'pageTitles.shop', !!categoryInfo)

  if (loading) {
    return (
      <div className="loading-state">
        <div className="container">
          <p>{t('common.loading')}</p>
        </div>
      </div>
    )
  }

  if (!categoryInfo) {
    return (
      <div className="not-found">
        <div className="container">
          <h1>{t('shop.categoryNotFound')}</h1>
          <Link to="/boutique" className="btn btn-primary">
            {t('shop.backToShop')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="category-page">
      <header className="category-header">
        <div className="category-header-bg">
          <img
            src={categoryInfo.image}
            alt={getCatName(categoryInfo, i18n.language)}
            data-static-image={categoryInfo.__isStaticFallback ? 'true' : undefined}
          />
          <div className="category-header-overlay"></div>
        </div>
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">{t('shop.breadcrumbHome')}</Link>
            <span>/</span>
            <Link to="/boutique">{t('shop.breadcrumbShop')}</Link>
            <span>/</span>
            <span>{getCatName(categoryInfo, i18n.language)}</span>
          </nav>
          <div className="category-header-content">
            <span className="category-header-icon">{categoryInfo.icon}</span>
            <h1>{getCatName(categoryInfo, i18n.language)}</h1>
            <p>{categoryInfo.description}</p>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="category-filters">
            <p className="results-count">{products.length} {products.length > 1 ? t('shop.products') : t('shop.product')}</p>
            <div className="filter-buttons">
              <button className="filter-btn active">{t('shop.all')}</button>
              <button className="filter-btn">{t('shop.newArrivals')}</button>
              <button className="filter-btn">{t('shop.priceAsc')}</button>
            </div>
          </div>

          <div className="products-grid stagger">
            {products.map(product => (
              <article
                key={product.slug || product.id}
                className="product-card card"
                data-static-card={product.__isStaticFallback ? 'true' : undefined}
              >
                <div className="product-image">
                  <img src={product.image} alt={product.name} loading="lazy" />
                  {product.badge && (
                    <span className={`badge ${
                      product.badge === 'Promo' ? 'badge-raspberry' : 
                      product.badge === 'Saison' ? 'badge-pistachio' : 'badge-gold'
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
                        <span className="price-old">{parseFloat(product.oldPrice || product.old_price).toFixed(2)} DH</span>
                      )}
                      <span className="price">{parseFloat(product.price).toFixed(2)} DH</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {products.length === 0 && (
            <div className="empty-category">
              <span className="empty-icon">◇</span>
              <h2>{t('shop.noProductsAvailable')}</h2>
              <p>{t('shop.comingSoon')}</p>
              <Link to="/boutique" className="btn btn-primary">
                {t('shop.viewOtherCategories')}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other categories */}
      <section className="section related-categories">
        <div className="container">
          <h2 className="text-center">{t('shop.otherCategories')}</h2>
          <div className="related-grid">
            {categories
              .filter(c => (c.slug || c.id) !== category)
              .slice(0, 4)
              .map(cat => (
                <Link 
                  key={cat.slug || cat.id}
                  to={`/boutique/${cat.slug || cat.id}`}
                  className="related-card"
                  data-static-card={cat.__isStaticFallback ? 'true' : undefined}
                >
                  <img src={cat.image} alt={getCatName(cat, i18n.language)} loading="lazy" />
                  <div className="related-overlay"></div>
                  <span className="related-icon">{cat.icon}</span>
                  <h3>{getCatName(cat, i18n.language)}</h3>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default memo(BoutiqueCategory)
