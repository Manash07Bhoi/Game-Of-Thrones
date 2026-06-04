import { useState, useEffect, useRef, useMemo } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import Fuse from 'fuse.js'
import { getSearchIndex } from '../services/contentService'
import './Navbar.css'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Search State
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchIndex, setSearchIndex] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const location = useLocation()
  const navigate = useNavigate()
  const searchInputRef = useRef(null)

  // Initialize Fuse.js for smart fuzzy searching
  const fuse = useMemo(() => new Fuse(searchIndex, {
    keys: [
      { name: 'title', weight: 2 },
      { name: 'content', weight: 1 }
    ],
    threshold: 0.3,
    includeScore: true
  }), [searchIndex])

  useEffect(() => {
    getSearchIndex().then(data => {
      if (data) setSearchIndex(data)
    })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!searchQuery) {
        setSearchResults([])
        setSelectedIndex(-1)
        return
      }
      const results = fuse.search(searchQuery).slice(0, 10).map(res => res.item)
      setSearchResults(results)
      setSelectedIndex(results.length > 0 ? 0 : -1)
    }, 150) // slight debounce
    return () => clearTimeout(timer)
  }, [searchQuery, fuse])

  useEffect(() => {
    const handleSearchResultClick = (url) => {
      setSearchOpen(false)
      setSearchQuery('')
      navigate(url)
    }

    // Keyboard Navigation for Search
    const handleKeyDown = (e) => {
      if (!searchOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : prev))
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : 0))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (selectedIndex >= 0 && searchResults[selectedIndex]) {
          handleSearchResultClick(searchResults[selectedIndex].url)
        }
      } else if (e.key === 'Escape') {
        setSearchOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [searchOpen, searchResults, selectedIndex, navigate])

  const handleSearchResultClickUI = (url) => {
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
            placeholder="Search characters, houses, battles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="got-search-input"
          />
          <div className="got-search-results">
            {searchResults.map((result, i) => (
              <div
                key={result.id}
                className={`got-search-result-item ${i === selectedIndex ? 'selected' : ''}`}
                onClick={() => handleSearchResultClickUI(result.url)}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <span className="result-type">{result.type}</span>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="result-title">{result.title}</span>
                  {result.content !== result.title && (
                    <span style={{ fontSize: '12px', color: 'var(--ash)', fontFamily: 'IM Fell English', fontStyle: 'italic', marginTop: '4px' }}>
                      {result.content.length > 60 ? result.content.substring(0, 60) + '...' : result.content}
                    </span>
                  )}
                </div>
              </div>
            ))}
            {!searchQuery && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '16px' }}>
                <span style={{ color: 'var(--gold-dim)', fontSize: '10px', textTransform: 'uppercase', width: '100%', textAlign: 'center', marginBottom: '8px', fontFamily: 'Cinzel' }}>Popular Searches</span>
                {['Jon Snow', 'House Stark', 'Battle of the Bastards', 'Daenerys'].map(term => (
                   <button key={term} onClick={() => setSearchQuery(term)} className="got-search-pill">{term}</button>
                ))}
              </div>
            )}
            {searchQuery && searchResults.length === 0 && (
              <div style={{ color: 'var(--ash)', textAlign: 'center', marginTop: '20px', fontFamily: 'IM Fell English', fontStyle: 'italic' }}>No ravens brought news of "{searchQuery}"...</div>
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
