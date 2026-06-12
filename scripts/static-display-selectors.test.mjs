import { readFileSync } from 'node:fs'
import { relative, resolve } from 'node:path'

const root = resolve(new URL('..', import.meta.url).pathname)

function read(path) {
  return readFileSync(resolve(root, path), 'utf8')
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

const globalCss = read('src/styles/global.css')
const whatsappButton = read('src/components/WhatsAppButton.jsx')

const forbiddenCssFragments = [
  'body.hide-static-links a[href="#"]',
  'body.hide-static-links a[href^="http://"]',
  'body.hide-static-links a[href^="https://"]',
  'body.hide-static-images .product-card',
  'body.hide-static-images .wedding-item-card',
  'body.hide-static-images .wedding-type-card',
  'body.hide-static-images .related-article-card',
  'body.hide-static-images .related-card'
]

for (const fragment of forbiddenCssFragments) {
  assert(
    !globalCss.includes(fragment),
    `Static display CSS must not hide broad live-content selector: ${fragment}`
  )
}

assert(
  globalCss.includes('body.hide-static-links a[data-static-link="true"]'),
  'Static link visibility must be controlled by explicit data-static-link markers.'
)

assert(
  globalCss.includes('body.hide-static-images [data-static-image="true"]'),
  'Static image visibility must be controlled by explicit data-static-image markers.'
)

assert(
  !whatsappButton.includes('data-static-link'),
  `${relative(root, resolve(root, 'src/components/WhatsAppButton.jsx'))} must remain visible when static links are hidden.`
)
