import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import { useSiteDisplaySettings } from '../hooks'

function Layout() {
  const { showStaticImages, showStaticLinks } = useSiteDisplaySettings()

  useEffect(() => {
    document.body.classList.toggle('hide-static-images', !showStaticImages)
    document.body.classList.toggle('hide-static-links', !showStaticLinks)

    return () => {
      document.body.classList.remove('hide-static-images')
      document.body.classList.remove('hide-static-links')
    }
  }, [showStaticImages, showStaticLinks])

  return (
    <div className="layout">
      <Navbar />
      
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default Layout
