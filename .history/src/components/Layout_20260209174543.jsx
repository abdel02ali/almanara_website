import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import RamadanDecorations from './RamadanDecorations'
import ThemeSwitcher from './ThemeSwitcher'
import { useTheme } from '../context/ThemeContext'

function Layout() {
  const { isRamadan } = useTheme()

  return (
    <div className="layout">
      {/* Theme Switcher Button */}
      <ThemeSwitcher />
      
      {/* Ramadan Decorations - Only show when Ramadan theme active */}
      {isRamadan && <RamadanDecorations />}
      
      <Navbar />
      
      {/* Ramadan Banner - Only show when Ramadan theme active */}
      {isRamadan && (
        <div className="ramadan-banner">
          <div className="container">
            <h3>رمضان مبارك - Ramadan Mubarak</h3>
            <p>Découvrez nos pâtisseries traditionnelles pour l'Iftar et le Suhoor</p>
          </div>
        </div>
      )}
      
      <main className={`main-content ${isRamadan ? 'has-banner' : ''}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
