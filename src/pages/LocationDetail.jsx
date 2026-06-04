import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getLocations } from '../services/contentService'
import SectionHeader from '../components/SectionHeader'

const LocationDetail = () => {
  const { id } = useParams()
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getLocations().then(data => {
      const loc = data?.find(l => l.id === id)
      setLocation(loc)
      setLoading(false)
    })
  }, [id])

  if (loading) return <div style={{ paddingTop: '120px', minHeight: '100vh', color: 'var(--gold)', textAlign: 'center' }}>Mapping coordinates...</div>
  if (!location) return <div style={{ paddingTop: '120px', minHeight: '100vh', color: 'var(--ash)', textAlign: 'center' }}>Location not found on any map.</div>

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <Link to="/locations" style={{ color: 'var(--gold-dim)', textDecoration: 'none', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.2em' }}>&larr; Back to Map</Link>

        <div style={{ marginTop: '40px' }}>
          <SectionHeader
            eyebrow="GEOGRAPHY"
            title={location.name}
            subtitle={`A vital strategic location situated in ${location.region || 'Westeros'}.`}
            rune="♜"
          />

          <div style={{ marginTop: '40px', fontFamily: 'IM Fell English', fontSize: '18px', color: 'var(--ash)', lineHeight: '1.8' }}>
             <p><strong>{location.name}</strong> stands as a testament to the brutal geography and history of {location.region}. Throughout the wars for the Iron Throne, locations such as this became the staging grounds for armies, the resting places of kings, and the unmarked graves of thousands.</p>

             <div style={{ marginTop: '40px', padding: '24px', borderLeft: '2px solid var(--gold)', background: 'rgba(201, 168, 76, 0.05)' }}>
               <h3 style={{ fontFamily: 'Cinzel', color: 'var(--gold)', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>Strategic Data</h3>
               <ul style={{ listStyle: 'none' }}>
                 <li><strong>Region:</strong> {location.region || 'Unknown'}</li>
                 <li><strong>Status:</strong> Active / Historically Significant</li>
               </ul>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationDetail