import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/SectionHeader'
import { getHouses } from '../services/contentService'
import './Houses.css'

const Houses = () => {
  const [houses, setHouses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getHouses().then(data => {
      setHouses(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="BLOODLINES"
        title="The Great<br/><em>Houses</em>"
        subtitle="Explore the deep histories, famous members, and ancestral seats of the noble families."
        rune="✦"
      />

      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--gold)', marginTop: '40px' }}>Consulting the Citadel...</div>
      ) : (
        <div className="houses-detailed-list">
          {houses.map((house) => (
            <div key={house.id} className="house-detail-row fade-up-scroll">
              <div className="house-detail-visual" style={{ background: house.bg, borderColor: house.borderColor }}>
                <img src={`${import.meta.env.BASE_URL}${house.sigil_url}`} alt={house.name} className="house-detail-img" />
                <h2 className="house-detail-name" style={{ color: house.accent }}>HOUSE {house.name}</h2>
                <p className="house-detail-words">{house.words}</p>
                <Link to={`/houses/${house.id}`} className="got-cta-ghost" style={{ marginTop: '24px', textDecoration: 'none' }}>
                  View Full Profile
                </Link>
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
      )}
    </div>
  )
}

export default Houses