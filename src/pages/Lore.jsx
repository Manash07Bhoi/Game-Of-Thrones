import SectionHeader from '../components/SectionHeader'

const Lore = () => {
  return (
    <div style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="ANCIENT SECRETS"
        title="The Realm of<br/><em>Westeros</em>"
        subtitle="Discover the deep history, major regions, and atmospheric storytelling of the Seven Kingdoms."
        rune="♜"
      />
      <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 24px', color: 'var(--ash)', fontFamily: 'IM Fell English', fontSize: '18px', lineHeight: '1.8' }}>
        <p style={{ marginBottom: '24px' }}>
          For thousands of years, the continent of Westeros has been shaped by fire and ice. From the ancient arrival of the First Men and the enigmatic Children of the Forest, to the devastating conquest of Aegon Targaryen, the realm is steeped in blood and legend.
        </p>
        <p style={{ marginBottom: '24px' }}>
          Divided into distinct regions—each with its own harsh climate, ancient traditions, and formidable noble houses—the Seven Kingdoms are bound together by the formidable Iron Throne. The frozen expanses of the North, the fertile lands of the Reach, and the arid deserts of Dorne all harbor secrets that wait to be uncovered.
        </p>
        <p>
          Beyond the towering ice of the Wall lies a threat older than memory, while across the Narrow Sea, exiled dragons stir. The song of ice and fire is a tale of power, betrayal, and the enduring human spirit in a world where winter is always coming.
        </p>
      </div>
    </div>
  )
}

export default Lore