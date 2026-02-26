import { memo } from 'react'
import './WhatsAppButton.css'

const PHONE = '212706095907' // Morocco format: 212 + number without leading 0
const MESSAGE = encodeURIComponent('مرحبا، أريد الاستفسار عن منتجاتكم') // "Hello, I'd like to inquire about your products"

function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      data-static-link="true"
      aria-label="WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="currentColor">
        <path d="M16.004 0h-.008C7.174 0 .004 7.176.004 16.004c0 3.5 1.13 6.744 3.05 9.378L1.06 31.2l6.05-1.94a15.91 15.91 0 008.894 2.696C24.826 31.956 32 24.824 32 16.004 32 7.176 24.826 0 16.004 0zm9.536 22.612c-.396 1.116-2.328 2.076-3.21 2.172-.882.1-1.696.396-5.712-1.188-4.836-1.908-7.886-6.904-8.124-7.224-.234-.316-1.932-2.568-1.932-4.896 0-2.328 1.224-3.474 1.66-3.948.432-.474.948-.594 1.26-.594.316 0 .63.004.906.016.29.016.68-.108 1.062.812.396.948 1.344 3.276 1.464 3.516.12.234.198.516.038.828-.156.316-.24.516-.474.792-.234.276-.494.618-.708.828-.234.234-.48.486-.204.948.276.474 1.224 2.016 2.628 3.264 1.812 1.608 3.338 2.106 3.812 2.34.474.234.75.198 1.026-.12.276-.316 1.182-1.38 1.5-1.854.316-.474.636-.396 1.068-.234.432.156 2.76 1.302 3.234 1.536.474.234.792.354.912.546.12.198.12 1.116-.276 2.232z"/>
      </svg>
      <span className="whatsapp-tooltip">WhatsApp</span>
    </a>
  )
}

export default memo(WhatsAppButton)

