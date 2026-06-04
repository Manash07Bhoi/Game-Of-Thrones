import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getCharacterById } from '../services/contentService'

const CharacterDetail = () => {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getCharacterById(id).then(data => {
      setCharacter(data)
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return <div style={{ paddingTop: '120px', minHeight: '100vh', color: 'var(--gold)', textAlign: 'center' }}>Loading...</div>
  }

  if (!character) {
    return <div style={{ paddingTop: '120px', minHeight: '100vh', color: 'var(--ash)', textAlign: 'center' }}>Character not found.</div>
  }

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <Link to="/characters" style={{ color: 'var(--gold-dim)', textDecoration: 'none', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.2em' }}>&larr; Back to Characters</Link>

        <div style={{ marginTop: '40px', display: 'flex', gap: '48px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          <div style={{ flexShrink: 0, width: '280px' }}>
            {character.image ? (
               <img src={character.image} alt={character.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '4px', border: `1px solid ${character.accent}`, boxShadow: '0 10px 30px rgba(0,0,0,0.8)' }} />
            ) : (
               <div style={{ width: '100%', aspectRatio: '3/4', background: character.bg, borderRadius: '4px', border: `1px solid ${character.accent}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.8)', position: 'relative' }}>
                 <span style={{ fontFamily: 'Cinzel Decorative', fontSize: '72px', color: character.accent, opacity: 0.8, textShadow: '0 4px 12px rgba(0,0,0,0.9)' }}>{character.initials}</span>
                 <span style={{ fontSize: '48px', color: '#fff', opacity: 0.1, position: 'absolute', bottom: '32px' }}>{character.sigilIcon}</span>
               </div>
            )}

            <div style={{ marginTop: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--gold-dim)', padding: '24px' }}>
               <h4 style={{ fontFamily: 'Cinzel', fontSize: '10px', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>Character Stats</h4>
               <ul style={{ listStyle: 'none', fontFamily: 'IM Fell English', fontSize: '15px', color: 'var(--ash)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                 <li><strong style={{ color: 'var(--parchment)' }}>Popularity:</strong> {character.popularity ? `${(character.popularity * 100).toFixed(0)}%` : 'Unknown'}</li>
                 <li><strong style={{ color: 'var(--parchment)' }}>Dialogue:</strong> {character.spokenLineCount} Lines</li>
                 <li><strong style={{ color: 'var(--parchment)' }}>Status:</strong> {character.isAlive === false ? 'Deceased' : (character.status || 'Alive / Unknown')}</li>
               </ul>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: '300px' }}>
            <h1 style={{ fontFamily: 'Cinzel Decorative', fontSize: '56px', color: 'var(--parchment)', marginBottom: '8px', lineHeight: '1.1' }}>{character.name}</h1>
            <h2 style={{ fontFamily: 'Cinzel', fontSize: '12px', color: character.accent, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '32px' }}>{character.fullTitle || 'Citizen of the Realm'}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px', fontFamily: 'Cinzel', fontSize: '11px', color: 'var(--ash)', textTransform: 'uppercase' }}>
              <p><strong>Allegiance:</strong> <br/>{character.allegiance}</p>
              <p><strong>Status:</strong> <br/><span style={{ color: character.isAlive === false ? 'var(--blood)' : 'var(--gold)' }}>{character.isAlive === false ? 'Deceased' : (character.status || 'Unknown')}</span></p>
            </div>

            <div style={{ fontFamily: 'IM Fell English', fontSize: '18px', color: 'var(--ash)', lineHeight: '1.8', marginBottom: '40px' }}>
              <p>{character.biography}</p>
            </div>

            {character.quote && (
              <blockquote style={{ fontFamily: 'Cinzel Decorative', fontSize: '20px', color: 'var(--gold)', borderLeft: `2px solid ${character.accent}`, paddingLeft: '24px', fontStyle: 'italic', marginBottom: '40px', background: 'linear-gradient(to right, rgba(201,168,76,0.05), transparent)', padding: '24px' }}>
                "{character.quote}"
              </blockquote>
            )}

            {character.relationships && character.relationships.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '24px', marginBottom: '16px', borderBottom: '1px solid var(--gold-dim)', paddingBottom: '8px' }}>Known Relationships</h3>
                <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontFamily: 'IM Fell English', fontSize: '16px', color: 'var(--ash)' }}>
                  {character.relationships.map((rel, idx) => (
                    <li key={idx} style={{ padding: '8px 12px', background: '#0a0a0a', borderLeft: `2px solid ${character.accent}` }}>{rel}</li>
                  ))}
                </ul>
              </div>
            )}

            {character.achievements && character.achievements.length > 0 && (
              <div>
                <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '24px', marginBottom: '16px', borderBottom: '1px solid var(--gold-dim)', paddingBottom: '8px' }}>Key Achievements</h3>
                <ul style={{ paddingLeft: '24px', fontFamily: 'IM Fell English', fontSize: '16px', color: 'var(--ash)', lineHeight: '1.8' }}>
                  {character.achievements.map((ach, idx) => <li key={idx}>{ach}</li>)}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterDetail