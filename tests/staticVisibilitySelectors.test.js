import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import assert from 'node:assert/strict'

const globalCss = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8')

test('static visibility selectors are explicitly opt-in', () => {
  assert.match(globalCss, /body\.hide-static-links a\[data-static-link="true"\]/)
  assert.match(globalCss, /body\.hide-static-images \[data-static-(?:image|card)="true"\]/)

  assert.doesNotMatch(globalCss, /body\.hide-static-links a\[href/)
  assert.doesNotMatch(globalCss, /body\.hide-static-images \.(?:product-card|wedding-item-card|wedding-type-card|related-card)/)
})
