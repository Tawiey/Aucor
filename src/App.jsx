import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PropertiesCatalog from './pages/PropertiesCatalog';
import PropertyDetail from './pages/PropertyDetail';
import Auctions from './pages/Auctions';
import AuctionDetail from './pages/AuctionDetail';
import Services from './pages/Services';
import Contact from './pages/Contact';
import About from './pages/About';
import Team from './pages/Team';
import Selling from './pages/Selling';
import Careers from './pages/Careers';
import StyleKit from './pages/StyleKit';

function App() {
  const location = useLocation();
  const isStyleKitRoute = location.pathname.startsWith('/style-kit');

  if (isStyleKitRoute) {
    return (
      <Routes>
        <Route path="/style-kit" element={<StyleKit />} />
      </Routes>
    );
  }

  return (
    <div className="theme-bg theme-text min-h-screen selection:bg-accent selection:text-white relative">
      <div className="noise-overlay"></div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<PropertiesCatalog />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/auctions" element={<Auctions />} />
        <Route path="/auctions/:slug" element={<AuctionDetail />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/selling" element={<Selling />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/style-kit" element={<StyleKit />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
