import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building2, AlignLeft, SlidersHorizontal } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function SearchBar() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        city: '',
        suburb: '',
        type: ''
    });

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (searchQuery.trim()) {
            params.set('q', searchQuery.trim());
        }

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            }
        });

        const queryString = params.toString();
        navigate(queryString ? `/properties?${queryString}` : '/properties');
    };

    const handleFilterChange = (key) => (event) => {
        setFilters((current) => ({
            ...current,
            [key]: event.target.value
        }));
    };

    const selectClass = "h-11 w-full rounded-full border border-white/10 bg-white/[0.03] pl-10 pr-4 text-sm text-ivory/88 outline-none transition-all duration-300 appearance-none hover:border-white/20 hover:bg-white/[0.045] focus:border-white/28 focus:bg-white/[0.06]";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
            className="relative z-30 w-full"
        >
            <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(13,13,18,0.82),rgba(13,13,18,0.6))] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl md:p-4">
                <form onSubmit={handleSearch}>
                    <div className="flex flex-col gap-3 md:flex-row md:items-center">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-ivory/36" />
                            <input
                                type="text"
                                placeholder="Search by suburb, asset, street, or reference..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-14 w-full rounded-full border border-white/10 bg-white/[0.04] pl-14 pr-4 text-[15px] text-ivory outline-none transition-all duration-300 placeholder:text-ivory/30 hover:border-white/20 hover:bg-white/[0.05] focus:border-white/28 focus:bg-white/[0.07] md:h-16"
                            />
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-auto">
                            <button
                                type="button"
                                onClick={() => setShowFilters((current) => !current)}
                                aria-expanded={showFilters}
                                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-xs font-medium uppercase tracking-[0.2em] text-ivory/70 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
                            >
                                <SlidersHorizontal size={14} />
                                Filters
                            </button>
                            <button
                                type="submit"
                                className="inline-flex h-11 items-center justify-center rounded-full border border-white/14 bg-white px-5 text-xs font-semibold uppercase tracking-[0.22em] text-obsidian shadow-[0_8px_20px_rgba(255,255,255,0.08)] transition-all duration-300 hover:-translate-y-[1px] hover:border-white/24 hover:bg-ivory hover:shadow-[0_14px_30px_rgba(255,255,255,0.16)] active:translate-y-0"
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    <AnimatePresence initial={false}>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, y: -8 }}
                                animate={{ opacity: 1, height: 'auto', y: 0 }}
                                exit={{ opacity: 0, height: 0, y: -8 }}
                                transition={{ duration: 0.28, ease: 'easeOut' }}
                                className="overflow-hidden"
                            >
                                <div className="mt-3 grid gap-2 border-t border-white/8 pt-3 md:grid-cols-3">
                                    <div className="relative">
                                        <MapPin size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/38" />
                                        <select value={filters.city} onChange={handleFilterChange('city')} className={selectClass}>
                                            <option value="">City</option>
                                            <option value="johannesburg">Johannesburg</option>
                                            <option value="capetown">Cape Town</option>
                                            <option value="durban">Durban</option>
                                        </select>
                                    </div>

                                    <div className="relative">
                                        <AlignLeft size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/38" />
                                        <select value={filters.suburb} onChange={handleFilterChange('suburb')} className={selectClass}>
                                            <option value="">Suburb</option>
                                            <option value="sandton">Sandton</option>
                                            <option value="blackheath">Blackheath</option>
                                            <option value="chloorkop">Chloorkop</option>
                                        </select>
                                    </div>

                                    <div className="relative">
                                        <Building2 size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/38" />
                                        <select value={filters.type} onChange={handleFilterChange('type')} className={selectClass}>
                                            <option value="">Asset type</option>
                                            <option value="commercial">Commercial</option>
                                            <option value="industrial">Industrial</option>
                                            <option value="residential">Residential</option>
                                        </select>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </form>
            </div>
        </motion.div>
    );
}
