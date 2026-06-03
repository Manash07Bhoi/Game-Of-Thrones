import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Houses from './pages/Houses'
import Characters from './pages/Characters'
import Battles from './pages/Battles'
import Lore from './pages/Lore'
import './App.css'

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/houses" element={<Houses />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/battles" element={<Battles />} />
        <Route path="/lore" element={<Lore />} />
      </Routes>
    </Router>
  )
}

export default App
