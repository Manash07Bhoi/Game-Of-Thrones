import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getHouseById } from '../services/contentService'

const HouseDetail = () => {
  const { id } = useParams()
  const [house, setHouse] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getHouseById(id).then(data => {
      setHouse(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <div style={{ paddingTop: '120px', minHeight: '100vh', color: 'var(--gold)', textAlign: 'center' }}>Loading...</div>
  if (!house) return <div style={{ paddingTop: '120px', minHeight: '100vh', color: 'var(--ash)', textAlign: 'center' }}>House not found.</div>

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
        <Link to="/houses" style={{ color: 'var(--gold-dim)', textDecoration: 'none', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.2em' }}>&larr; Back to Houses</Link>

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          {house.sigil_url && house.sigil_url !== "null" ? (
            <img src={house.sigil_url.startsWith('http') ? house.sigil_url : `${import.meta.env.BASE_URL}${house.sigil_url}`} alt={house.name} style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', border: `2px solid ${house.accent}`, marginBottom: '24px' }} />
          ) : (
            <div style={{ width: '180px', height: '180px', borderRadius: '50%', background: house.bg, border: `2px solid ${house.accent}`, margin: '0 auto 24px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: house.accent, fontSize: '72px' }}>{house.sigil}</span>
            </div>
          )}
          <h1 style={{ fontFamily: 'Cinzel Decorative', fontSize: '56px', color: 'var(--parchment)', marginBottom: '8px' }}>House {house.name}</h1>
          <h2 style={{ fontFamily: 'IM Fell English', fontStyle: 'italic', fontSize: '20px', color: 'var(--gold)', marginBottom: '40px' }}>{house.words}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', textAlign: 'center', fontFamily: 'Cinzel', fontSize: '12px', color: 'var(--ash)', textTransform: 'uppercase', marginBottom: '48px', borderTop: '1px solid var(--gold-dim)', borderBottom: '1px solid var(--gold-dim)', padding: '24px 0' }}>
          <p><strong>Seat</strong><br/><span style={{ color: 'var(--parchment)' }}>{house.seat}</span></p>
          <p><strong>Region</strong><br/><span style={{ color: 'var(--parchment)' }}>{house.region}</span></p>
          <p><strong>Founder</strong><br/><span style={{ color: 'var(--parchment)' }}>{house.founder}</span></p>
        </div>

        {house.history ? (
          <p style={{ fontFamily: 'IM Fell English', fontSize: '18px', color: 'var(--ash)', lineHeight: '1.8', marginBottom: '48px', textAlign: 'center', maxWidth: '800px', margin: '0 auto 48px auto' }}>
            {house.history}
          </p>
        ) : (
          <p style={{ fontFamily: 'IM Fell English', fontSize: '18px', color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', marginBottom: '48px', textAlign: 'center' }}>History unavailable.</p>
        )}

        {house.famousMembers && house.famousMembers.length > 0 && (
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '24px', marginBottom: '16px' }}>Notable Members</h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', fontFamily: 'Cinzel', fontSize: '11px', color: 'var(--ash)', letterSpacing: '0.1em' }}>
              {house.famousMembers.map(member => <li key={member} style={{ padding: '8px 16px', border: '1px solid rgba(201,168,76,0.2)' }}>{member}</li>)}
            </ul>
          </div>
        )}

      </div>
    </div>
  )
}

export default HouseDetail