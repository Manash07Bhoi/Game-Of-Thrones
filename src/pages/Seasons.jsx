import { useEffect, useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import { getSeasons } from '../services/contentService'

const Seasons = () => {
  const [seasons, setSeasons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getSeasons().then(data => {
      setSeasons(data || [])
      setLoading(false)
    })
  }, [])

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="THE ERAS"
        title="Television<br/><em>Seasons</em>"
        subtitle="The major chapters of the Game of Thrones saga."
        rune="✦"
      />
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--gold)', marginTop: '40px' }}>Accessing the Citadel Archives...</div>
      ) : (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {seasons.map(season => (
            <div key={season.id} style={{ borderLeft: '2px solid var(--gold)', paddingLeft: '24px', background: 'rgba(20,20,20,0.5)', padding: '24px' }}>
              <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '28px', marginBottom: '16px' }}>Season {season.seasonNumber}</h3>
              <p style={{ fontFamily: 'Cinzel', color: 'var(--gold)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Contains {season.episodes.length} Episodes
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Seasons