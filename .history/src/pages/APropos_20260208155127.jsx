import { Link } from 'react-router-dom'
import './APropos.css'

const values = [
  {
    icon: '🌾',
    title: 'Ingrédients d\'Excellence',
    description: 'Farines de moulins locaux, beurre AOP, chocolat Valrhona, fruits de saison.'
  },
  {
    icon: '🏠',
    title: '100% Fait Maison',
    description: 'Tout est préparé sur place, chaque jour, sans aucun produit surgelé.'
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Entreprise Familiale',
    description: 'Une équipe soudée qui partage la même passion pour l\'artisanat.'
  },
  {
    icon: '◈',
    title: 'Engagement Durable',
    description: 'Emballages recyclables, lutte anti-gaspillage, circuit court.'
  }
]

function APropos() {
  return (
    <div className="apropos-page">
      {/* Hero */}
      <header className="apropos-hero">
        <div className="apropos-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1556217477-d325251ece38?w=1920&h=800&fit=crop" 
            alt="Notre boulangerie" 
          />
          <div className="apropos-hero-overlay"></div>
        </div>
        <div className="container apropos-hero-content">
          <span className="section-subtitle">Depuis 2014</span>
          <h1>Notre Histoire</h1>
          <p>
            Une aventure familiale née de la passion pour l'artisanat 
            et le goût des bonnes choses.
          </p>
        </div>
      </header>

      {/* Story */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <span className="section-subtitle">Notre Parcours</span>
              <h2>De la passion à l'excellence</h2>
              <p>
                C'est en 2014, au cœur de Ksar Sghir, 
                que Marie et Pierre Manara ont ouvert les portes de leur 
                boulangerie-pâtisserie. Tous deux issus de familles 
                d'artisans, ils ont grandi bercés par l'odeur du pain chaud 
                et le crépitement du four.
              </p>
              <p>
                Après des années de formation auprès des plus grands – Marie 
                chez Lenôtre, Pierre chez Poilâne – ils ont uni leurs talents 
                pour créer un lieu où tradition et créativité se rencontrent.
              </p>
              <p>
                Aujourd'hui, Manara est devenue une adresse incontournable 
                pour les gourmands parisiens. Notre équipe de 8 artisans 
                perpétue chaque jour cet héritage, avec le même souci du 
                détail et la même exigence de qualité.
              </p>
            </div>
            <div className="story-images">
              <img 
                src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=500&h=600&fit=crop" 
                alt="Pain artisanal" 
                className="story-img-1"
              />
              <img 
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop" 
                alt="Nos créations" 
                className="story-img-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Ce qui nous anime</span>
            <h2>Notre Philosophie</h2>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <span className="value-icon">{value.icon}</span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="apropos-cta">
        <div className="container">
          <h2>Venez nous rencontrer !</h2>
          <p>Découvrez notre boutique et rencontrez notre équipe passionnée.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-gold btn-lg">
              Nous trouver
            </Link>
            <Link to="/boutique" className="btn btn-secondary btn-lg">
              Découvrir nos produits
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default APropos
