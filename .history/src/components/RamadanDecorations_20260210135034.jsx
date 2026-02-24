import { memo, useMemo } from 'react'

// Pre-generate stars once (pure computation, no state needed)
function generateStars(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 5,
    size: Math.random() * 3 + 2
  }))
}

function RamadanDecorations() {
  // Memoize stars so they don't regenerate on re-renders
  // Reduced from 50 to 20 for better performance
  const stars = useMemo(() => generateStars(20), [])

  return (
    <>
      {/* Twinkling Stars - reduced count, use CSS contain */}
      <div className="ramadan-stars" style={{ contain: 'strict' }}>
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              animationDelay: `${star.delay}s`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              willChange: 'opacity, transform'
            }}
          />
        ))}
      </div>

      {/* Crescent Moon */}
      <div className="crescent-moon" style={{ contain: 'layout paint' }}>
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
          <defs>
            <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
            <filter id="moonGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d="M50 5C25 5 5 25 5 50s20 45 45 45c-15-10-25-27-25-45S35 15 50 5z"
            fill="url(#moonGradient)"
            filter="url(#moonGlow)"
          />
          <circle cx="75" cy="25" r="3" fill="#FFD700" opacity="0.7" />
          <circle cx="85" cy="40" r="2" fill="#FFD700" opacity="0.5" />
        </svg>
      </div>

      {/* Left Lantern */}
      <div className="lantern lantern-left" style={{ contain: 'layout paint' }}>
        <svg width="60" height="100" viewBox="0 0 60 100" fill="none">
          <defs>
            <linearGradient id="lanternGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700"/>
              <stop offset="50%" stopColor="#D4AF37"/>
              <stop offset="100%" stopColor="#B8860B"/>
            </linearGradient>
            <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <line x1="30" y1="0" x2="30" y2="15" stroke="url(#lanternGold)" strokeWidth="2"/>
          <path d="M20 15 L40 15 L38 20 L22 20 Z" fill="url(#lanternGold)"/>
          <path d="M22 20 Q15 50 22 80 L38 80 Q45 50 38 20 Z" fill="url(#lanternGold)" fillOpacity="0.3" stroke="url(#lanternGold)" strokeWidth="1.5"/>
          <ellipse cx="30" cy="50" rx="10" ry="25" fill="url(#lanternGlow)"/>
          <path d="M22 80 L38 80 L35 90 L25 90 Z" fill="url(#lanternGold)"/>
        </svg>
      </div>

      {/* Right Lantern */}
      <div className="lantern lantern-right" style={{ contain: 'layout paint' }}>
        <svg width="50" height="85" viewBox="0 0 60 100" fill="none">
          <defs>
            <linearGradient id="lanternGold2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700"/>
              <stop offset="50%" stopColor="#D4AF37"/>
              <stop offset="100%" stopColor="#B8860B"/>
            </linearGradient>
            <radialGradient id="lanternGlow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.5"/>
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0"/>
            </radialGradient>
          </defs>
          <line x1="30" y1="0" x2="30" y2="15" stroke="url(#lanternGold2)" strokeWidth="2"/>
          <ellipse cx="30" cy="18" rx="12" ry="4" fill="url(#lanternGold2)"/>
          <ellipse cx="30" cy="50" rx="15" ry="30" fill="url(#lanternGold2)" fillOpacity="0.25" stroke="url(#lanternGold2)" strokeWidth="1.5"/>
          <ellipse cx="30" cy="50" rx="8" ry="20" fill="url(#lanternGlow2)"/>
          <ellipse cx="30" cy="82" rx="8" ry="3" fill="url(#lanternGold2)"/>
          <path d="M30 85 L30 95" stroke="url(#lanternGold2)" strokeWidth="2"/>
          <circle cx="30" cy="97" r="3" fill="url(#lanternGold2)"/>
        </svg>
      </div>
    </>
  )
}

export default memo(RamadanDecorations)
