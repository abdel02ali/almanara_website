import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Critical: Home loads eagerly (landing page)
import Home from './pages/Home'

// Lazy-loaded pages — downloaded only when navigated to
const Boutique = lazy(() => import('./pages/Boutique'))
const BoutiqueCategory = lazy(() => import('./pages/BoutiqueCategory'))
const GateauxSurMesure = lazy(() => import('./pages/GateauxSurMesure'))
const GateauxCategory = lazy(() => import('./pages/GateauxCategory'))
const Devis = lazy(() => import('./pages/Devis'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogArticle = lazy(() => import('./pages/BlogArticle'))
const Contact = lazy(() => import('./pages/Contact'))
const Mariages = lazy(() => import('./pages/Occasions'))

// Loading fallback
function PageLoader() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      color: 'var(--color-text-muted)'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: 40,
          height: 40,
          border: '2px solid var(--color-bg-elevated)',
          borderTopColor: 'var(--color-rose-gold)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 1rem'
        }} />
      </div>
    </div>
  )
}

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Accueil */}
        <Route index element={<Home />} />
        
        {/* Menu & Boutique */}
        <Route path="boutique" element={<Boutique />} />
        <Route path="boutique/:category" element={<BoutiqueCategory />} />
        
        {/* Gâteaux sur mesure */}
        <Route path="gateaux-sur-mesure" element={<GateauxSurMesure />} />
        <Route path="gateaux/:type" element={<GateauxCategory />} />
        <Route path="gateaux/devis" element={<Devis />} />
        
        {/* Blog / Actualités */}
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogArticle />} />
        
        {/* Mariages */}
        <Route path="mariages" element={<Mariages />} />
        
        {/* Contact */}
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
    </Suspense>
  )
}

export default App
