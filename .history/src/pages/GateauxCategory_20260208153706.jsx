import { useParams, Link } from 'react-router-dom'
import { useCustomCakeDetail } from '../hooks/useCustomCakes'
import './GateauxCategory.css'

function GateauxCategory() {
  const { type } = useParams()
  const { cakeDetail: data, loading } = useCustomCakeDetail(type)

  if (loading) {
    return (
      <div className="gateaux-category-page">
        <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="not-found">
        <div className="container">
          <h1>Page non trouvée</h1>
          <Link to="/gateaux-sur-mesure" className="btn btn-primary">
            Retour aux gâteaux sur mesure
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
          <img src={data.hero_image} alt={data.title} />
          <div className="gateaux-cat-hero-overlay"></div>
        </div>
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Accueil</Link>
            <span>/</span>
            <Link to="/gateaux-sur-mesure">Gâteaux sur mesure</Link>
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
              <span className="section-subtitle">Nos Créations</span>
              <h2>Galerie d'Inspiration</h2>
              <p>Chaque gâteau est unique et personnalisable selon vos envies.</p>
            </div>

            <div className="gallery-grid">
              {galleryItems.map((item, index) => (
                <div key={item.id || index} className="gallery-item">
                  <img src={item.image} alt={item.title} />
                  <div className="gallery-overlay">
                    <h3>{item.title}</h3>
                    <span className="gallery-price">
                      À partir de {item.price} €{priceUnit ? ` ${priceUnit}` : ''}
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
                <h2>Nos Parfums</h2>
                <p>Composez le gâteau de vos rêves avec nos saveurs signature.</p>
                <div className="flavors-list">
                  {flavors.map((flavor, index) => (
                    <span key={flavor.id || index} className="flavor-tag">
                      {flavor.name || flavor}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flavors-cta">
                <h3>Prêt à Commander ?</h3>
                <p>Contactez-nous pour un devis personnalisé gratuit.</p>
                <Link to="/gateaux/devis" className="btn btn-gold">
                  Demander un devis
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
              <h3>Délai de Commande</h3>
              <p>Commandez au minimum 7 jours à l'avance (3 semaines pour les mariages).</p>
            </div>
            <div className="info-box">
              <span className="info-box-icon">🚚</span>
              <h3>Livraison</h3>
              <p>Livraison possible sur Paris et proche banlieue. Retrait en boutique gratuit.</p>
            </div>
            <div className="info-box">
              <span className="info-box-icon">🎨</span>
              <h3>Personnalisation</h3>
              <p>Couleurs, décors, inscriptions... Tout est possible selon vos envies !</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GateauxCategory
