import { useEffect, useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getEpisodes, getSeasonScript } from '../services/contentService'
import SectionHeader from '../components/SectionHeader'

const EpisodeDetail = () => {
  const { id } = useParams()
  const [episode, setEpisode] = useState(null)
  const [scriptLines, setScriptLines] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getEpisodes().then(data => {
      const ep = data?.find(e => e.id === id)
      setEpisode(ep)
      if (ep) {
        const seasonNum = parseInt(ep.seasonId.split('_')[1], 10)
        getSeasonScript(seasonNum).then(scriptData => {
          if (scriptData) {
            setScriptLines(scriptData.filter(line => line.episodeId === id))
          }
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    })
  }, [id])

  const stats = useMemo(() => {
    if (!scriptLines.length) return null
    const speakerMap = {}
    scriptLines.forEach(line => {
      if (!line.isAction && line.characterId) {
        const name = line.characterId.replace('char_', '').replace(/-/g, ' ')
        speakerMap[name] = (speakerMap[name] || 0) + 1
      }
    })
    const topSpeakers = Object.entries(speakerMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
    return { topSpeakers, totalLines: scriptLines.length }
  }, [scriptLines])

  if (loading) return <div style={{ paddingTop: '120px', minHeight: '100vh', color: 'var(--gold)', textAlign: 'center' }}>Loading Archives...</div>
  if (!episode) return <div style={{ paddingTop: '120px', minHeight: '100vh', color: 'var(--ash)', textAlign: 'center' }}>Episode not found.</div>

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
        <Link to="/episodes" style={{ color: 'var(--gold-dim)', textDecoration: 'none', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.2em' }}>&larr; Back to Episodes</Link>

        <div style={{ marginTop: '40px' }}>
          <SectionHeader
            eyebrow={`SEASON ${episode.seasonId.replace('season_', '')} • EPISODE ${episode.episodeNumber}`}
            title={episode.title}
            subtitle={`Directed by ${episode.directedBy} • Written by ${episode.writtenBy}`}
            rune="✦"
          />

          {stats && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '48px', padding: '24px', background: 'rgba(201, 168, 76, 0.05)', border: '1px solid var(--gold-dim)' }}>
              <div>
                <h4 style={{ fontFamily: 'Cinzel', color: 'var(--gold)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Total Dialogue & Action</h4>
                <p style={{ fontFamily: 'IM Fell English', fontSize: '24px', color: 'var(--parchment)' }}>{stats.totalLines} lines</p>
              </div>
              <div>
                <h4 style={{ fontFamily: 'Cinzel', color: 'var(--gold)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Top Speakers</h4>
                <ul style={{ listStyle: 'none', padding: 0, fontFamily: 'IM Fell English', fontSize: '15px', color: 'var(--ash)' }}>
                  {stats.topSpeakers.map(([name, count]) => (
                    <li key={name} style={{ marginBottom: '4px', textTransform: 'capitalize' }}>{name} ({count})</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <h3 style={{ fontFamily: 'Cinzel Decorative', color: 'var(--parchment)', fontSize: '24px', marginBottom: '24px', borderBottom: '1px solid var(--gold-dim)', paddingBottom: '8px' }}>Episode Transcript</h3>

          <div style={{ background: '#0a0a0a', padding: '32px', borderRadius: '4px' }}>
            {scriptLines.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {scriptLines.map(line => (
                  <div key={line.id} style={{
                    fontFamily: 'IM Fell English',
                    fontSize: '16px',
                    color: line.isAction ? 'var(--ash)' : 'var(--parchment)',
                    fontStyle: line.isAction ? 'italic' : 'normal',
                    paddingLeft: line.isAction ? '0' : '24px',
                    borderLeft: line.isAction ? 'none' : '2px solid var(--gold-dim)',
                    opacity: line.isAction ? 0.7 : 1
                  }}>
                    {!line.isAction && line.characterId && (
                      <strong style={{ fontFamily: 'Cinzel', fontSize: '10px', color: 'var(--gold)', display: 'block', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {line.characterId.replace('char_', '').replace(/-/g, ' ')}
                      </strong>
                    )}
                    {line.text}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: 'var(--ash)', fontStyle: 'italic', textAlign: 'center' }}>No transcript recorded for this episode.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EpisodeDetail