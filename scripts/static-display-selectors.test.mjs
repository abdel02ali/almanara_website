import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const globalCss = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8')
const whatsappButton = readFileSync(new URL('../src/components/WhatsAppButton.jsx', import.meta.url), 'utf8')
const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

assert.match(
  globalCss,
  /body\.hide-static-images\s+\[data-static-image="true"\]\s*\{\s*display:\s*none\s*!important;\s*\}/,
  'static image visibility must be scoped to explicit data-static-image markers'
)

const forbiddenStaticImageSelectors = [
  '.product-card',
  '.wedding-item-card',
  '.wedding-type-card',
  '.occasions-home-card',
  '.related-card',
  '.related-article-card'
]

for (const selector of forbiddenStaticImageSelectors) {
  assert.doesNotMatch(
    globalCss,
    new RegExp(`body\\.hide-static-images\\s+[^{}]*${escapeRegex(selector)}`),
    `hide-static-images must not target shared ${selector} cards directly`
  )
}

assert.doesNotMatch(
  globalCss,
  /body\.hide-static-links\s+a\[href(?:\^)?=/,
  'static link visibility must not hide links by href pattern'
)

assert.doesNotMatch(
  whatsappButton,
  /data-static-link=/,
  'WhatsApp is a primary contact channel and must not be hidden as a static link'
)
