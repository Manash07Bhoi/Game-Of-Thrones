import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './CharacterCard.css'

const CharacterCard = ({ character, index }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Modulo the index to prevent massive animation delays on paginated lists
          const staggerDelay = (index % 12) * 80;
          setTimeout(() => el.classList.add('visible'), staggerDelay)
          obs.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <Link to={`/characters/${character.id}`} style={{ textDecoration: 'none' }}>
      <div ref={cardRef} className="char-card">
        <div className="char-card-inner">
        <div className="char-card-front">
          <div className="char-image-wrap">
            {character.image ? (
              <img src={character.image} alt={character.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div className="char-image-fallback premium-fallback" style={{ background: character.bg }}>
                 <div className="premium-fallback-content">
                   <span className="premium-fallback-initials" style={{ color: character.accent }}>{character.initials}</span>
                   <span className="premium-fallback-sigil">{character.sigilIcon}</span>
                 </div>
              </div>
            )}
            <div className="char-vignette" />
          </div>
          <div className="char-info">
            <p className="char-house" style={{ color: character.accent }}>{character.house}</p>
            <h3 className="char-name">{character.name}</h3>
            <p className="char-title">{character.fullTitle || (character.isAlive === false ? 'Deceased' : 'Unknown Status')}</p>
          </div>
        </div>

        <div className="char-card-back" style={{ borderColor: character.accent }}>
          <div className="char-back-content">
            <span className="char-full-title">{character.fullTitle}</span>
            <span className="char-allegiance"><strong>House:</strong> {character.house}</span>
            <span className="char-allegiance"><strong>Type:</strong> {character.characterType}</span>
            <span className="char-status"><strong>Status:</strong> {character.isAlive === false ? 'Deceased' : 'Alive/Unknown'}</span>
            <span className="char-status"><strong>Dialogue:</strong> {character.spokenLineCount} Lines</span>

            <div className="got-divider" style={{ margin: '12px 0' }}>
              <span className="got-divider-line" />
              <span className="got-divider-diamond" />
              <span className="got-divider-line right" />
            </div>

            <p className="char-bio">{character.biography}</p>

            <div className="char-extra">
              <strong>Key Achievements:</strong>
              <ul>
                {character.achievements.map((ach, idx) => <li key={idx}>{ach}</li>)}
              </ul>
            </div>

            {character.relationships && (
              <div className="char-extra" style={{ marginTop: '12px' }}>
                <strong>Relationships:</strong>
                <ul>
                  {character.relationships.map((rel, idx) => <li key={idx}>{rel}</li>)}
                </ul>
              </div>
            )}

            <div className="got-divider" style={{ margin: '12px 0' }}>
              <span className="got-divider-diamond" />
            </div>

              <span className="char-quote">"{character.quote}"</span>

              <div style={{ marginTop: '16px', color: 'var(--gold-dim)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Click to view profile &rarr;</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CharacterCard