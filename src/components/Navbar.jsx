import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(scroll);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location])

  return (
    <>
      {/* Global Scroll Progress Bar */}
      <div className="global-progress-bar-wrap">
        <div className="global-progress-bar-fill" style={{ transform: `scaleX(${scrollProgress})` }} />
      </div>

      <nav className="got-nav">
        <Link to="/" className="got-nav-logo">Game of Thrones</Link>
        <ul className="got-nav-links">
          <li><NavLink to="/lore" className={({isActive}) => isActive ? 'active' : ''}>The Realm</NavLink></li>
          <li><NavLink to="/houses" className={({isActive}) => isActive ? 'active' : ''}>Great Houses</NavLink></li>
          <li><NavLink to="/characters" className={({isActive}) => isActive ? 'active' : ''}>Characters</NavLink></li>
          <li><NavLink to="/battles" className={({isActive}) => isActive ? 'active' : ''}>History</NavLink></li>
        </ul>
        <button className="got-mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span className="menu-icon-line"></span>
          <span className="menu-icon-line"></span>
          <span className="menu-icon-line"></span>
        </button>
      </nav>

      {/* Mobile Nav Overlay */}
      <div className={`got-mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="got-mobile-links">
          {[
            { label: 'The Realm', path: '/lore' },
            { label: 'Great Houses', path: '/houses' },
            { label: 'Characters', path: '/characters' },
            { label: 'History', path: '/battles' }
          ].map((item, i) => (
            <li key={item.label} style={{ transitionDelay: `${i * 0.1}s` }}>
              <NavLink to={item.path} className={({isActive}) => isActive ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Navbar
