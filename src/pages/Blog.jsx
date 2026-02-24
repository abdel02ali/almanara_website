import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useArticles } from '../hooks/useArticles'
import { usePageTitle } from '../hooks/usePageTitle'
import './Blog.css'

function Blog() {
  const { t, i18n } = useTranslation()
  usePageTitle('pageTitles.blog')
  const filterCategories = [
    t('blog.all'), t('blog.season'), t('blog.recipe'), t('blog.event'), t('blog.advice')
  ]
  const [activeFilter, setActiveFilter] = useState(t('blog.all'))
  const { articles, loading } = useArticles()

  const dateLocale = i18n.language === 'ar' ? 'ar-MA' : i18n.language === 'en' ? 'en-GB' : 'fr-FR'

  return (
    <div className="blog-page">
      <header className="page-header">
        <div className="container">
          <h1>{t('blog.title')}</h1>
          <p>{t('blog.desc')}</p>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="blog-filters">
            {filterCategories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${cat === activeFilter ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading-state">
              <p>{t('blog.loading')}</p>
            </div>
          ) : (
            <div className="blog-grid">
              {articles
                .filter(article => activeFilter === t('blog.all') || 
                  (article.category?.name || article.category) === activeFilter)
                .map((article, index) => (
                  <Link 
                    key={article.id || article.slug}
                    to={`/blog/${article.slug || article.id}`}
                    className={`blog-card ${index === 0 ? 'featured' : ''}`}
                  >
                    <div className="blog-card-image">
                      <img src={article.image} alt={article.title} loading="lazy" />
                      <span className="blog-category">
                        {article.category?.name || article.category}
                      </span>
                    </div>
                    <div className="blog-card-content">
                      <div className="blog-meta">
                        <span>
                          {article.published_at 
                            ? new Date(article.published_at).toLocaleDateString(dateLocale, { 
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric' 
                              })
                            : article.date}
                        </span>
                        <span>•</span>
                        <span>{article.reading_time || article.readTime} {t('blog.minRead')}</span>
                      </div>
                      <h2>{article.title}</h2>
                      <p>{article.excerpt}</p>
                      <span className="read-more">
                        {t('blog.readMore')}
                      </span>
                    </div>
                  </Link>
                ))}
            </div>
          )}

          <div className="blog-pagination">
            <button className="pagination-btn active">1</button>
            <button className="pagination-btn">2</button>
            <button className="pagination-btn">3</button>
            <button className="pagination-btn">→</button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="blog-newsletter">
        <div className="container">
          <div className="newsletter-card">
            <div className="newsletter-content">
              <h3>{t('blog.newsletterTitle')}</h3>
              <p>{t('blog.newsletterDesc')}</p>
            </div>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t('blog.emailPlaceholder')} 
                className="form-input"
                required 
              />
              <button type="submit" className="btn btn-gold">
                {t('blog.subscribeBtn')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default memo(Blog)
