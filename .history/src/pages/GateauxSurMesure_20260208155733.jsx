import { Link } from 'react-router-dom'
import { useCustomCakeTypes, useProcessSteps } from '../hooks/useCustomCakes'
import './GateauxSurMesure.css'

function GateauxSurMesure() {
  const { cakeTypes, loading: typesLoading } = useCustomCakeTypes()
  const { steps, loading: stepsLoading } = useProcessSteps()

  return (
    <div className="gateaux-page">
      <header className="gateaux-hero">
        <div className="gateaux-hero-bg">
          <img 
            src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=1920&h=1080&fit=crop" 
            alt="Gâteau de mariage" 
          />
          <div className="gateaux-hero-overlay"></div>
        </div>
        <div className="container gateaux-hero-content">
          <span className="section-subtitle">Création Sur Mesure</span>
          <h1>Gâteaux<br /><span className="text-gold">d'Exception</span></h1>
          <p>
            Transformez vos moments précieux en souvenirs inoubliables 
            avec nos créations pâtissières personnalisées.
          </p>
          <Link to="/gateaux/devis" className="btn btn-gold btn-lg">
            Demander un devis
          </Link>
        </div>
      </header>

      {/* Cake Types */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Nos Spécialités</span>
            <h2>Pour Chaque Occasion</h2>
          </div>

          {typesLoading ? (
            <div className="loading-placeholder">Chargement...</div>
          ) : (
            <div className="cake-types-grid">
              {cakeTypes.map(type => (
                <Link 
                  key={type.id}
                  to={`/gateaux/${type.slug || type.id}`}
                  className="cake-type-card"
                >
                  <div className="cake-type-image">
                    <img src={type.image} alt={type.title} />
                  </div>
                  <div className="cake-type-content">
                    <h3>{type.title}</h3>
                    <p>{type.description}</p>
                    <div className="cake-type-footer">
                      <span className="price-from">À partir de {type.price_from} €{type.price_unit ? ` ${type.price_unit}` : ''}</span>
                      <span className="discover-link">
                        Découvrir
                        <svg viewBox="0 0 24 24" width="18" height="18">
                          <path fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Process */}
      <section className="section process-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Comment ça marche</span>
            <h2>Notre Processus</h2>
          </div>

          {stepsLoading ? (
            <div className="loading-placeholder">Chargement...</div>
          ) : (
            <div className="process-grid">
              {steps.map(item => (
                <div key={item.id || item.step_number} className="process-card">
                  <div className="process-number">{item.step_number}</div>
                  <span className="process-icon">{item.icon}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Ils nous font confiance</span>
            <h2>Témoignages</h2>
          </div>

          <div className="testimonials-grid">
            <blockquote className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p>
                "Le gâteau de mariage était absolument parfait ! Non seulement 
                magnifique, mais délicieux. Tous nos invités en parlent encore."
              </p>
              <footer>
                <strong>Marie & Thomas</strong>
                <span>Mariage - Juin 2024</span>
              </footer>
            </blockquote>

            <blockquote className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p>
                "Al Manara a créé un gâteau licorne incroyable pour les 5 ans 
                de ma fille. Elle était aux anges !"
              </p>
              <footer>
                <strong>Sophie L.</strong>
                <span>Anniversaire enfant</span>
              </footer>
            </blockquote>

            <blockquote className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p>
                "Professionnalisme et créativité au rendez-vous. Notre 
                événement d'entreprise était un succès grâce à leur buffet."
              </p>
              <footer>
                <strong>Jean-Marc D.</strong>
                <span>Event corporate</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Prêt à Créer<br />Votre Gâteau ?</h2>
            <p>
              Contactez-nous pour discuter de votre projet. 
              Consultation et devis gratuits.
            </p>
            <div className="cta-buttons">
              <Link to="/gateaux/devis" className="btn btn-gold btn-lg">
                Demander un devis
              </Link>
              <Link to="/contact" className="btn btn-secondary btn-lg">
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GateauxSurMesure
