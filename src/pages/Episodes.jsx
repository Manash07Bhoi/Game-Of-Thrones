import { useEffect, useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import { getEpisodes } from '../services/contentService'

const Episodes = () => {
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getEpisodes().then(data => {
      setEpisodes(data || [])
      setLoading(false)
    })
  }, [])

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="THE CHRONICLES"
        title="Television<br/><em>Episodes</em>"
        subtitle="A complete archive of the visual retelling of Westerosi history."
        rune="✦"
      />
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--gold)', marginTop: '40px' }}>Accessing the Citadel Archives...</div>
      ) : (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {episodes.map(ep => (
            <div key={ep.id} style={{ border: '1px solid var(--gold-dim)', padding: '24px', background: 'rgba(20,20,20,0.8)' }}>
              <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '18px', marginBottom: '8px' }}>{ep.title}</h3>
              <p style={{ fontFamily: 'Cinzel', color: 'var(--gold)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Season {ep.seasonId.replace('season_', '')} &bull; Episode {ep.episodeNumber}</p>
              <div style={{ fontFamily: 'IM Fell English', color: 'var(--ash)', fontSize: '14px', lineHeight: '1.6' }}>
                <p><strong>Directed By:</strong> {ep.directedBy}</p>
                <p><strong>Written By:</strong> {ep.writtenBy}</p>
                <p><strong>Air Date:</strong> {ep.airDate}</p>
                <p><strong>Viewers:</strong> {ep.viewersMillions}M</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Episodes