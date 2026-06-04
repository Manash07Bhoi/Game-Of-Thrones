import { useEffect, useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import SectionHeader from '../components/SectionHeader'
import { getSeasonScript } from '../services/contentService'

const Quotes = () => {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  // For a premium quotes page, we'll fetch Season 1 initially as a "famous quotes" seed,
  // or allow searching. In a true backend this would be a dedicated endpoint.
  useEffect(() => {
    window.scrollTo(0, 0)
    // Fetching season 1 as our "Famous Quotes" seed for static frontend
    getSeasonScript(1).then(data => {
      if (data) {
        // Filter out actions to only get dialogue, and take a randomish slice for "Famous"
        const dialogue = data.filter(line => !line.isAction && line.text.length > 20)
        setQuotes(dialogue)
      }
      setLoading(false)
    })
  }, [])

  const fuse = useMemo(() => new Fuse(quotes, {
    keys: ['text', 'characterId'],
    threshold: 0.3
  }), [quotes])

  const displayQuotes = useMemo(() => {
    if (!searchQuery) return quotes.slice(0, 50) // Show 50 "famous" quotes default
    return fuse.search(searchQuery).map(res => res.item).slice(0, 50)
  }, [searchQuery, quotes, fuse])

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="WORDS OF WESTEROS"
        title="Famous<br/><em>Quotes</em>"
        subtitle="The sharpest blades are forged in the mind."
        rune="✎"
      />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>
        <input
          type="text"
          placeholder="Search quotes or characters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ width: '100%', padding: '16px 24px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--gold-dim)', color: 'var(--parchment)', fontFamily: 'Cinzel', outline: 'none', marginBottom: '48px' }}
        />

        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--gold)' }}>Consulting the scrolls...</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {displayQuotes.map(quote => (
              <div key={quote.id} style={{ background: 'linear-gradient(to right, rgba(201,168,76,0.05), transparent)', borderLeft: '2px solid var(--gold)', padding: '32px' }}>
                <p style={{ fontFamily: 'IM Fell English', fontSize: '24px', color: 'var(--parchment)', fontStyle: 'italic', marginBottom: '16px', lineHeight: '1.4' }}>
                  "{quote.text}"
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Cinzel', fontSize: '12px', color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    — {quote.characterId?.replace('char_', '').replace(/-/g, ' ')}
                  </span>
                  <span style={{ fontFamily: 'IM Fell English', fontSize: '12px', color: 'var(--ash)' }}>
                    Season 1, Episode {quote.episodeId.split('_')[2]}
                  </span>
                </div>
              </div>
            ))}
            {displayQuotes.length === 0 && (
               <div style={{ textAlign: 'center', color: 'var(--ash)', fontStyle: 'italic' }}>No quotes match your search.</div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Quotes