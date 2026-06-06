import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const HouseCard = ({ house, index }) => {
  const cardRef   = useRef(null)
  const sigilRef  = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Staggered entrance via IntersectionObserver
  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), index * 120)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  // Sigil tilt on hover
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 14
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 14
    if (sigilRef.current) {
      sigilRef.current.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.06)`
    }
  }
  const handleMouseLeave = () => {
    if (sigilRef.current) sigilRef.current.style.transform = ''
    setHovered(false)
  }

  return (
    <Link
      to={`/houses/${house.id}`}
      style={{ textDecoration: 'none' }}
    >
      <div
        ref={cardRef}
        className={`house-card house-card--${house.id}`}
        style={{ '--accent': house.accent, '--border': house.borderColor, background: house.bg }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
      {/* Corner ornaments */}
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />

      {/* Glow pulse on hover */}
      <div className="card-glow" />

      {/* Sigil */}
      <div ref={sigilRef} className="house-sigil-wrap">
        {(!imgError && house.sigil_url && house.sigil_url !== "null") ? (
          <img
            className="house-sigil-img"
            src={house.sigil_url.startsWith('http') ? house.sigil_url : `${import.meta.env.BASE_URL}${house.sigil_url}`}
            alt={house.name}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="house-sigil-fallback" style={{ fontSize: '64px', color: house.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>{house.sigil}</div>
        )}
        <div className="sigil-ring" />
      </div>

      {/* Static content */}
      <div className={`house-content ${hovered ? 'content-hidden' : ''}`}>
        <p className="house-region">{house.region}</p>
        <div className="house-divider">
          <span className="divider-line" />
          <span className="divider-diamond" />
          <span className="divider-line" />
        </div>
        <h2 className="house-name">HOUSE<br />{house.name}</h2>
        <p className="house-seat">{house.seat}</p>
        <p className="house-sigil-label">{house.sigil}</p>
      </div>

      {/* Hover reveal: words + description */}
      <div className={`house-hover-content ${hovered ? 'hover-visible' : ''}`}>
        <p className="hover-words">{house.words}</p>
        <div className="house-divider hover-divider">
          <span className="divider-line" />
          <span className="divider-diamond" />
          <span className="divider-line" />
        </div>
        <h2 className="hover-name">HOUSE {house.name}</h2>
        <p className="hover-desc">{house.description}</p>
      </div>

        {/* Bottom accent bar */}
        <div className="card-accent-bar" />
      </div>
    </Link>
  )
}

export default HouseCard