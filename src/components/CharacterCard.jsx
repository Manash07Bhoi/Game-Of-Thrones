import { useEffect, useRef } from 'react'
import './CharacterCard.css'

const CharacterCard = ({ character, index }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), index * 100)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div ref={cardRef} className="char-card">
      <div className="char-card-inner">
        <div className="char-card-front">
          <div className="char-image-wrap">
            <div className="char-image-fallback" style={{ background: character.bg }}>
               <span className="char-sigil-icon">{character.sigilIcon}</span>
            </div>
            <div className="char-vignette" />
          </div>
          <div className="char-info">
            <p className="char-house">{character.house}</p>
            <h3 className="char-name">{character.name}</h3>
            <p className="char-title">{character.title}</p>
          </div>
        </div>

        <div className="char-card-back" style={{ borderColor: character.accent }}>
          <div className="char-back-content">
            <span className="char-quote">"{character.quote}"</span>
            <div className="got-divider" style={{ margin: '16px 0' }}>
              <span className="got-divider-line" />
              <span className="got-divider-diamond" />
              <span className="got-divider-line right" />
            </div>
            <p className="char-desc">{character.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterCard