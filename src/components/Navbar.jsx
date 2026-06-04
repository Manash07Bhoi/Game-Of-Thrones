import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { getSearchIndex } from '../services/contentService'
import './Navbar.css'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchIndex, setSearchIndex] = useState([])

  const location = useLocation()
  const navigate = useNavigate()
  const searchInputRef = useRef(null)

  useEffect(() => {
    getSearchIndex().then(data => {
      if (data) setSearchIndex(data)
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchQuery) {
        setSearchResults([])
        return
      }
      const term = searchQuery.toLowerCase()
      const results = searchIndex.filter(item =>
        item.title.toLowerCase().includes(term) || item.content.toLowerCase().includes(term)
      ).slice(0, 8)
      setSearchResults(results)
    }, 0)
    return () => clearTimeout(timer)
  }, [searchQuery, searchIndex])

  const handleSearchResultClick = (url) => {
    setSearchOpen(false)
    setSearchQuery('')
    navigate(url)
  }

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = windowHeight > 0 ? `${totalScroll / windowHeight}` : 0;
      setScrollProgress(scroll);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location])

  // Scroll locking for mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [mobileMenuOpen])

  // Close menu on route change
  useEffect(() => {
    // Timeout pushes the setState out of the synchronous render cycle
    const timer = setTimeout(() => {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

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
          <li>
            <button
              onClick={() => { setSearchOpen(!searchOpen); setTimeout(() => searchInputRef.current?.focus(), 100); }}
              style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontFamily: 'Cinzel', fontSize: '12px' }}
            >
              SEARCH
            </button>
          </li>
        </ul>
        <button
          className={`got-mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="menu-icon-line"></span>
          <span className="menu-icon-line"></span>
          <span className="menu-icon-line"></span>
        </button>
      </nav>

      {/* Search Overlay */}
      <div className={`got-search-overlay ${searchOpen ? 'open' : ''}`}>
        <button className="got-search-close" onClick={() => setSearchOpen(false)}>✕</button>
        <div className="got-search-container">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search the Realm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="got-search-input"
          />
          <div className="got-search-results">
            {searchResults.map(result => (
              <div
                key={result.id}
                className="got-search-result-item"
                onClick={() => handleSearchResultClick(result.url)}
              >
                <span className="result-type">{result.type}</span>
                <span className="result-title">{result.title}</span>
              </div>
            ))}
            {searchQuery && searchResults.length === 0 && (
              <div style={{ color: 'var(--ash)', textAlign: 'center', marginTop: '20px' }}>No ravens brought news of that...</div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={`got-mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={(e) => {
          // Close menu if clicking strictly on the overlay background
          if (e.target === e.currentTarget) {
            setMobileMenuOpen(false)
          }
        }}
      >
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
