import { useEffect, useState } from 'react'
import * as api from '../services/api'

const DEFAULT_SETTINGS = {
  show_static_images: true,
  show_static_links: true
}
const STORAGE_KEY = 'siteDisplaySettingsCache'

function getCachedSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (typeof parsed?.show_static_images === 'boolean' && typeof parsed?.show_static_links === 'boolean') {
      return parsed
    }
  } catch (_) {
    // ignore cache parsing issues
  }
  return null
}

export function useSiteDisplaySettings() {
  const [settings, setSettings] = useState(() => getCachedSettings() || DEFAULT_SETTINGS)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const data = await api.getSiteDisplaySettings()
        if (!mounted || !data) return
        const nextSettings = {
          show_static_images: data.show_static_images !== false,
          show_static_links: data.show_static_links !== false
        }
        setSettings(nextSettings)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSettings))
      } catch (err) {
        // Keep cached/default settings when backend is unavailable
      } finally {
        if (mounted) setLoading(false)
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

  return {
    settings,
    loading,
    showStaticImages: settings.show_static_images,
    showStaticLinks: settings.show_static_links
  }
}

