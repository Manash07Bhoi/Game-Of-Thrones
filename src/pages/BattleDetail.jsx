import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBattleById } from '../services/contentService'
import SectionHeader from '../components/SectionHeader'

const BattleDetail = () => {
  const { id } = useParams()
  const [battle, setBattle] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getBattleById(id).then(data => {
      setBattle(data)
      setLoading(false)
    })
  }, [id])

  if (loading) return <div style={{ paddingTop: '120px', minHeight: '100vh', color: 'var(--gold)', textAlign: 'center' }}>Loading...</div>
  if (!battle) return <div style={{ paddingTop: '120px', minHeight: '100vh', color: 'var(--ash)', textAlign: 'center' }}>Battle not found.</div>

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <Link to="/battles" style={{ color: 'var(--gold-dim)', textDecoration: 'none', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.2em' }}>&larr; Back to History</Link>

        <div style={{ marginTop: '40px' }}>
          <SectionHeader
            eyebrow={`${battle.location} • ${battle.year}`}
            title={battle.name}
            subtitle={battle.description}
            rune="⚔"
          />

          <div style={{ marginTop: '40px', fontFamily: 'IM Fell English', fontSize: '18px', color: 'var(--ash)', lineHeight: '1.8' }}>
            <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '24px', marginBottom: '16px' }}>Background</h3>
            <p style={{ marginBottom: '40px' }}>{battle.background}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }}>
              <div>
                <h3 style={{ fontFamily: 'Cinzel', color: 'var(--gold)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>Commanders</h3>
                <ul style={{ listStyle: 'none' }}>
                  {battle.commanders.map((c, i) => <li key={i} style={{ marginBottom: '8px' }}>{c}</li>)}
                </ul>
              </div>
              <div>
                <h3 style={{ fontFamily: 'Cinzel', color: 'var(--gold)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>Participants</h3>
                <ul style={{ listStyle: 'none' }}>
                  {battle.participants.map((p, i) => <li key={i} style={{ marginBottom: '8px' }}>{p}</li>)}
                </ul>
              </div>
            </div>

            <div style={{ padding: '24px', background: 'rgba(201, 168, 76, 0.05)', borderLeft: '2px solid var(--gold)', marginBottom: '40px' }}>
              <h3 style={{ fontFamily: 'Cinzel', color: 'var(--gold)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>Outcome</h3>
              <p>{battle.outcome}</p>
            </div>

            <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '24px', marginBottom: '16px' }}>Legacy & Significance</h3>
            <p>{battle.significance}</p>
            <p style={{ marginTop: '16px', fontStyle: 'italic', color: 'var(--gold-dim)' }}>{battle.legacy}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BattleDetail