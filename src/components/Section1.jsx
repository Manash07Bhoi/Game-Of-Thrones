import { useRef } from 'react'
import HouseCard from './HouseCard'
import SectionHeader from './SectionHeader'
import './Section1.css'

const HOUSES = [
  {
    id: 'stark',
    name: 'STARK',
    seat: 'Winterfell',
    words: '"Winter Is Coming"',
    region: 'The North',
    sigil: 'Grey Direwolf',
    colors: ['#6b7a8d', '#c8d4e0'],
    accent: '#8fafc4',
    description:
      'Wardens of the North, the Starks trace their blood to the First Men. Honour is their sword and the frozen wind their banner. They endure where others fall — patient as winter itself.',
    sigil_url: `${import.meta.env.BASE_URL}images/one.jpg`,
    bg: 'linear-gradient(135deg, #0d1117 0%, #1a2332 60%, #0d1117 100%)',
    borderColor: '#4a6380',
  },
  {
    id: 'lannister',
    name: 'LANNISTER',
    seat: 'Casterly Rock',
    words: '"Hear Me Roar"',
    region: 'The Westerlands',
    sigil: 'Golden Lion',
    colors: ['#c9a84c', '#e8c97a'],
    accent: '#d4a84b',
    description:
      'The wealthiest house in Westeros. Their lion does not merely roar — it devours. Power is their birthright, gold their language, and debt a weapon they wield with surgical precision.',
    sigil_url: `${import.meta.env.BASE_URL}images/two.jpg`,
    bg: 'linear-gradient(135deg, #1a1200 0%, #2a1f00 60%, #1a1200 100%)',
    borderColor: '#7a6130',
  },
  {
    id: 'targaryen',
    name: 'TARGARYEN',
    seat: 'Dragonstone',
    words: '"Fire and Blood"',
    region: 'The Crownlands',
    sigil: 'Three-Headed Dragon',
    colors: ['#c41e3a', '#ff4466'],
    accent: '#c0392b',
    description:
      'Blood of Old Valyria. They did not conquer Westeros — they burned it into submission. Dragon riders, dynasty builders, and the last of a world consumed by fire.',
    sigil_url: `${import.meta.env.BASE_URL}images/three.png`,
    bg: 'linear-gradient(135deg, #1a0000 0%, #2d0a0a 60%, #1a0000 100%)',
    borderColor: '#7a1a1a',
  },
  {
    id: 'baratheon',
    name: 'BARATHEON',
    seat: "Storm's End",
    words: '"Ours Is The Fury"',
    region: 'The Stormlands',
    sigil: 'Crowned Black Stag',
    colors: ['#e8c97a', '#f5e6c8'],
    accent: '#c9a84c',
    description:
      'Born of storms, tempered by battle. The Baratheons seized the Iron Throne not through cunning but through iron will and a war hammer. Fury is not their weakness — it is their crown.',
    sigil_url: `${import.meta.env.BASE_URL}images/four.webp`,
    bg: 'linear-gradient(135deg, #0a0a00 0%, #1f1c00 60%, #0a0a00 100%)',
    borderColor: '#5a5020',
  },
  {
    id: 'greyjoy',
    name: 'GREYJOY',
    seat: 'Pyke',
    words: '"We Do Not Sow"',
    region: 'The Iron Islands',
    sigil: 'Golden Kraken',
    colors: ['#d4af37', '#8b8b6b'],
    accent: '#b8a040',
    description:
      'Reavers of the sea. Iron men who bow to no king but the Drowned God. What they cannot make, they take. What they cannot take, they burn. The sea is their kingdom — all else is plunder.',
    sigil_url: `${import.meta.env.BASE_URL}images/five.jpg`,
    bg: 'linear-gradient(135deg, #050810 0%, #0a1020 60%, #050810 100%)',
    borderColor: '#3a4a5a',
  },
  {
    id: 'tyrell',
    name: 'TYRELL',
    seat: 'Highgarden',
    words: '"Growing Strong"',
    region: 'The Reach',
    sigil: 'Golden Rose',
    colors: ['#4a7c3f', '#7ab648'],
    accent: '#5a9e48',
    description:
      'The richest lords of the Reach, whose roses feed the realm. Behind beauty and abundance lies a house of ruthless ambition — growing strong in gardens, and stronger still in schemes.',
    sigil_url: `${import.meta.env.BASE_URL}images/six.jpg`,
    bg: 'linear-gradient(135deg, #030a00 0%, #0a1800 60%, #030a00 100%)',
    borderColor: '#2a4a20',
  },
  {
    id: 'martell',
    name: 'MARTELL',
    seat: 'Sunspear',
    words: '"Unbowed, Unbent, Unbroken"',
    region: 'Dorne',
    sigil: 'Red Sun Pierced By A Spear',
    colors: ['#e67e22', '#d35400'],
    accent: '#d35400',
    description:
      'Fierce and fiercely independent. The Dornish are the only people Aegon the Conqueror could not break. Passionate, lethal, and bound by ancient, burning blood.',
    sigil_url: `${import.meta.env.BASE_URL}images/five.jpg`,
    bg: 'linear-gradient(135deg, #1a0a00 0%, #2b1200 60%, #1a0a00 100%)',
    borderColor: '#8a4000',
  }
]

const Section1 = () => {
  const sectionRef = useRef(null)

  return (
    <section ref={sectionRef} className="section1">

      {/* Ambient background texture */}
      <div className="section1-bg-texture" />
      <div className="section1-bg-vignette" />

      {/* Section header */}
      <SectionHeader
        eyebrow="THE GREAT HOUSES OF WESTEROS"
        title="The Noble<br/><em>Houses</em>"
        subtitle="Seven Kingdoms. Centuries of blood. One Iron Throne.<br/>Explore the noble bloodlines that shape the realm."
        rune="✦"
      />

      {/* Houses grid */}
      <div className="houses-grid">
        {HOUSES.map((house, i) => (
          <HouseCard key={house.id} house={house} index={i} />
        ))}
      </div>

      {/* Section footer ornament */}
      <div className="section1-footer-ornament">
        <span className="footer-line" />
        <span className="footer-sigil">⚔</span>
        <span className="footer-line" />
      </div>

    </section>
  )
}

export default Section1