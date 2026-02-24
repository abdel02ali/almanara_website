import { memo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCustomCakeDetail } from '../hooks/useCustomCakes'
import OptimizedImage from '../components/OptimizedImage'
import './GateauxCategory.css'

function GateauxCategory() {
  const { t } = useTranslation()
  const { type } = useParams()
  const { cakeDetail: data, loading } = useCustomCakeDetail(type)

  if (loading) {
    return (
      <div className="gateaux-category-page">
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
          <p>{t('custom.loading')}</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="not-found">
        <div className="container">
          <h1>{t('custom.pageNotFound')}</h1>
          <Link to="/gateaux-sur-mesure" className="btn btn-primary">
            {t('custom.backToCustom')}
          </Link>
        </div>
      </div>
    )
  }

  const galleryItems = data.gallery_items || []
  const flavors = data.flavors || []
  const priceUnit = data.price_unit || ''

  return (
    <div className="gateaux-category-page">
      <header className="gateaux-cat-hero">
        <div className="gateaux-cat-hero-bg">
          <OptimizedImage src={data.hero_image} alt={data.title} priority sizes="100vw" />
          <div className="gateaux-cat-hero-overlay"></div>
        </div>
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">{t('shop.breadcrumbHome')}</Link>
            <span>/</span>
            <Link to="/gateaux-sur-mesure">{t('nav.custom')}</Link>
            <span>/</span>
            <span>{data.title}</span>
          </nav>
          <h1>{data.title}</h1>
          <p>{data.description}</p>
        </div>
      </header>

      {galleryItems.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">{t('custom.creationsSubtitle')}</span>
              <h2>{t('custom.galleryTitle')}</h2>
              <p>{t('custom.galleryDesc')}</p>
            </div>

            <div className="gallery-grid">
              {galleryItems.map((item, index) => (
                <div key={item.id || index} className="gallery-item">
                  <OptimizedImage src={item.image} alt={item.title} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                  <div className="gallery-overlay">
                    <h3>{item.title}</h3>
                    <span className="gallery-price">
                      {t('custom.priceFrom')} {item.price} €{priceUnit ? ` ${priceUnit}` : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {flavors.length > 0 && (
        <section className="section flavors-section">
          <div className="container">
            <div className="flavors-card">
              <div className="flavors-content">
                <h2>{t('custom.flavorsTitle')}</h2>
                <p>{t('custom.flavorsDesc')}</p>
                <div className="flavors-list">
                  {flavors.map((flavor, index) => (
                    <span key={flavor.id || index} className="flavor-tag">
                      {flavor.name || flavor}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flavors-cta">
                <h3>{t('custom.readyToOrder')}</h3>
                <p>{t('custom.freeQuote')}</p>
                <Link to="/gateaux/devis" className="btn btn-gold">
                  {t('custom.requestQuote')}
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container">
          <div className="info-boxes">
            <div className="info-box">
              <span className="info-box-icon">📅</span>
              <h3>{t('custom.orderDelay')}</h3>
              <p>{t('custom.orderDelayDesc')}</p>
            </div>
            <div className="info-box">
              <span className="info-box-icon">🚚</span>
              <h3>{t('custom.delivery')}</h3>
              <p>{t('custom.deliveryDesc')}</p>
            </div>
            <div className="info-box">
              <span className="info-box-icon">🎨</span>
              <h3>{t('custom.customization')}</h3>
              <p>{t('custom.customizationDesc')}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default memo(GateauxCategory)
