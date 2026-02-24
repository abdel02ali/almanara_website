import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import { useFeaturedProducts, useCategories } from '../hooks/useProducts'
import './Home.css'

function Home() {
  const { addItem } = useCart()
  const { isRamadan } = useTheme()
  const { products: featuredProducts, loading: productsLoading } = useFeaturedProducts()
  const { categories, loading: categoriesLoading } = useCategories()

  return (
    <div className="home">
      {/* Hero Section */}
      <section className={`hero ${isRamadan ? 'ramadan-hero' : ''}`}>
        <div className="hero-bg">
          <div className="hero-image">
            <img 
              src={isRamadan 
                ? "https://images.unsplash.com/photo-1532117182044-031e7cd916ee?w=1920&h=1200&fit=crop"
                : "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920&h=1200&fit=crop"
              } 
              alt={isRamadan ? "Ramadan sweets and dates" : "Artisan bread"} 
            />
          </div>
          <div className={`hero-gradient ${isRamadan ? 'ramadan-gradient' : ''}`}></div>
          {isRamadan && <div className="islamic-pattern"></div>}
        </div>
        
        <div className="container hero-content">
          <div className="hero-text">
            <span className="hero-label">
              {isRamadan ? 'Ramadan Kareem' : 'Pâtisserie d\'Art'}
            </span>
            <h1>
              {isRamadan ? (
                <>Saveurs du<br /><span className="text-rose">Ramadan</span></>
              ) : (
                <>L'Excellence<br /><span className="text-rose">Artisanale</span></>
              )}
            </h1>
            <p>
              {isRamadan 
                ? 'Célébrez ce mois sacré avec nos pâtisseries traditionnelles. Des douceurs préparées avec amour pour vos moments d\'Iftar et de Suhoor.'
                : 'Depuis 2014, nous cultivons l\'art de la gourmandise. Chaque création est une ode à la tradition et à l\'innovation.'
              }
            </p>
            <div className="hero-actions">
              <Link to="/boutique" className="btn btn-primary btn-lg">
                {isRamadan ? 'Spécial Ramadan' : 'Découvrir'}
              </Link>
              <Link to="/gateaux-sur-mesure" className="btn btn-secondary btn-lg">
                {isRamadan ? 'Commander' : 'Sur Mesure'}
              </Link>
            </div>
          </div>
          
          <div className="hero-feature">
            {isRamadan ? (
              <div className="feature-card ramadan-card">
                <span className="feature-icon">☾</span>
                <span className="feature-label">Iftar & Suhoor</span>
                <span className="feature-sublabel">Livraison disponible</span>
              </div>
            ) : (
              <div className="feature-card">
                <span className="feature-number">14</span>
                <span className="feature-label">Années d'Excellence</span>
              </div>
            )}
          </div>
        </div>

        <div className="hero-scroll">
          <span>{isRamadan ? 'Découvrir' : 'Scroll'}</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Ramadan Special Section - Only visible during Ramadan theme */}
      {isRamadan && (
        <section className="section ramadan-special-section">
          <div className="container">
            <div className="section-header">
              <span className="section-subtitle">Spécial Ramadan</span>
              <h2>Douceurs Traditionnelles</h2>
              <p>Des pâtisseries authentiques pour illuminer vos soirées</p>
            </div>
            
            <div className="ramadan-specials-grid">
              <div className="ramadan-special-card">
                <div className="special-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
                </div>
                <h3>Dattes Premium</h3>
                <p>Medjool, Ajwa et variétés rares</p>
                <span className="special-price">À partir de 8,90 €</span>
              </div>
              <div className="ramadan-special-card featured">
                <div className="special-badge">Populaire</div>
                <div className="special-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor"><path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.5L17.5 8 12 11.5 6.5 8 12 4.5zM6 9.5l5 3v6l-5-3v-6zm7 9v-6l5-3v6l-5 3z"/></svg>
                </div>
                <h3>Assortiment Iftar</h3>
                <p>Baklava, Makrout, Cornes de gazelle</p>
                <span className="special-price">24,90 €</span>
              </div>
              <div className="ramadan-special-card">
                <div className="special-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor"><path d="M12 3c-1.1 0-2 .9-2 2v2H7c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2h-3V5c0-1.1-.9-2-2-2zm-5 6h10v10H7V9z"/></svg>
                </div>
                <h3>Pâtisseries au Miel</h3>
                <p>Chebakia, Briouates, Sellou</p>
                <span className="special-price">À partir de 12,90 €</span>
              </div>
              <div className="ramadan-special-card">
                <div className="special-icon">
                  <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor"><path d="M2 21h18v-2H2v2zm18-10h-2V9h2v2zm-2-4V5h-2v2h2zm-4 0V5h2V3H8v2h2v2h4zm-6 0h2V5H8v2zm-2 4h2V9H6v2zm0 4h12v-2H6v2zm14-6h-2v2h2v-2zm-4 2h-2v-2h2v2z"/></svg>
                </div>
                <h3>Coffret Suhoor</h3>
                <p>Viennoiseries fraîches livrées à l'aube</p>
                <span className="special-price">18,90 €</span>
              </div>
            </div>
            
            <div className="text-center" style={{ marginTop: 'var(--space-3xl)' }}>
              <Link to="/boutique" className="btn btn-primary btn-lg">
                Voir tous les produits Ramadan
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Intro Section */}
      <section className="section intro-section">
        <div className="container">
          <div className="intro-content">
            <span className="section-subtitle">Notre Philosophie</span>
            <h2>
              L'art du fait main,<br />
              le goût de l'authentique
            </h2>
            <div className="deco-line"></div>
            <p>
              Chez Al Manara, nous croyons que chaque bouchée raconte une histoire. 
              Des ingrédients d'exception, un savoir-faire ancestral, 
              et une passion sans compromis pour créer des moments de pur bonheur.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Sélection</span>
            <h2>Nos Signatures</h2>
            <p>Les créations qui ont fait notre renommée.</p>
          </div>
          
          <div className="featured-grid stagger">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <article key={product.slug || product.id} className={`product-card ${index === 0 ? 'large' : ''}`}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <div className="product-overlay">
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addItem(product)}
                    >
                      <svg viewBox="0 0 24 24" width="20" height="20">
                        <path fill="currentColor" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                    </button>
                  </div>
                  {product.badge && (
                    <span className="product-badge">{product.badge}</span>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <span className="price">{parseFloat(product.price).toFixed(2)} €</span>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center" style={{ marginTop: 'var(--space-3xl)' }}>
            <Link to="/boutique" className="btn btn-ghost">
              Voir toutes nos créations →
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="section categories-section">
        <div className="container">
          <div className="categories-header">
            <span className="section-subtitle">Explorer</span>
            <h2>Nos Univers</h2>
          </div>
          
          <div className="categories-showcase">
            {categories.slice(0, 4).map((category, index) => (
              <Link 
                key={category.slug || category.id} 
                to={`/boutique/${category.slug || category.id}`}
                className="category-showcase-card"
                style={{ '--index': index }}
              >
                <div className="category-image">
                  <img src={category.image} alt={category.name} />
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
          <img 
            src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1920&h=900&fit=crop" 
            alt="Wedding cake" 
          />
        </div>
        <div className="container">
          <div className="custom-content">
            <span className="section-subtitle">Sur Mesure</span>
            <h2>
              Vos Rêves,<br />
              Nos Créations
            </h2>
            <p>
              Mariages, anniversaires, événements... Confiez-nous vos envies 
              les plus ambitieuses. Nous transformons vos idées en 
              chefs-d'œuvre comestibles.
            </p>
            <Link to="/gateaux-sur-mesure" className="btn btn-primary btn-lg">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="section about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-images">
              <div className="about-img-wrapper main">
                <img 
                  src="https://images.unsplash.com/photo-1556217477-d325251ece38?w=500&h=600&fit=crop" 
                  alt="Notre artisan" 
                />
              </div>
              <div className="about-img-wrapper secondary">
                <img 
                  src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=400&h=300&fit=crop" 
                  alt="Nos pains" 
                />
              </div>
            </div>
            <div className="about-content">
              <span className="section-subtitle">Notre Histoire</span>
              <h2>
                La Passion<br />
                au Quotidien
              </h2>
              <p>
                Fondée en 2014, Al Manara perpétue 
                les traditions boulangères françaises tout en embrassant 
                l'innovation. Un levain centenaire, des farines de moulin, 
                et un amour inconditionnel pour le beau et le bon.
              </p>
              <Link to="/a-propos" className="btn btn-secondary">
                Notre parcours
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section values-section">
        <div className="container">
          <div className="values-grid">
            <div className="value-item">
              <span className="value-number">01</span>
              <h3>Ingrédients d'Exception</h3>
              <p>Farines françaises, beurre AOP, chocolat grand cru</p>
            </div>
            <div className="value-item">
              <span className="value-number">02</span>
              <h3>Savoir-Faire Artisanal</h3>
              <p>Tout est fait main, chaque jour, sans compromis</p>
            </div>
            <div className="value-item">
              <span className="value-number">03</span>
              <h3>Passion & Créativité</h3>
              <p>Innovation constante dans le respect de la tradition</p>
            </div>
            <div className="value-item">
              <span className="value-number">04</span>
              <h3>Engagement Local</h3>
              <p>Circuit court et fournisseurs de confiance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <span className="section-subtitle">Newsletter</span>
            <h3>Restez Gourmand</h3>
            <p>Recevez nos actualités et offres exclusives</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="votre@email.com" 
                className="form-input"
                required 
              />
              <button type="submit" className="btn btn-primary">
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
