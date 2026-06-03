import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      <nav className="got-nav">
        <Link to="/" className="got-nav-logo">Game of Thrones</Link>
        <ul className="got-nav-links">
          <li><Link to="/lore">The Realm</Link></li>
          <li><Link to="/houses">Great Houses</Link></li>
          <li><Link to="/characters">Characters</Link></li>
          <li><Link to="/battles">History</Link></li>
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
              <Link to={item.path} onClick={() => setMobileMenuOpen(false)}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Navbar
