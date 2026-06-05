import { useEffect, useRef, useState } from 'react'
import SectionHeader from '../components/SectionHeader'
import { getLore } from '../services/contentService'

const LoreSection = ({ item, index }) => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={sectionRef} className="lore-section" style={{
      opacity: 0,
      transform: 'translateY(40px)',
      transition: 'all 1s ease',
      marginBottom: '80px',
      paddingLeft: index % 2 === 0 ? '0' : '40px',
      paddingRight: index % 2 === 0 ? '40px' : '0',
      borderLeft: index % 2 === 0 ? 'none' : '1px solid var(--gold-dim)',
      borderRight: index % 2 === 0 ? '1px solid var(--gold-dim)' : 'none',
      textAlign: index % 2 === 0 ? 'right' : 'left'
    }}>
      <h2 style={{ fontFamily: 'Cinzel Decorative', fontSize: '32px', color: 'var(--parchment)', marginBottom: '8px' }}>{item.title}</h2>
      <h3 style={{ fontFamily: 'Cinzel', fontSize: '12px', color: 'var(--gold)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '24px' }}>{item.subtitle}</h3>
      <p style={{ fontFamily: 'IM Fell English', fontSize: '18px', color: 'var(--ash)', lineHeight: '1.8' }}>{item.content}</p>
    </div>
  )
}

const Lore = () => {
  const [lore, setLore] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    getLore().then(data => {
      setLore(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="page-transition" style={{ paddingTop: '120px', background: '#000', minHeight: '100vh', paddingBottom: '100px' }}>
      <SectionHeader
        eyebrow="ANCIENT SECRETS"
        title="The Realm of<br/><em>Westeros</em>"
        subtitle="Discover the deep history, major regions, and atmospheric storytelling of the Seven Kingdoms."
        rune="♜"
      />
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--gold)', marginTop: '40px' }}>Consulting ancient texts...</div>
      ) : lore && lore.length > 0 ? (
        <div style={{ maxWidth: '900px', margin: '60px auto', padding: '0 40px' }}>
          {lore.map((item, idx) => (
            <LoreSection key={item.id} item={item} index={idx} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', fontFamily: 'IM Fell English', marginTop: '40px' }}>
          Lore texts unavailable. Awaiting verified historical API records.
        </div>
      )}
    </div>
  )
}

export default Lore