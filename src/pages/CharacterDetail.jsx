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

        <div style={{ marginTop: '40px', display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {character.image && (
             <img src={character.image} alt={character.name} style={{ width: '250px', height: '350px', objectFit: 'cover', borderRadius: '4px', border: `1px solid ${character.accent}` }} />
          )}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h1 style={{ fontFamily: 'Cinzel Decorative', fontSize: '48px', color: 'var(--parchment)', marginBottom: '8px' }}>{character.name}</h1>
            <h2 style={{ fontFamily: 'Cinzel', fontSize: '14px', color: 'var(--gold)', letterSpacing: '0.1em', marginBottom: '24px' }}>{character.fullTitle}</h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px', fontFamily: 'Cinzel', fontSize: '11px', color: 'var(--ash)', textTransform: 'uppercase' }}>
              <p><strong>Allegiance:</strong> <br/>{character.allegiance}</p>
              <p><strong>Status:</strong> <br/><span style={{ color: character.isAlive === false ? 'var(--blood)' : 'var(--gold)' }}>{character.isAlive === false ? 'Deceased' : (character.status || 'Unknown')}</span></p>
            </div>

            <p style={{ fontFamily: 'IM Fell English', fontSize: '18px', color: 'var(--ash)', lineHeight: '1.6', marginBottom: '32px' }}>{character.biography}</p>

            {character.quote && (
              <blockquote style={{ fontFamily: 'Cinzel Decorative', fontSize: '16px', color: 'var(--gold)', borderLeft: '2px solid var(--gold)', paddingLeft: '16px', fontStyle: 'italic' }}>
                "{character.quote}"
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CharacterDetail