import { useEffect, useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import { getAnalytics } from '../services/contentService'

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getAnalytics().then(data => {
      setAnalytics(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="THE ARCHIVES"
        title="Realm<br/><em>Analytics</em>"
        subtitle="Data-driven insights into the great game."
        rune="✦"
      />
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--gold)', marginTop: '40px' }}>Calculating the odds...</div>
      ) : analytics ? (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '32px' }}>

          <div style={{ border: '1px solid var(--gold-dim)', padding: '24px', background: '#0a0a0a' }}>
            <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '20px', marginBottom: '16px' }}>Top Speakers</h3>
            <ol style={{ paddingLeft: '24px', fontFamily: 'IM Fell English', color: 'var(--ash)', fontSize: '16px', lineHeight: '1.8' }}>
              {analytics.topSpeakers.slice(0, 10).map((speaker, i) => (
                <li key={i}>{speaker.name} ({speaker.lines} lines)</li>
              ))}
            </ol>
          </div>

          <div style={{ border: '1px solid var(--gold-dim)', padding: '24px', background: '#0a0a0a' }}>
            <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '20px', marginBottom: '16px' }}>House Battle Records</h3>
            <ul style={{ listStyle: 'none', fontFamily: 'IM Fell English', color: 'var(--ash)', fontSize: '16px', lineHeight: '1.8' }}>
              {analytics.houseBattleRecords.slice(0, 10).map((record, i) => (
                <li key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px', marginBottom: '8px' }}>
                  <strong style={{ color: 'var(--gold)' }}>{record.name}</strong><br/>
                  Wins: {record.wins} | Losses: {record.losses}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ border: '1px solid var(--gold-dim)', padding: '24px', background: '#0a0a0a' }}>
            <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '20px', marginBottom: '16px' }}>Character Popularity</h3>
            <ul style={{ listStyle: 'none', fontFamily: 'IM Fell English', color: 'var(--ash)', fontSize: '16px', lineHeight: '1.8' }}>
              {analytics.characterPopularity.slice(0, 10).map((char, i) => (
                <li key={i} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px', marginBottom: '8px' }}>
                  <span>{char.name}</span>
                  <span style={{ color: 'var(--gold)' }}>{(char.score * 100).toFixed(0)}%</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      ) : (
         <div style={{ textAlign: 'center', color: 'var(--ash)', marginTop: '40px' }}>No analytics data available.</div>
      )}
    </div>
  )
}

export default Analytics