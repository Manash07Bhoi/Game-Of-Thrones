import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Houses from './pages/Houses'
import HouseDetail from './pages/HouseDetail'
import Characters from './pages/Characters'
import CharacterDetail from './pages/CharacterDetail'
import Battles from './pages/Battles'
import BattleDetail from './pages/BattleDetail'
import Lore from './pages/Lore'
import './App.css'

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/houses" element={<Houses />} />
        <Route path="/houses/:id" element={<HouseDetail />} />

        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />

        <Route path="/battles" element={<Battles />} />
        <Route path="/battles/:id" element={<BattleDetail />} />

        <Route path="/lore" element={<Lore />} />
      </Routes>
    </Router>
  )
}

export default App