import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './BlogArticle.css'

// Example article data
const articleData = {
  'galette-rois-2024': {
    title: 'La Galette des Rois : Tradition et Gourmandise',
    date: '5 janvier 2024',
    readTime: '5 min',
    category: 'Saison',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&h=600&fit=crop',
    content: `
      <p>Chaque année, dès les premiers jours de janvier, la galette des rois fait son grand retour sur nos tables. Cette tradition ancestrale, célébrée le jour de l'Épiphanie, réunit familles et amis autour d'un dessert symbolique et délicieux.</p>
      
      <h2>Une histoire millénaire</h2>
      <p>L'origine de la galette des rois remonte aux Saturnales romaines, fêtes durant lesquelles un roi était désigné parmi les esclaves grâce à une fève cachée dans un gâteau. Au Moyen Âge, la tradition s'est christianisée pour célébrer l'Épiphanie, jour où les Rois mages ont rendu visite à l'enfant Jésus.</p>
      
      <h2>Notre recette signature</h2>
      <p>Chez Al Manara, notre galette est le fruit de plusieurs jours de travail. Le feuilletage est réalisé entièrement à la main, avec du beurre AOP des Charentes-Poitou. La crème d'amande, préparée avec des amandes du Val de Durance, révèle des notes subtiles de fleur d'oranger.</p>
      
      <blockquote>
        "La perfection d'une galette réside dans son feuilletage : croustillant à l'extérieur, fondant à l'intérieur."
        <cite>— Al Manara, Boulanger</cite>
      </blockquote>
      
      <h2>Nos conseils de dégustation</h2>
      <ul>
        <li>Réchauffez la galette 10 minutes à 180°C pour raviver le croustillant</li>
        <li>Accompagnez-la d'un cidre brut ou d'un vin pétillant</li>
        <li>Conservez-la à température ambiante, jamais au réfrigérateur</li>
      </ul>
      
      <p>Cette année, nous proposons également une version innovante : la galette pistache-framboise, pour ceux qui souhaitent surprendre leurs convives tout en respectant la tradition.</p>
      
      <h2>Commandez votre galette</h2>
      <p>Nos galettes sont disponibles en boutique et sur commande du 2 au 31 janvier. Pensez à réserver pour les grandes tailles (8 personnes et plus) au moins 48h à l'avance.</p>
    `
  }
}

function BlogArticle() {
  const { t } = useTranslation()
  const { slug } = useParams()
  const article = articleData[slug]

  if (!article) {
    return (
      <div className="not-found">
        <div className="container">
          <h1>Article non trouvé</h1>
          <Link to="/blog" className="btn btn-primary">
            {t('blog.title')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="article-page">
      <article className="article">
        <header className="article-header">
          <div className="container">
            <Link to="/blog" className="back-link">
              ← Retour aux actualités
            </Link>
            <span className="article-category">{article.category}</span>
            <h1>{article.title}</h1>
            <div className="article-meta">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime} de lecture</span>
            </div>
          </div>
        </header>

        <div className="article-hero">
          <img src={article.image} alt={article.title} />
        </div>

        <div className="container">
          <div className="article-content" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        <footer className="article-footer">
          <div className="container">
            <div className="share-article">
              <span>Partager cet article :</span>
              <div className="share-buttons">
                <a href="#" className="share-btn">Facebook</a>
                <a href="#" className="share-btn">Twitter</a>
                <a href="#" className="share-btn">Pinterest</a>
              </div>
            </div>

            <div className="article-cta">
              <h3>Envie de goûter nos créations ?</h3>
              <p>Découvrez notre boutique en ligne ou rendez-nous visite !</p>
              <div className="cta-buttons">
                <Link to="/boutique" className="btn btn-primary">
                  Voir la boutique
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  Nous trouver
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}

export default BlogArticle

