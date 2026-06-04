import { useEffect, useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import { getLocations } from '../services/contentService'

const Locations = () => {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getLocations().then(data => {
      setLocations(data || [])
      setLoading(false)
    })
  }, [])

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="THE MAP"
        title="Westerosi<br/><em>Locations</em>"
        subtitle="The battlegrounds, castles, and cities of the known world."
        rune="♜"
      />
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--gold)', marginTop: '40px' }}>Mapping the Realm...</div>
      ) : (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
          {locations.map(loc => (
            <div key={loc.id} style={{ border: '1px solid rgba(201, 168, 76, 0.3)', padding: '16px', background: '#080808' }}>
              <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '18px', marginBottom: '8px' }}>{loc.name}</h3>
              <p style={{ fontFamily: 'IM Fell English', fontStyle: 'italic', color: 'var(--ash)', fontSize: '14px' }}>Region: {loc.region || 'Unknown'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Locations