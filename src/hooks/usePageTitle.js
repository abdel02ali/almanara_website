import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const SITE_NAME = 'Al Manara'

/**
 * Sets document.title for SEO and browser tab display.
 * Usage: usePageTitle('shop.pageTitle')  — uses i18n key
 *        usePageTitle('My Page', true)   — uses raw string
 */
export function usePageTitle(titleKeyOrRaw, isRaw = false) {
  const { t } = useTranslation()

  useEffect(() => {
    const title = isRaw ? titleKeyOrRaw : t(titleKeyOrRaw, '')
    document.title = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    return () => { document.title = SITE_NAME }
  }, [titleKeyOrRaw, isRaw, t])
}

