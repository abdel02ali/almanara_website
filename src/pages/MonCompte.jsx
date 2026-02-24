import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './MonCompte.css'

function MonCompte() {
  const navigate = useNavigate()
  const { user, logout, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState('orders')

  if (!isAuthenticated) {
    return (
      <div className="mon-compte-page">
        <div className="not-logged">
          <span className="not-logged-icon">⊘</span>
          <h1>Accès réservé</h1>
          <p>Connectez-vous pour accéder à votre espace client.</p>
          <Link to="/connexion" className="btn btn-gold btn-lg">
            Se connecter
          </Link>
        </div>
      </div>
    )
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const tabs = [
    { id: 'orders', label: 'Mes commandes', icon: '📦' },
    { id: 'favorites', label: 'Mes favoris', icon: '❤️' },
    { id: 'info', label: 'Mes informations', icon: '👤' }
  ]

  return (
    <div className="mon-compte-page">
      <header className="compte-header">
        <div className="container">
          <div className="compte-welcome">
            <div className="avatar">
              <span>{user?.name?.charAt(0) || 'M'}</span>
            </div>
            <div>
              <h1>Bonjour, {user?.name} !</h1>
              <p>Bienvenue dans votre espace client</p>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="compte-layout">
            <aside className="compte-sidebar">
              <nav className="compte-nav">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="nav-icon">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
                <button className="nav-item logout" onClick={handleLogout}>
                  <span className="nav-icon">→</span>
                  Déconnexion
                </button>
              </nav>
            </aside>

            <main className="compte-content">
              {activeTab === 'orders' && (
                <div className="tab-content">
                  <h2>Mes commandes</h2>
                  
                  {user?.orders?.length > 0 ? (
                    <div className="orders-list">
                      {user.orders.map(order => (
                        <div key={order.id} className="order-card">
                          <div className="order-header">
                            <div>
                              <span className="order-id">{order.id}</span>
                              <span className="order-date">{order.date}</span>
                            </div>
                            <span className={`order-status status-${order.status.toLowerCase().replace(' ', '-')}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="order-footer">
                            <span className="order-total">{order.total.toFixed(2)} DH</span>
                            <button className="btn btn-sm btn-secondary">
                              Voir détails
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <span className="empty-icon">▢</span>
                      <h3>Aucune commande</h3>
                      <p>Vous n'avez pas encore passé de commande.</p>
                      <Link to="/boutique" className="btn btn-primary">
                        Découvrir nos produits
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'favorites' && (
                <div className="tab-content">
                  <h2>Mes favoris</h2>
                  
                  {user?.favorites?.length > 0 ? (
                    <div className="favorites-grid">
                      {/* Products would be mapped here */}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <span className="empty-icon">♡</span>
                      <h3>Aucun favori</h3>
                      <p>Ajoutez des produits à vos favoris pour les retrouver facilement.</p>
                      <Link to="/boutique" className="btn btn-primary">
                        Parcourir la boutique
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'info' && (
                <div className="tab-content">
                  <h2>Mes informations</h2>
                  
                  <form className="info-form">
                    <div className="form-section">
                      <h3>Informations personnelles</h3>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Prénom</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            defaultValue={user?.name?.split(' ')[0]}
                          />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Nom</label>
                          <input 
                            type="text" 
                            className="form-input" 
                            defaultValue={user?.name?.split(' ')[1] || ''}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email</label>
                        <input 
                          type="email" 
                          className="form-input" 
                          defaultValue={user?.email}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Téléphone</label>
                        <input 
                          type="tel" 
                          className="form-input" 
                          placeholder="06 12 34 56 78"
                        />
                      </div>
                    </div>

                    <div className="form-section">
                      <h3>Changer le mot de passe</h3>
                      <div className="form-group">
                        <label className="form-label">Mot de passe actuel</label>
                        <input type="password" className="form-input" />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label className="form-label">Nouveau mot de passe</label>
                          <input type="password" className="form-input" />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Confirmer</label>
                          <input type="password" className="form-input" />
                        </div>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn btn-gold">
                        Enregistrer les modifications
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MonCompte
