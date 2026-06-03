import { useEffect } from 'react'
import BattleCard from '../components/BattleCard'
import SectionHeader from '../components/SectionHeader'
import { BATTLES_DATA } from '../content/battlesContent'

const Battles = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="BLOOD & STEEL"
        title="Epic<br/><em>Battles</em>"
        subtitle="Where crowns are won, dynasties shattered, and history is written in blood."
        rune="⚔"
      />
      <div className="battles-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {BATTLES_DATA.map((battle, i) => (
          <BattleCard key={battle.id} battle={battle} index={i} />
        ))}
      </div>
    </div>
  )
}

export default Battles