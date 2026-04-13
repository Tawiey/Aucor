import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, CheckCircle2, ChevronLeft, ArrowRight } from 'lucide-react';
import { allProperties, PROPERTY_IMAGE_FALLBACK } from '../data/properties';

export default function PropertyDetail() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Find property by ID in dummy data
        const found = allProperties.find(p => p.id === id);
        setProperty(found);
    }, [id]);

    if (!property) {
        return (
            <div className="min-h-screen flex items-center justify-center text-ivory">
                <p className="font-mono">Loading Asset Data...</p>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-24 min-h-screen theme-bg theme-text">

            {/* Top Navigation */}
            <div className="px-6 md:px-16 mb-8 mt-4 max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/properties" className="flex items-center gap-2 text-ivory/60 hover:text-white transition-colors text-sm font-medium">
                    <ChevronLeft size={16} />
                    Back to Catalogue
                </Link>
                <span className="font-mono text-xs text-accent bg-accent/10 px-3 py-1 rounded">REF: {property.id}</span>
            </div>

            {/* Main Container */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Left Column: Property Visuals & Details */}
                <div className="lg:col-span-8 flex flex-col gap-12">

                    {/* Main Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full aspect-video rounded-[2rem] overflow-hidden border border-white/10 relative group"
                    >
                        <img
                            src={property.image}
                            alt={property.title}
                            onError={(event) => {
                                event.currentTarget.onerror = null;
                                event.currentTarget.src = PROPERTY_IMAGE_FALLBACK;
                            }}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
                        <div className="absolute bottom-6 left-6 right-6">
                            <span className="font-mono text-[10px] uppercase tracking-widest bg-accent px-2 py-1 rounded text-white font-bold mb-3 inline-block">
                                {property.type}
                            </span>
                            <h1 className="font-sans font-bold text-3xl md:text-5xl tracking-tight leading-tight">
                                {property.title}
                            </h1>
                        </div>
                    </motion.div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-white/10">
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-[10px] text-ivory/40 uppercase tracking-widest">Pricing</span>
                            <span className="font-sans font-medium text-lg">{property.price}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-[10px] text-ivory/40 uppercase tracking-widest">Scale</span>
                            <span className="font-sans font-medium text-lg">{property.size}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-[10px] text-ivory/40 uppercase tracking-widest">Auction Date</span>
                            <span className="font-sans font-medium text-lg text-accent flex items-center gap-1">
                                <Calendar size={14} /> {property.auctionDate}
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-mono text-[10px] text-ivory/40 uppercase tracking-widest">Location</span>
                            <span className="font-sans font-medium text-sm flex items-start gap-1">
                                <MapPin size={14} className="shrink-0 mt-0.5 text-ivory/40" /> {property.suburb}, {property.city}
                            </span>
                        </div>
                    </div>

                    {/* Abstract / Description */}
                    <div>
                        <h3 className="font-sans font-bold text-2xl mb-4">Property Brief</h3>
                        <p className="font-light theme-text-muted leading-relaxed text-lg">
                            {property.description}
                        </p>
                    </div>

                    {/* Features Checklist */}
                    <div>
                        <h3 className="font-sans font-bold text-2xl mb-6">Key Specifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {property.features.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/5 rounded-xl p-4">
                                    <CheckCircle2 size={20} className="text-accent shrink-0" />
                                    <span className="font-sans text-ivory/80 text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column: Sticky Enquiry Form */}
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-32 flex flex-col gap-6">

                        {/* Enquiry Form */}
                        <div className="bg-obsidian/80 backdrop-blur-xl border theme-border rounded-[2rem] p-8 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 blur-[40px] rounded-full pointer-events-none" />

                            <h3 className="font-sans font-bold text-2xl mb-2">Make an Enquiry</h3>
                            <p className="text-sm theme-text-muted mb-8">Register your interest or request the full information pack for this asset.</p>

                            <form className="flex flex-col gap-4">
                                <div className="relative group">
                                    <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 border-b-white/30 rounded-t-xl h-12 px-4 text-sm outline-none focus:border-b-accent transition-colors peer" required />
                                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 peer-focus:scale-x-100 transition-transform origin-left" />
                                </div>
                                <div className="relative group">
                                    <input type="email" placeholder="Email Address" className="w-full bg-white/5 border border-white/10 border-b-white/30 h-12 px-4 text-sm outline-none focus:border-b-accent transition-colors peer" required />
                                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 peer-focus:scale-x-100 transition-transform origin-left" />
                                </div>
                                <div className="relative group">
                                    <input type="tel" placeholder="Cell Phone" className="w-full bg-white/5 border border-white/10 border-b-white/30 h-12 px-4 text-sm outline-none focus:border-b-accent transition-colors peer" />
                                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 peer-focus:scale-x-100 transition-transform origin-left" />
                                </div>
                                <div className="relative group mt-2">
                                    <textarea placeholder="Message / Specific Questions" rows={4} className="w-full bg-white/5 border border-white/10 border-b-white/30 rounded-b-xl p-4 text-sm outline-none focus:border-b-accent transition-colors peer resize-none" defaultValue={`I am interested in REF: ${property.id}`} />
                                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-accent scale-x-0 peer-focus:scale-x-100 transition-transform origin-left" />
                                </div>

                                <button type="submit" className="mt-4 relative overflow-hidden group bg-accent text-white px-6 py-4 rounded-xl font-medium w-full text-center">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Request Pack <ArrowRight size={16} />
                                    </span>
                                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 block" />
                                </button>
                            </form>
                        </div>

                        {/* Agent Contact Card */}
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left">
                            <img src={property.agent.image} alt={property.agent.name} className="w-16 h-16 rounded-full object-cover border-2 border-white/10 shadow-lg" />
                            <div className="flex flex-col gap-1">
                                <h4 className="font-sans font-bold">{property.agent.name}</h4>
                                <p className="font-mono text-[10px] text-ivory/60 uppercase">{property.agent.role}</p>
                                <div className="mt-2 flex flex-col gap-1">
                                    <span className="text-xs text-accent font-mono">{property.agent.phone}</span>
                                    <span className="text-xs text-ivory/80">{property.agent.email}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
