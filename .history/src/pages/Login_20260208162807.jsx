import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'
import './Login.css'

function Login() {
  const { t } = useTranslation()
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
      setError(t('login.passwordMismatch'))
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
            <h1>{isLogin ? t('login.login') : t('login.createAccount')}</h1>
            <p>
              {isLogin ? t('login.loginDesc') : t('login.registerDesc')}
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label className="form-label">{t('login.fullName')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">{t('login.email')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">{t('login.password')}</label>
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
                <label className="form-label">{t('login.confirmPassword')}</label>
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
                  <span>{t('login.rememberMe')}</span>
                </label>
                <a href="#" className="forgot-link">{t('login.forgotPassword')}</a>
              </div>
            )}

            <button type="submit" className="btn btn-gold btn-lg btn-block">
              {isLogin ? t('login.signIn') : t('login.signUp')}
            </button>
          </form>

          <div className="login-divider">
            <span>{t('login.or')}</span>
          </div>

          <div className="social-login">
            <button className="social-btn google">
              <span>G</span>
              {t('login.google')}
            </button>
            <button className="social-btn facebook">
              <span>f</span>
              {t('login.facebook')}
            </button>
          </div>

          <div className="login-switch">
            {isLogin ? (
              <p>
                {t('login.noAccount')}{' '}
                <button onClick={() => setIsLogin(false)}>{t('login.register')}</button>
              </p>
            ) : (
              <p>
                {t('login.hasAccount')}{' '}
                <button onClick={() => setIsLogin(true)}>{t('login.signIn')}</button>
              </p>
            )}
          </div>
        </div>

        <div className="login-benefits">
          <h2>{t('login.benefitsTitle')}</h2>
          <ul>
            <li>
              <span className="benefit-icon">▢</span>
              <div>
                <strong>{t('login.benefit1Title')}</strong>
                <span>{t('login.benefit1Desc')}</span>
              </div>
            </li>
            <li>
              <span className="benefit-icon">↯</span>
              <div>
                <strong>{t('login.benefit2Title')}</strong>
                <span>{t('login.benefit2Desc')}</span>
              </div>
            </li>
            <li>
              <span className="benefit-icon">♡</span>
              <div>
                <strong>{t('login.benefit3Title')}</strong>
                <span>{t('login.benefit3Desc')}</span>
              </div>
            </li>
            <li>
              <span className="benefit-icon">★</span>
              <div>
                <strong>{t('login.benefit4Title')}</strong>
                <span>{t('login.benefit4Desc')}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login
