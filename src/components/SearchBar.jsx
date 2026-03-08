import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Building2, AlignLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SearchBar() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/properties?q=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate('/properties');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="w-full max-w-5xl mx-auto -mt-24 relative z-30 px-6"
        >
            <div className="bg-obsidian/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">

                <div className="flex items-center gap-3 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <h3 className="font-sans font-bold tracking-widest uppercase text-sm text-ivory/80">
                        Property Intelligence Search
                    </h3>
                </div>

                <form onSubmit={handleSearch} className="flex flex-col gap-4">
                    {/* Top Row: Dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative group/input">
                            <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40 group-focus-within/input:text-accent transition-colors" />
                            <select className="w-full bg-white/5 border border-white/10 rounded-xl h-12 pl-12 pr-4 text-sm text-ivory font-mono appearance-none outline-none focus:border-accent/50 focus:bg-white/10 transition-all cursor-pointer">
                                <option value="" className="bg-obsidian">Filter by City</option>
                                <option value="johannesburg" className="bg-obsidian">Johannesburg</option>
                                <option value="capetown" className="bg-obsidian">Cape Town</option>
                                <option value="durban" className="bg-obsidian">Durban</option>
                            </select>
                        </div>

                        <div className="relative group/input">
                            <AlignLeft size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40 group-focus-within/input:text-accent transition-colors" />
                            <select className="w-full bg-white/5 border border-white/10 rounded-xl h-12 pl-12 pr-4 text-sm text-ivory font-mono appearance-none outline-none focus:border-accent/50 focus:bg-white/10 transition-all cursor-pointer">
                                <option value="" className="bg-obsidian">Filter by Suburb</option>
                                <option value="sandton" className="bg-obsidian">Sandton</option>
                                <option value="blackheath" className="bg-obsidian">Blackheath</option>
                                <option value="chloorkop" className="bg-obsidian">Chloorkop</option>
                            </select>
                        </div>

                        <div className="relative group/input">
                            <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40 group-focus-within/input:text-accent transition-colors" />
                            <select className="w-full bg-white/5 border border-white/10 rounded-xl h-12 pl-12 pr-4 text-sm text-ivory font-mono appearance-none outline-none focus:border-accent/50 focus:bg-white/10 transition-all cursor-pointer">
                                <option value="" className="bg-obsidian">Property Type</option>
                                <option value="commercial" className="bg-obsidian">Commercial</option>
                                <option value="industrial" className="bg-obsidian">Industrial</option>
                                <option value="residential" className="bg-obsidian">Residential</option>
                            </select>
                        </div>
                    </div>

                    {/* Bottom Row: Free Text & Submit */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1 group/input">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/40 group-focus-within/input:text-accent transition-colors" />
                            <input
                                type="text"
                                placeholder="Search by keyword, address, or web ref..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-xl h-14 pl-12 pr-4 text-sm text-ivory font-sans outline-none focus:border-accent/50 focus:bg-white/10 transition-all placeholder:text-ivory/30"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-accent text-white h-14 px-10 rounded-xl font-bold tracking-widest text-sm uppercase hover:bg-accent/90 transition-colors shadow-[0_0_20px_rgba(230,46,45,0.2)] hover:shadow-[0_0_30px_rgba(230,46,45,0.4)]"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
}
