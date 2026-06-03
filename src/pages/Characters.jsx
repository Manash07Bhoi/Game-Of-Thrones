import CharacterCard from '../components/CharacterCard'
import SectionHeader from '../components/SectionHeader'
import { CHARACTERS_DATA } from '../content/charactersContent'

const Characters = () => {
  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="THE PLAYERS"
        title="Legendary<br/><em>Characters</em>"
        subtitle="Explore the complete biographies, achievements, and allegiances of Westeros' most pivotal figures."
        rune="♔"
      />
      <div className="characters-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {CHARACTERS_DATA.map((char, i) => (
          <CharacterCard key={char.name} character={char} index={i} />
        ))}
      </div>
    </div>
  )
}

export default Characters