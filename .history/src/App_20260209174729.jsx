import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

// Pages
import Home from './pages/Home'
import Boutique from './pages/Boutique'
import BoutiqueCategory from './pages/BoutiqueCategory'
import GateauxSurMesure from './pages/GateauxSurMesure'
import GateauxCategory from './pages/GateauxCategory'
import Devis from './pages/Devis'
import Panier from './pages/Panier'
import Validation from './pages/Validation'
import Confirmation from './pages/Confirmation'
import APropos from './pages/APropos'
import Blog from './pages/Blog'
import BlogArticle from './pages/BlogArticle'
import Contact from './pages/Contact'
import MonCompte from './pages/MonCompte'
import Login from './pages/Login'

function App() {
  return (
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
        
        {/* Commande en ligne (désactivé, fichiers conservés) */}
        {/* <Route path="panier" element={<Panier />} /> */}
        {/* <Route path="commande/validation" element={<Validation />} /> */}
        {/* <Route path="commande/confirmation/:id" element={<Confirmation />} /> */}
        
        {/* À propos (désactivé, fichier conservé) */}
        {/* <Route path="a-propos" element={<APropos />} /> */}
        
        {/* Blog / Actualités */}
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogArticle />} />
        
        {/* Contact */}
        <Route path="contact" element={<Contact />} />
        
        {/* Espace Client (désactivé, fichiers conservés) */}
        {/* <Route path="mon-compte" element={<MonCompte />} /> */}
        {/* <Route path="connexion" element={<Login />} /> */}
      </Route>
    </Routes>
  )
}

export default App

