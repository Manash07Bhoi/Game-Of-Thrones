import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

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
    <Link to={`/battles/${battle.id}`} style={{ textDecoration: 'none' }}>
      <div ref={cardRef} className="battle-card" style={{
        opacity: 0,
        transform: 'translateY(30px)',
        transition: 'all 0.8s ease',
        border: '1px solid var(--gold-dim)',
        padding: '32px',
        background: 'linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(5,5,5,0.9) 100%)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}>
        <div style={{ position: 'relative', zIndex: 2, flex: 1 }}>
        <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '24px', marginBottom: '8px' }}>{battle.name}</h3>
        <p style={{ fontFamily: 'Cinzel', fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '20px' }}>{battle.location} &bull; {battle.year}</p>
        <p style={{ fontFamily: 'IM Fell English', fontStyle: 'italic', color: 'var(--ash)', fontSize: '15px', lineHeight: '1.6', marginBottom: '16px' }}>{battle.background}</p>

        {battle.commanders && battle.commanders.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontFamily: 'Cinzel', fontSize: '9px', color: 'var(--gold)', textTransform: 'uppercase' }}>Commanders: </span>
            <span style={{ fontFamily: 'IM Fell English', fontSize: '13px', color: 'var(--parchment)', textTransform: 'capitalize' }}>{battle.commanders.join(', ')}</span>
          </div>
        )}

        {battle.participants && battle.participants.length > 0 && (
          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontFamily: 'Cinzel', fontSize: '9px', color: 'var(--gold)', textTransform: 'uppercase' }}>Participants: </span>
            <span style={{ fontFamily: 'IM Fell English', fontSize: '13px', color: 'var(--ash)', textTransform: 'capitalize' }}>{battle.participants.join(', ')}</span>
          </div>
        )}

        {battle.outcome && (
          <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(201, 168, 76, 0.05)', borderLeft: '2px solid var(--gold)' }}>
            <span style={{ fontFamily: 'Cinzel', fontSize: '10px', color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Outcome</span>
            <span style={{ fontFamily: 'IM Fell English', fontSize: '14px', color: 'var(--ash)' }}>{battle.outcome}</span>
          </div>
        )}

        {battle.significance && (
          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontFamily: 'Cinzel', fontSize: '9px', color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Strategic Significance</span>
            <span style={{ fontFamily: 'IM Fell English', fontSize: '13px', color: 'var(--ash)' }}>{battle.significance}</span>
          </div>
        )}

        {battle.legacy && (
          <div style={{ marginBottom: '12px' }}>
            <span style={{ fontFamily: 'Cinzel', fontSize: '9px', color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>Legacy</span>
            <span style={{ fontFamily: 'IM Fell English', fontSize: '13px', color: 'var(--ash)' }}>{battle.legacy}</span>
          </div>
        )}
      </div>
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          fontSize: '180px',
          opacity: 0.02,
          color: 'var(--gold)',
          pointerEvents: 'none',
          transform: 'rotate(15deg)'
        }}>
          ⚔
        </div>
      </div>
    </Link>
  )
}

export default BattleCard