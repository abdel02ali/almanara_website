import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas')
      return
    }

    if (isLogin) {
      const success = login(formData.email, formData.password)
      if (success) {
        navigate('/mon-compte')
      }
    } else {
      const success = register(formData.name, formData.email, formData.password)
      if (success) {
        navigate('/mon-compte')
      }
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <span className="login-icon">M</span>
            <h1>{isLogin ? 'Connexion' : 'Créer un compte'}</h1>
            <p>
              {isLogin 
                ? 'Accédez à votre espace client Al Manara'
                : 'Rejoignez la communauté Al Manara'
              }
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Marie Dupont"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="marie@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label className="form-label">Confirmer le mot de passe</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="••••••••"
                  required
                />
              </div>
            )}

            {error && <p className="form-error">{error}</p>}

            {isLogin && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Se souvenir de moi</span>
                </label>
                <a href="#" className="forgot-link">Mot de passe oublié ?</a>
              </div>
            )}

            <button type="submit" className="btn btn-gold btn-lg btn-block">
              {isLogin ? 'Se connecter' : 'Créer mon compte'}
            </button>
          </form>

          <div className="login-divider">
            <span>ou</span>
          </div>

          <div className="social-login">
            <button className="social-btn google">
              <span>G</span>
              Continuer avec Google
            </button>
            <button className="social-btn facebook">
              <span>f</span>
              Continuer avec Facebook
            </button>
          </div>

          <div className="login-switch">
            {isLogin ? (
              <p>
                Pas encore de compte ?{' '}
                <button onClick={() => setIsLogin(false)}>S'inscrire</button>
              </p>
            ) : (
              <p>
                Déjà un compte ?{' '}
                <button onClick={() => setIsLogin(true)}>Se connecter</button>
              </p>
            )}
          </div>
        </div>

        <div className="login-benefits">
          <h2>Les avantages<br />de votre compte</h2>
          <ul>
            <li>
              <span className="benefit-icon">▢</span>
              <div>
                <strong>Suivi de commandes</strong>
                <span>Consultez l'historique de vos achats</span>
              </div>
            </li>
            <li>
              <span className="benefit-icon">↯</span>
              <div>
                <strong>Commande express</strong>
                <span>Vos informations pré-remplies</span>
              </div>
            </li>
            <li>
              <span className="benefit-icon">♡</span>
              <div>
                <strong>Favoris</strong>
                <span>Sauvegardez vos produits préférés</span>
              </div>
            </li>
            <li>
              <span className="benefit-icon">★</span>
              <div>
                <strong>Offres exclusives</strong>
                <span>Accédez aux promotions membres</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login
