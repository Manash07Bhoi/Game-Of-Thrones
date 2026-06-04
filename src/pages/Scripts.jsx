import { useEffect, useState, useMemo } from 'react'
import SectionHeader from '../components/SectionHeader'
import { getScriptIndex, getSeasonScript } from '../services/contentService'

const Scripts = () => {
  const [currentSeason, setCurrentSeason] = useState(1)
  const [scriptLines, setScriptLines] = useState([])
  const [loading, setLoading] = useState(true)

  // Filtering & Pagination
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const limit = 200 // massive dom lists can lag, so we paginate the script

  useEffect(() => {
    getScriptIndex()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true)
      getSeasonScript(currentSeason).then(data => {
        setScriptLines(data || [])
        setPage(1)
        setLoading(false)
      })
    }, 0)
    return () => clearTimeout(timer)
  }, [currentSeason])

  const filteredLines = useMemo(() => {
    if (!searchQuery) return scriptLines
    const term = searchQuery.toLowerCase()
    return scriptLines.filter(line =>
      line.text.toLowerCase().includes(term) ||
      (line.characterId && line.characterId.toLowerCase().replace('char_', '').replace('-', ' ').includes(term))
    )
  }, [searchQuery, scriptLines])

  const paginatedLines = filteredLines.slice(0, page * limit)

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="THE ARCHIVES"
        title="Dialogue &<br/><em>Scripts</em>"
        subtitle="Explore over 32,000 lines of dialogue and scene directions."
        rune="✎"
      />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
          <select
            value={currentSeason}
            onChange={(e) => setCurrentSeason(Number(e.target.value))}
            style={{ padding: '12px 24px', background: '#0a0a0a', border: '1px solid var(--gold-dim)', color: 'var(--gold)', fontFamily: 'Cinzel', outline: 'none' }}
          >
            {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Season {s}</option>)}
          </select>

          <input
            type="text"
            placeholder="Search dialogue or character..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1, padding: '12px 24px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--gold-dim)', color: 'var(--parchment)', fontFamily: 'Cinzel', outline: 'none' }}
          />
        </div>

        {/* Script Viewer */}
        <div style={{ background: '#080808', border: '1px solid var(--gold-dim)', padding: '32px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--gold)', padding: '40px 0' }}>Unfurling the scrolls...</div>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {paginatedLines.map(line => (
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

              {paginatedLines.length < filteredLines.length && (
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                  <button onClick={() => setPage(p => p + 1)} className="got-cta-ghost">Read Further</button>
                </div>
              )}

              {filteredLines.length === 0 && !loading && (
                <div style={{ textAlign: 'center', color: 'var(--ash)', padding: '40px 0', fontStyle: 'italic' }}>Silence falls upon the realm...</div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default Scripts