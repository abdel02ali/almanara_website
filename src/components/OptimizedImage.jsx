import { memo } from 'react'

/**
 * Optimized image component:
 * - Native lazy loading
 * - Responsive srcset for Unsplash images
 *
 * When className is provided: renders <div className><img/></div>
 *   → CSS selectors like .className img { } work correctly
 *
 * When no className: renders plain <img/>
 *   → CSS selectors like .parent img { } work correctly
 */
function OptimizedImage({ 
  src, 
  alt = '', 
  className = '', 
  style,
  priority = false,
  sizes = '100vw',
  // fill prop accepted but not used (kept for API compat)
  fill,
  objectFit,
  ...rest
}) {
  const generateSrcSet = (url) => {
    if (!url || !url.includes('unsplash.com')) return undefined
    const baseUrl = url.split('?')[0]
    return [400, 640, 800, 1024, 1280, 1920]
      .map(w => `${baseUrl}?w=${w}&q=75&auto=format&fit=crop ${w}w`)
      .join(', ')
  }

  const getOptimizedSrc = (url) => {
    if (!url) return url
    if (url.includes('unsplash.com')) {
      return url.split('?')[0] + '?w=800&q=75&auto=format&fit=crop'
    }
    return url
  }

  const imgProps = {
    src: getOptimizedSrc(src),
    srcSet: generateSrcSet(src),
    sizes,
    alt,
    loading: priority ? 'eager' : 'lazy',
    decoding: priority ? 'sync' : 'async',
    fetchPriority: priority ? 'high' : 'auto',
  }

  // With className: use wrapper div so CSS ".className img" selectors work
  if (className) {
    return (
      <div className={className} style={style}>
        <img {...imgProps} />
      </div>
    )
  }

  // Without className: plain img so CSS ".parent img" selectors work
  return <img {...imgProps} style={style} />
}

export default memo(OptimizedImage)
