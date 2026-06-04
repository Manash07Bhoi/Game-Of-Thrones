import { useEffect, useState } from 'react'
import CharacterCard from '../components/CharacterCard'
import SectionHeader from '../components/SectionHeader'
import { getCharacters } from '../services/contentService'

const Characters = () => {
  const [characters, setCharacters] = useState([])
  const [filteredChars, setFilteredChars] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  // Pagination
  const [page, setPage] = useState(1)
  const limit = 48

  useEffect(() => {
    window.scrollTo(0, 0)
    getCharacters().then(data => {
      setCharacters(data)
      setFilteredChars(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const term = search.toLowerCase()
    const timer = setTimeout(() => {
      setFilteredChars(
        characters.filter(c =>
          c.name.toLowerCase().includes(term) ||
          (c.house && c.house.toLowerCase().includes(term)) ||
          (c.fullTitle && c.fullTitle.toLowerCase().includes(term))
        )
      )
      setPage(1) // reset pagination on new search
    }, 0)
    return () => clearTimeout(timer)
  }, [search, characters])

  const paginatedChars = filteredChars.slice(0, page * limit)

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="THE PLAYERS"
        title="Legendary<br/><em>Characters</em>"
        subtitle="Explore the complete biographies, achievements, and allegiances of Westeros' most pivotal figures."
        rune="♔"
      />

      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--gold)', marginTop: '40px' }}>Fetching from Maester's Archives...</div>
      ) : (
        <>
          <div style={{ maxWidth: '600px', margin: '0 auto 48px auto', padding: '0 24px' }}>
            <input
              type="text"
              placeholder="Search by name or house..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 24px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--gold-dim)',
                color: 'var(--parchment)',
                fontFamily: 'Cinzel',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>
          <div className="characters-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
            {paginatedChars.map((char, i) => (
              <CharacterCard key={char.id} character={char} index={i} />
            ))}
          </div>

          {paginatedChars.length < filteredChars.length && (
            <div style={{ textAlign: 'center', marginTop: '64px' }}>
              <button
                onClick={() => setPage(p => p + 1)}
                className="got-cta-ghost"
              >
                Load More Archives
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Characters