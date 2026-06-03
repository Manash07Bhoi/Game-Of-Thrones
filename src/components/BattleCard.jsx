import { useEffect, useRef } from 'react'

const BattleCard = ({ battle, index }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), index * 150)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index])

  return (
    <div ref={cardRef} className="battle-card" style={{
      opacity: 0,
      transform: 'translateY(30px)',
      transition: 'all 0.8s ease',
      border: '1px solid var(--gold-dim)',
      padding: '32px',
      background: 'linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,0.9) 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '24px', marginBottom: '8px' }}>{battle.name}</h3>
        <p style={{ fontFamily: 'Cinzel', fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>{battle.location} &bull; {battle.year}</p>
        <p style={{ fontFamily: 'IM Fell English', fontStyle: 'italic', color: 'var(--ash)', fontSize: '15px', lineHeight: '1.6' }}>{battle.description}</p>
      </div>
      <div style={{
        position: 'absolute',
        top: '-20%',
        right: '-10%',
        fontSize: '180px',
        opacity: 0.03,
        color: 'var(--gold)',
        pointerEvents: 'none',
        transform: 'rotate(15deg)'
      }}>
        ⚔
      </div>
    </div>
  )
}

export default BattleCard