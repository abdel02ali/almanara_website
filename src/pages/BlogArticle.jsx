import { memo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useArticle, useLatestArticles } from '../hooks/useArticles'
import { usePageTitle } from '../hooks/usePageTitle'
import './BlogArticle.css'

function BlogArticle() {
  const { t, i18n } = useTranslation()
  const { slug } = useParams()
  const { article, loading, error } = useArticle(slug)
  const { articles: latestArticles } = useLatestArticles()

  // Set page title from article
  usePageTitle(article?.title || 'pageTitles.blog', !!article?.title)

  const dateLocale = i18n.language?.startsWith('ar') ? 'ar-MA' : i18n.language === 'en' ? 'en-GB' : 'fr-FR'

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        color: 'var(--color-text-muted)'
      }}>
        <div style={{
          width: 40,
          height: 40,
          border: '2px solid var(--color-bg-elevated)',
          borderTopColor: 'var(--color-rose-gold)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="not-found">
        <div className="container">
          <h1>{t('blog.articleNotFound', 'المقال غير موجود')}</h1>
          <p>{t('blog.articleNotFoundDesc', 'عذراً، لم نتمكن من العثور على هذا المقال.')}</p>
          <Link to="/blog" className="btn btn-gold">
            {t('blog.backToBlog', '← العودة إلى المدوّنة')}
          </Link>
        </div>
      </div>
    )
  }

  const formattedDate = article.published_at
    ? new Date(article.published_at).toLocaleDateString(dateLocale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    : article.date || ''

  return (
    <div className="article-page">
      <article className="article">
        <header className="article-header">
          <div className="container">
            <Link to="/blog" className="back-link">
              {t('blog.backToBlog', '← العودة إلى المدوّنة')}
            </Link>
            {(article.category?.name || article.category) && (
              <span className="article-category">
                {article.category?.name || article.category}
              </span>
            )}
            <h1>{article.title}</h1>
            <div className="article-meta">
              {formattedDate && <span>{formattedDate}</span>}
              {article.reading_time && (
                <>
                  <span>•</span>
                  <span>{article.reading_time} {t('blog.minRead', 'min')}</span>
                </>
              )}
              {article.author_name && (
                <>
                  <span>•</span>
                  <span>{article.author_name}</span>
                </>
              )}
              {article.views > 0 && (
                <>
                  <span>•</span>
                  <span>{article.views} {t('blog.views', 'مشاهدة')}</span>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="article-hero">
          <img
            src={article.image}
            alt={article.title}
            data-static-image={article._fromApi ? undefined : 'true'}
          />
        </div>

        <div className="container">
          {article.content && (
            <div
              className="article-content"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}
        </div>

        <footer className="article-footer">
          <div className="container">
            {/* Related articles */}
            {latestArticles.length > 0 && (
              <div className="related-articles">
                <h3>{t('blog.relatedArticles', 'مقالات أخرى')}</h3>
                <div className="related-grid">
                  {latestArticles
                    .filter(a => a.slug !== slug)
                    .slice(0, 3)
                    .map(a => (
                      <Link
                        key={a.id || a.slug}
                        to={`/blog/${a.slug}`}
                        className="related-card"
                        data-static-image={a._fromApi ? undefined : 'true'}
                      >
                        <div className="related-card-image">
                          <img src={a.image} alt={a.title} loading="lazy" />
                        </div>
                        <div className="related-card-content">
                          <span className="related-date">
                            {a.published_at
                              ? new Date(a.published_at).toLocaleDateString(dateLocale, {
                                  day: 'numeric',
                                  month: 'short'
                                })
                              : ''}
                          </span>
                          <h4>{a.title}</h4>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            )}

            <div className="article-cta">
              <h3>{t('blog.ctaTitle', 'هل تود تذوق إبداعاتنا؟')}</h3>
              <p>{t('blog.ctaDesc', 'اكتشف متجرنا أو قم بزيارتنا!')}</p>
              <div className="cta-buttons">
                <Link to="/boutique" className="btn btn-gold">
                  {t('blog.ctaShop', 'المتجر')}
                </Link>
                <Link to="/contact" className="btn btn-secondary" style={{
                  border: '1px solid var(--color-rose-gold)',
                  color: 'var(--color-rose-gold)',
                  background: 'transparent'
                }}>
                  {t('blog.ctaContact', 'اتصل بنا')}
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}

export default memo(BlogArticle)
