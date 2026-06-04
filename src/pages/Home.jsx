import { useEffect, useState } from 'react'
import Hero from '../components/Hero'
import Section1 from '../components/Section1'
import SectionHeader from '../components/SectionHeader'
import CharacterCard from '../components/CharacterCard'
import BattleCard from '../components/BattleCard'
import { Link } from 'react-router-dom'
import { getCharacters, getBattles } from '../services/contentService'
import './Home.css'

const Home = () => {
  const [characters, setCharacters] = useState([])
  const [battles, setBattles] = useState([])

  useEffect(() => {
    getCharacters().then(data => {
      // Force filter for legendary characters specifically so the homepage remains curated
      const legendaryNames = ['Jon Snow', 'Daenerys Targaryen', 'Tyrion Lannister', 'Arya Stark'];
      const curated = data.filter(c => legendaryNames.includes(c.name)).slice(0, 4);
      setCharacters(curated.length > 0 ? curated : data.slice(0, 4));
    })
    getBattles().then(data => setBattles(data.slice(0, 3)))
  }, [])

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
          {characters.length > 0 ? characters.map((char, i) => (
            <CharacterCard key={char.id} character={char} index={i} />
          )) : (
            <div style={{ textAlign: 'center', color: 'var(--gold)', gridColumn: '1 / -1' }}>Fetching from Maester's Archives...</div>
          )}
        </div>
        <div style={{ textAlign: 'center', marginTop: '64px' }}>
          <Link to="/characters" className="got-cta-ghost" style={{ textDecoration: 'none' }}>
            Explore All Characters
          </Link>
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
          {battles.length > 0 ? battles.map((battle, i) => (
            <BattleCard key={battle.id} battle={battle} index={i} />
          )) : (
            <div style={{ textAlign: 'center', color: 'var(--gold)', gridColumn: '1 / -1' }}>Unearthing war records...</div>
          )}
        </div>
      </section>

    </div>
  )
}

export default Home