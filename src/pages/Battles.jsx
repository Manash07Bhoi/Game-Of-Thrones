import BattleCard from '../components/BattleCard'
import SectionHeader from '../components/SectionHeader'

const BATTLES = [
  { name: 'Battle of the Bastards', location: 'Winterfell', year: '303 AC', description: 'A brutal, suffocating clash between Jon Snow and Ramsay Bolton for control of the North.' },
  { name: 'The Blackwater', location: 'King\'s Landing', year: '299 AC', description: 'Stannis Baratheon\'s massive naval assault halted by Tyrion Lannister\'s devastating use of wildfire.' },
  { name: 'The Long Night', location: 'Winterfell', year: '305 AC', description: 'The ultimate stand of the living against the Night King and his army of the dead.' },
  { name: 'Battle of Castle Black', location: 'The Wall', year: '300 AC', description: 'Mance Rayder\'s wildling army assaults the Wall, defended valiantly by the Night\'s Watch.' },
]

const Battles = () => {
  return (
    <div style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="BLOOD & STEEL"
        title="Epic<br/><em>Battles</em>"
        subtitle="Where crowns are won and dynasties shatter."
        rune="⚔"
      />
      <div className="battles-grid" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {BATTLES.map((battle, i) => (
          <BattleCard key={battle.name} battle={battle} index={i} />
        ))}
      </div>
    </div>
  )
}

export default Battles