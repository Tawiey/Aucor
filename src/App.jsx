import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PropertiesCatalog from './pages/PropertiesCatalog';
import PropertyDetail from './pages/PropertyDetail';

function App() {
  return (
    <div className="theme-bg theme-text min-h-screen selection:bg-accent selection:text-white relative">
      <div className="noise-overlay"></div>
      <Navbar />

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
