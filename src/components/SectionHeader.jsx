import { useEffect, useRef } from 'react'

const SectionHeader = ({ eyebrow, title, subtitle, rune = "✦" }) => {
  const headingRef = useRef(null)
  const subRef = useRef(null)
  const descRef = useRef(null)

  useEffect(() => {
    const els = [subRef.current, headingRef.current, descRef.current].filter(Boolean)
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          els.forEach((el, i) =>
            setTimeout(() => el.classList.add('visible'), i * 150)
          )
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (headingRef.current) obs.observe(headingRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <header className="section1-header" style={{ marginBottom: '48px' }}>
      <p ref={subRef} className="section1-eyebrow fade-up">{eyebrow}</p>
      <div className="header-ornament">
        <span className="ornament-line" />
        <span className="ornament-rune">{rune}</span>
        <span className="ornament-line" />
      </div>
      <h1 ref={headingRef} className="section1-title fade-up" dangerouslySetInnerHTML={{ __html: title }} />
      {subtitle && <p ref={descRef} className="section1-subtitle fade-up" dangerouslySetInnerHTML={{ __html: subtitle }} />}
    </header>
  )
}

export default SectionHeader
