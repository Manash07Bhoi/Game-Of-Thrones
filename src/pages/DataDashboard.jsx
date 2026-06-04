import { useEffect, useState } from 'react'
import SectionHeader from '../components/SectionHeader'

const DataDashboard = () => {
  const [metadata, setMetadata] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch(`${import.meta.env.BASE_URL}data/metadata.json`)
      .then(res => res.json())
      .then(data => {
        setMetadata(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="DATA PIPELINE"
        title="The Citadel<br/><em>Archives</em>"
        subtitle="Live dataset statistics and pipeline metadata."
        rune="✦"
      />
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--gold)', marginTop: '40px' }}>Accessing the Vaults...</div>
      ) : metadata ? (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

          <div style={{ background: '#0a0a0a', border: '1px solid var(--gold-dim)', padding: '32px', marginBottom: '32px' }}>
            <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '24px', marginBottom: '24px' }}>Dataset Health & Records</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px' }}>
              {Object.entries(metadata.recordCounts).map(([key, value]) => (
                <div key={key} style={{ textAlign: 'center', padding: '16px', background: 'rgba(201, 168, 76, 0.05)', border: '1px solid rgba(201, 168, 76, 0.2)' }}>
                  <span style={{ display: 'block', fontFamily: 'Cinzel Decorative', fontSize: '28px', color: 'var(--gold)', marginBottom: '8px' }}>{value.toLocaleString()}</span>
                  <span style={{ fontFamily: 'Cinzel', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--ash)' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#0a0a0a', border: '1px solid var(--gold-dim)', padding: '32px' }}>
            <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '24px', marginBottom: '16px' }}>Pipeline Generation</h3>
            <ul style={{ listStyle: 'none', fontFamily: 'IM Fell English', fontSize: '16px', color: 'var(--ash)', lineHeight: '1.8' }}>
              <li style={{ marginBottom: '12px' }}><strong style={{ color: 'var(--gold)' }}>Generated At:</strong> {new Date(metadata.generatedAt).toLocaleString()}</li>
              <li style={{ marginBottom: '12px' }}><strong style={{ color: 'var(--gold)' }}>Pipeline Version:</strong> v{metadata.version}</li>
              <li>
                <strong style={{ color: 'var(--gold)', display: 'block', marginBottom: '8px' }}>Source CSV Datasets Compiled:</strong>
                <ul style={{ paddingLeft: '24px', listStyleType: 'square' }}>
                  {metadata.sourceDatasets.map(src => <li key={src}>{src}</li>)}
                </ul>
              </li>
            </ul>
          </div>

        </div>
      ) : (
        <div style={{ textAlign: 'center', color: 'var(--ash)', marginTop: '40px' }}>Metadata offline.</div>
      )}
    </div>
  )
}

export default DataDashboard