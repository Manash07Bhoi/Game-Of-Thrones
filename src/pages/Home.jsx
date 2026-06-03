import Hero from '../components/Hero'
import Section1 from '../components/Section1'
import SectionHeader from '../components/SectionHeader'
import CharacterCard from '../components/CharacterCard'
import BattleCard from '../components/BattleCard'
import './Home.css'

const CHARACTERS = [
  { name: 'Jon Snow', house: 'House Stark', title: 'The White Wolf', quote: 'Winter is coming.', description: 'The bastard son of Ned Stark who rose to become Lord Commander of the Night\'s Watch and King in the North.', bg: '#1a1f26', accent: '#4a6380', sigilIcon: '🐺' },
  { name: 'Daenerys', house: 'House Targaryen', title: 'Mother of Dragons', quote: 'I will take what is mine with fire and blood.', description: 'The unburnt queen who hatched three dragons and crossed the Narrow Sea to reclaim the Iron Throne.', bg: '#2a0a0a', accent: '#c0392b', sigilIcon: '🐉' },
  { name: 'Tyrion', house: 'House Lannister', title: 'Hand of the Queen', quote: 'I drink and I know things.', description: 'A dwarf cast aside by his proud family, surviving through wit, intellect, and political maneuvering.', bg: '#2a220a', accent: '#d4a84b', sigilIcon: '🦁' },
  { name: 'Arya', house: 'House Stark', title: 'No One', quote: 'Leave one wolf alive and the sheep are never safe.', description: 'A fiercely independent survivor trained by the Faceless Men of Braavos.', bg: '#111', accent: '#4a6380', sigilIcon: '🗡' },
]

const BATTLES = [
  { name: 'Battle of the Bastards', location: 'Winterfell', year: '303 AC', description: 'A brutal, suffocating clash between Jon Snow and Ramsay Bolton for control of the North.' },
  { name: 'The Blackwater', location: 'King\'s Landing', year: '299 AC', description: 'Stannis Baratheon\'s massive naval assault halted by Tyrion Lannister\'s devastating use of wildfire.' },
  { name: 'The Long Night', location: 'Winterfell', year: '305 AC', description: 'The ultimate stand of the living against the Night King and his army of the dead.' },
]

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <Section1 />

      {/* Legendary Characters Section */}
      <section className="section-characters">
        <div className="section-bg-overlay" />
        <SectionHeader
          eyebrow="THE PLAYERS"
          title="Legendary<br/><em>Characters</em>"
          subtitle="Heroes, villains, and those caught in the wheel."
          rune="♔"
        />
        <div className="characters-grid">
          {CHARACTERS.map((char, i) => (
            <CharacterCard key={char.name} character={char} index={i} />
          ))}
        </div>
      </section>

      {/* Epic Battles Section */}
      <section className="section-battles">
        <SectionHeader
          eyebrow="BLOOD & STEEL"
          title="Epic<br/><em>Battles</em>"
          subtitle="Where crowns are won and dynasties shatter."
          rune="⚔"
        />
        <div className="battles-grid">
          {BATTLES.map((battle, i) => (
            <BattleCard key={battle.name} battle={battle} index={i} />
          ))}
        </div>
      </section>

    </div>
  )
}

export default Home