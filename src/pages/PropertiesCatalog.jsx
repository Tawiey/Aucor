import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Maximize, Calendar, ArrowRight, Search as SearchIcon } from 'lucide-react';
import { dummyProperties, PROPERTY_IMAGE_FALLBACK } from '../data/properties';

export default function PropertiesCatalog() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [filteredProperties, setFilteredProperties] = useState(dummyProperties);

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // Simple mock filter based on keyword query in Title, City, or Suburb
        if (query) {
            const lowerQ = query.toLowerCase();
            setFilteredProperties(dummyProperties.filter(p =>
                p.title.toLowerCase().includes(lowerQ) ||
                p.city.toLowerCase().includes(lowerQ) ||
                p.suburb.toLowerCase().includes(lowerQ)
            ));
        } else {
            setFilteredProperties(dummyProperties);
        }
    }, [query]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ q: query });
    };

    return (
        <div className="pt-32 pb-24 px-6 md:px-16 min-h-screen theme-bg theme-text">
            <div className="max-w-7xl mx-auto">

                {/* Header & Inline Search */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 border-b border-white/10 pb-8">
                    <div>
                        <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-4 theme-text">
                            Curated <span className="font-drama italic font-normal text-accent">Properties</span>
                        </h1>
                        <p className="theme-text-muted font-light max-w-lg">
                            Explore our exclusive catalogue of high-yield commercial, residential, and industrial opportunities hitting the auction floor.
                        </p>
                    </div>

                    <form onSubmit={handleSearch} className="w-full md:w-auto min-w-[300px] relative">
                        <SearchIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40" />
                        <input
                            type="text"
                            placeholder="Search catalogue..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full theme-input border rounded-full h-12 pl-12 pr-4 text-sm theme-text font-sans outline-none focus:border-accent/50 transition-all placeholder:theme-text-subtle"
                        />
                    </form>
                </div>

                {/* Results Grid */}
                <AnimatePresence mode="popLayout">
                    {filteredProperties.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-24 text-center border theme-border rounded-3xl theme-surface"
                        >
                            <p className="font-mono theme-text-muted uppercase tracking-widest text-sm mb-2">No results found</p>
                            <p className="theme-text-muted">Try adjusting your search criteria.</p>
                        </motion.div>
                    ) : (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredProperties.map((property, idx) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                                    key={property.id}
                                    className="group theme-bg border theme-border rounded-2xl overflow-hidden hover:border-accent/20 transition-colors shadow-2xl flex flex-col"
                                >
                                    {/* Image Header */}
                                    <div className="h-64 relative overflow-hidden">
                                        <img
                                            src={property.image}
                                            alt={property.title}
                                            onError={(event) => {
                                                event.currentTarget.onerror = null;
                                                event.currentTarget.src = PROPERTY_IMAGE_FALLBACK;
                                            }}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />

                                        {/* Status Badge */}
                                        <div className="absolute top-4 left-4 bg-obsidian/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                            <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-ivory">{property.status}</span>
                                        </div>

                                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                            <span className="font-mono text-xs theme-text-muted bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                                                REF {property.id}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex justify-between items-start mb-2 gap-4">
                                            <h3 className="font-sans font-bold text-xl leading-tight theme-text group-hover:text-accent transition-colors line-clamp-2">
                                                {property.title}
                                            </h3>
                                        </div>

                                        <p className="text-sm theme-text-muted mb-6 flex items-start gap-2 line-clamp-2">
                                            <MapPin size={16} className="shrink-0 mt-0.5" />
                                            {property.location}
                                        </p>

                                        <div className="grid grid-cols-2 gap-4 mb-8 mt-auto pt-6 border-t border-white/10">
                                            <div className="flex flex-col">
                                                <span className="font-mono text-[10px] uppercase tracking-widest theme-text-subtle mb-1">Pricing</span>
                                                <span className="font-sans font-medium text-sm theme-text">{property.price}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-mono text-[10px] uppercase tracking-widest theme-text-subtle mb-1">Size</span>
                                                <span className="flex items-center gap-1 font-sans font-medium text-sm theme-text">
                                                    <Maximize size={12} className="text-ivory/40" /> {property.size}
                                                </span>
                                            </div>
                                        </div>

                                        <Link
                                            to={`/properties/${property.id}`}
                                            className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-ivory py-3 rounded-xl font-medium text-sm transition-all"
                                        >
                                            View Details
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
