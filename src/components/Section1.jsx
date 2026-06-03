import { useRef } from 'react'
import HouseCard from './HouseCard'
import SectionHeader from './SectionHeader'
import { HOUSES_DATA } from '../content/housesContent'
import './Section1.css'

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
        {HOUSES_DATA.slice(0, 6).map((house, i) => (
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