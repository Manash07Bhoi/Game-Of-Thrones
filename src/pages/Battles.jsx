import { useEffect, useState } from 'react'
import BattleCard from '../components/BattleCard'
import SectionHeader from '../components/SectionHeader'
import { getBattles } from '../services/contentService'
import './Home.css' // Import CSS for battles-grid

const Battles = () => {
  const [battles, setBattles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getBattles().then(data => {
      setBattles(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="BLOOD & STEEL"
        title="Epic<br/><em>Battles</em>"
        subtitle="Where crowns are won, dynasties shattered, and history is written in blood."
        rune="⚔"
      />
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--gold)', marginTop: '40px' }}>Unearthing war records...</div>
      ) : (
        <div className="battles-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          {battles.map((battle, i) => (
            <BattleCard key={battle.id} battle={battle} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Battles