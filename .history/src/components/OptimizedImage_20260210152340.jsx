import { memo } from 'react'

/**
 * Optimized image component:
 * - Native lazy loading via loading="lazy"
 * - Responsive srcset for Unsplash images
 * - No wrapper div — renders a plain <img> to avoid layout issues
 */
function OptimizedImage({ 
  src, 
  alt = '', 
  className = '', 
  style = {},
  priority = false,
  sizes = '100vw',
  objectFit = 'cover',
  // fill prop is ignored now — CSS on the className handles positioning
  fill,
  ...rest
}) {
  // Generate srcset for Unsplash images
  const generateSrcSet = (url) => {
    if (!url || !url.includes('unsplash.com')) return undefined
    const baseUrl = url.split('?')[0]
    return [400, 640, 800, 1024, 1280, 1920]
      .map(w => `${baseUrl}?w=${w}&q=75&auto=format&fit=crop ${w}w`)
      .join(', ')
  }

  // Optimize Unsplash URLs
  const getOptimizedSrc = (url) => {
    if (!url) return url
    if (url.includes('unsplash.com')) {
      return url.split('?')[0] + '?w=800&q=75&auto=format&fit=crop'
    }
    return url
  }

  return (
    <img
      src={getOptimizedSrc(src)}
      srcSet={generateSrcSet(src)}
      sizes={sizes}
      alt={alt}
      className={className}
      style={{ objectFit, ...style }}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      {...rest}
    />
  )
}

export default memo(OptimizedImage)
