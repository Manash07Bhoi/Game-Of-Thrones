import CharacterCard from '../components/CharacterCard'
import SectionHeader from '../components/SectionHeader'

const CHARACTERS = [
  { name: 'Jon Snow', house: 'House Stark', title: 'The White Wolf', quote: 'Winter is coming.', description: 'The bastard son of Ned Stark who rose to become Lord Commander of the Night\'s Watch and King in the North.', bg: '#1a1f26', accent: '#4a6380', sigilIcon: '🐺' },
  { name: 'Daenerys', house: 'House Targaryen', title: 'Mother of Dragons', quote: 'I will take what is mine with fire and blood.', description: 'The unburnt queen who hatched three dragons and crossed the Narrow Sea to reclaim the Iron Throne.', bg: '#2a0a0a', accent: '#c0392b', sigilIcon: '🐉' },
  { name: 'Tyrion', house: 'House Lannister', title: 'Hand of the Queen', quote: 'I drink and I know things.', description: 'A dwarf cast aside by his proud family, surviving through wit, intellect, and political maneuvering.', bg: '#2a220a', accent: '#d4a84b', sigilIcon: '🦁' },
  { name: 'Arya', house: 'House Stark', title: 'No One', quote: 'Leave one wolf alive and the sheep are never safe.', description: 'A fiercely independent survivor trained by the Faceless Men of Braavos.', bg: '#111', accent: '#4a6380', sigilIcon: '🗡' },
  { name: 'Cersei', house: 'House Lannister', title: 'Queen of the Andals', quote: 'When you play the game of thrones, you win or you die.', description: 'Fiercely protective of her children, ruthless in her pursuit and maintenance of absolute power.', bg: '#2a0a0a', accent: '#d4a84b', sigilIcon: '🦁' },
  { name: 'Jaime', house: 'House Lannister', title: 'The Kingslayer', quote: 'The things I do for love.', description: 'A legendary knight struggling to reclaim his honor after committing the ultimate treason.', bg: '#1a1a00', accent: '#d4a84b', sigilIcon: '⚔' },
]

const Characters = () => {
  return (
    <div style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="THE PLAYERS"
        title="Legendary<br/><em>Characters</em>"
        subtitle="Heroes, villains, and those caught in the wheel."
        rune="♔"
      />
      <div className="characters-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {CHARACTERS.map((char, i) => (
          <CharacterCard key={char.name} character={char} index={i} />
        ))}
      </div>
    </div>
  )
}

export default Characters