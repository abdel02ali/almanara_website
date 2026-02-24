import { useState, useRef, useEffect, memo } from 'react'

/**
 * Optimized image component with:
 * - Native lazy loading
 * - IntersectionObserver for deferred loading
 * - Responsive srcset for Unsplash images
 *
 * Props:
 * - fill: position: absolute + inset: 0 (for background/hero images)
 * - priority: load immediately (above-the-fold images)
 */
function OptimizedImage({ 
  src, 
  alt = '', 
  className = '', 
  style = {},
  fill = false,
  priority = false,
  sizes = '100vw',
  objectFit = 'cover'
}) {
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef(null)

  useEffect(() => {
    if (priority || isInView) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [priority, isInView])

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

  const srcSet = generateSrcSet(src)
  const optimizedSrc = getOptimizedSrc(src)

  const containerStyle = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden', ...style }
    : { width: '100%', height: '100%', overflow: 'hidden', ...style }

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit,
    display: 'block'
  }

  return (
    <div ref={imgRef} className={className} style={containerStyle}>
      {isInView ? (
        <img
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          style={imgStyle}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      ) : (
        <div 
          style={{ width: '100%', height: '100%', background: '#2D2D2D' }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default memo(OptimizedImage)
