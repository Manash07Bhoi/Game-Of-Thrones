import { useEffect } from 'react'
import SectionHeader from '../components/SectionHeader'
import { HOUSES_DATA } from '../content/housesContent'
import './Houses.css'

const Houses = () => {
  // Simple fade in on mount for premium feel
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="BLOODLINES"
        title="The Great<br/><em>Houses</em>"
        subtitle="Explore the deep histories, famous members, and ancestral seats of the noble families."
        rune="✦"
      />

      <div className="houses-detailed-list">
        {HOUSES_DATA.map((house) => (
          <div key={house.id} className="house-detail-row fade-up-scroll">
            <div className="house-detail-visual" style={{ background: house.bg, borderColor: house.borderColor }}>
              <img src={`${import.meta.env.BASE_URL}${house.sigil_url}`} alt={house.name} className="house-detail-img" />
              <h2 className="house-detail-name" style={{ color: house.accent }}>HOUSE {house.name}</h2>
              <p className="house-detail-words">{house.words}</p>
            </div>

            <div className="house-detail-info">
              <div className="house-meta">
                <p><strong>Seat:</strong> {house.seat}</p>
                <p><strong>Region:</strong> {house.region}</p>
                <p><strong>Founder:</strong> {house.founder}</p>
              </div>
              <div className="got-divider left-align" style={{ margin: '20px 0' }}>
                <span className="got-divider-line" />
                <span className="got-divider-diamond" />
                <span className="got-divider-line right" />
              </div>
              <p className="house-detail-desc">{house.history}</p>

              <div className="house-famous">
                <h4>Notable Members:</h4>
                <ul>
                  {house.famousMembers.map(member => <li key={member}>{member}</li>)}
                </ul>
              </div>

              <div className="house-timeline">
                <h4>Timeline Highlights:</h4>
                {house.timeline.map(item => (
                  <div key={item.event} className="timeline-item">
                    <span className="tl-year">{item.year}</span>
                    <span className="tl-event">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Houses