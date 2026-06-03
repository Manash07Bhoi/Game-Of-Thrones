import Hero from '../components/Hero'
import Section1 from '../components/Section1'
import SectionHeader from '../components/SectionHeader'
import CharacterCard from '../components/CharacterCard'
import BattleCard from '../components/BattleCard'
import { CHARACTERS_DATA } from '../content/charactersContent'
import { BATTLES_DATA } from '../content/battlesContent'
import './Home.css'

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
          {CHARACTERS_DATA.slice(0, 4).map((char, i) => (
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
          {BATTLES_DATA.slice(0, 3).map((battle, i) => (
            <BattleCard key={battle.name} battle={battle} index={i} />
          ))}
        </div>
      </section>

    </div>
  )
}

export default Home