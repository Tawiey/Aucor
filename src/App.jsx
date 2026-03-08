import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import UpcomingAuction from './components/UpcomingAuction';
import Home from './pages/Home';
import PropertiesCatalog from './pages/PropertiesCatalog';
import PropertyDetail from './pages/PropertyDetail';

function App() {
  return (
    <div className="bg-obsidian min-h-screen text-ivory selection:bg-accent selection:text-white relative">
      <div className="noise-overlay text-white"></div>
      <Navbar />
      <UpcomingAuction />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<PropertiesCatalog />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
