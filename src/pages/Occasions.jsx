import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useWeddingTypes, useWeddingCategories } from '../hooks'
import { usePageTitle } from '../hooks/usePageTitle'
import './Occasions.css'

function Mariages() {
  const { t } = useTranslation()
  usePageTitle('pageTitles.weddings')
  const { weddingTypes, loading: weddingTypesLoading } = useWeddingTypes()
  const { categories: weddingCategories, loading: categoriesLoading } = useWeddingCategories()
  const [activeCategory, setActiveCategory] = useState(null)

  return (
    <div className="occasions-page">
      {/* Hero */}
      <header className="occasions-hero">
        <div className="occasions-hero-bg">
          <img
            src="/pictures/The-Splendor-of-a-Traditional-Moroccan-Wedding-Celebration-scaled.jpg"
            alt={t('mariages.heroAlt')}
            width="1280"
            height="720"
            fetchPriority="high"
          />
          <div className="occasions-hero-overlay"></div>
        </div>
        <div className="container occasions-hero-content">
          <span className="section-subtitle">{t('mariages.heroSubtitle')}</span>
          <h1>{t('mariages.heroTitle1')}<br /><span className="text-rose">{t('mariages.heroTitle2')}</span></h1>
          <p>{t('mariages.heroDesc')}</p>
        </div>
      </header>

      {/* Wedding Types We Serve */}
      <section className="section wedding-types-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">{t('mariages.typesSubtitle')}</span>
            <h2>{t('mariages.typesTitle')}</h2>
            <p>{t('mariages.typesDesc')}</p>
          </div>

          {weddingTypesLoading ? (
            <div className="wedding-types-grid">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="wedding-type-card skeleton">
                  <div className="wedding-type-card-shimmer" />
                </div>
              ))}
            </div>
          ) : (
            <div className="wedding-types-grid">
              {weddingTypes.map((type, i) => (
                <div
                  key={type.id}
                  className="wedding-type-card"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="wedding-type-image">
                    {type.image && (
                      <img
                        src={type.image}
                        alt={type.name}
                        loading="lazy"
                        width="600"
                        height="400"
                      />
                    )}
                    <div className="wedding-type-overlay" />
                  </div>
                  <div className="wedding-type-icon">
                    <span>{type.icon}</span>
                  </div>
                  <div className="wedding-type-content">
                    <h3>{type.name}</h3>
                    <p>{type.description}</p>
                  </div>
                  <div className="wedding-type-shine" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Wedding Items by Category */}
      {!categoriesLoading && weddingCategories.length > 0 && (
        <section className="section wedding-items-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">{t('mariages.itemsSubtitle')}</span>
              <h2>{t('mariages.itemsTitle')}</h2>
              <p>{t('mariages.itemsDesc')}</p>
            </div>

            {/* Category Tabs */}
            <div className="wedding-category-tabs">
              <button
                className={`wedding-tab ${activeCategory === null ? 'active' : ''}`}
                onClick={() => setActiveCategory(null)}
              >
                <span className="wedding-tab-icon">✦</span>
                {t('mariages.allCategories')}
              </button>
              {weddingCategories.map((cat) => (
                <button
                  key={cat.id}
                  className={`wedding-tab ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="wedding-tab-icon">{cat.icon}</span>
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Items grouped by category */}
            <div className="wedding-categories-list">
              {weddingCategories
                .filter(cat => activeCategory === null || cat.id === activeCategory)
                .map((cat) => (
                  cat.items && cat.items.length > 0 && (
                    <div key={cat.id} className="wedding-category-block">
                      <div className="wedding-category-header">
                        <span className="wedding-category-icon">{cat.icon}</span>
                        <div>
                          <h3>{cat.name}</h3>
                          {cat.description && <p>{cat.description}</p>}
                        </div>
                      </div>

                      <div className="wedding-items-grid">
                        {cat.items.map((item, i) => (
                          <div
                            key={item.id}
                            className="wedding-item-card"
                            style={{ animationDelay: `${i * 0.08}s` }}
                          >
                            <div className="wedding-item-image">
                              <img
                                src={item.image}
                                alt={item.name}
                                loading="lazy"
                                width="400"
                                height="300"
                              />
                              {item.price && (
                                <span className="wedding-item-price">
                                  {item.price} DH
                                </span>
                              )}
                            </div>
                            <div className="wedding-item-content">
                              <h4>{item.name}</h4>
                              {item.description && <p>{item.description}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="occasions-cta">
        <div className="container">
          <div className="cta-card">
            <h2>{t('mariages.ctaTitle')}</h2>
            <p>{t('mariages.ctaDesc')}</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-gold btn-lg">{t('mariages.ctaBtn2')}</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default memo(Mariages)
