import { useEffect, useState } from 'react'
import CharacterCard from '../components/CharacterCard'
import SectionHeader from '../components/SectionHeader'
import { getCharacters } from '../services/contentService'

const Characters = () => {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getCharacters().then(data => {
      setCharacters(data)
      setLoading(false)
    })
  }, [])

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
        <div className="characters-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {characters.map((char, i) => (
            <CharacterCard key={char.id} character={char} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Characters