import { useState, useRef, useEffect, memo } from 'react'

/**
 * Optimized image component with:
 * - Native lazy loading
 * - IntersectionObserver fallback
 * - Blur-up placeholder
 * - Responsive srcset for Unsplash images
 * - Fade-in animation on load
 */
function OptimizedImage({ 
  src, 
  alt = '', 
  className = '', 
  style = {},
  width,
  height,
  priority = false,  // true = above the fold, load immediately
  sizes = '100vw',
  objectFit = 'cover'
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef(null)

  // IntersectionObserver for lazy loading
  useEffect(() => {
    if (priority || isInView) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' } // Start loading 200px before entering viewport
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority, isInView])

  // Generate srcset for Unsplash images
  const generateSrcSet = (url) => {
    if (!url || !url.includes('unsplash.com')) return undefined
    
    const baseUrl = url.split('?')[0]
    const widths = [400, 640, 800, 1024, 1280, 1920]
    return widths
      .map(w => `${baseUrl}?w=${w}&q=75&auto=format&fit=crop ${w}w`)
      .join(', ')
  }

  // Generate optimized src (WebP via Unsplash auto=format)
  const getOptimizedSrc = (url) => {
    if (!url) return url
    if (url.includes('unsplash.com')) {
      const baseUrl = url.split('?')[0]
      return `${baseUrl}?w=800&q=75&auto=format&fit=crop`
    }
    return url
  }

  // Low quality placeholder for Unsplash
  const getPlaceholder = (url) => {
    if (!url || !url.includes('unsplash.com')) return undefined
    const baseUrl = url.split('?')[0]
    return `${baseUrl}?w=20&q=10&blur=10&auto=format&fit=crop`
  }

  const srcSet = generateSrcSet(src)
  const optimizedSrc = getOptimizedSrc(src)
  const placeholder = getPlaceholder(src)

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    ...style
  }

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit,
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.4s ease',
    ...(width && { width }),
    ...(height && { height })
  }

  const placeholderStyle = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit,
    filter: 'blur(20px)',
    transform: 'scale(1.1)',
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.4s ease',
    pointerEvents: 'none'
  }

  return (
    <div ref={imgRef} className={className} style={containerStyle}>
      {/* Blur placeholder */}
      {placeholder && !isLoaded && (
        <img 
          src={placeholder} 
          alt="" 
          style={placeholderStyle}
          aria-hidden="true"
          decoding="async"
        />
      )}

      {/* Actual image - only load when in view */}
      {isInView && (
        <img
          src={optimizedSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          style={imgStyle}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onLoad={() => setIsLoaded(true)}
        />
      )}

      {/* Fallback background color while loading */}
      {!isLoaded && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--color-bg-elevated, #2D2D2D)',
            zIndex: -1
          }}
          aria-hidden="true"
        />
      )}
    </div>
  )
}

export default memo(OptimizedImage)
