import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Maximize, ArrowRight } from 'lucide-react';
import { dummyProperties } from '../data/properties';

export default function FeaturedProperties() {
    const featured = dummyProperties.slice(0, 3);

    return (
        <section className="py-24 px-6 md:px-16 bg-obsidian border-b border-white/5 relative z-20">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <h3 className="font-sans font-bold tracking-widest uppercase text-sm text-ivory/80">
                                Featured Assets
                            </h3>
                        </div>
                        <h2 className="font-sans font-bold text-3xl md:text-5xl tracking-tight text-ivory">
                            Upcoming <span className="font-drama italic font-normal text-white">Highlights</span>
                        </h2>
                    </div>
                    <Link
                        to="/properties"
                        className="group flex items-center gap-2 text-sm font-medium text-ivory/80 hover:text-white transition-colors uppercase tracking-widest"
                    >
                        View Full Catalogue
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featured.map((property, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            key={property.id}
                            className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors shadow-2xl flex flex-col"
                        >
                            {/* Image Header */}
                            <div className="h-64 relative overflow-hidden">
                                <img
                                    src={property.image}
                                    alt={property.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-80" />

                                {/* Status Badge */}
                                <div className="absolute top-4 left-4 bg-obsidian/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                    <span className="font-mono text-[10px] tracking-widest uppercase font-semibold text-ivory">{property.status}</span>
                                </div>

                                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                    <span className="font-mono text-xs text-white/70 bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                                        REF {property.id}
                                    </span>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-2 gap-4">
                                    <h3 className="font-sans font-bold text-xl leading-tight text-ivory group-hover:text-accent transition-colors line-clamp-2">
                                        {property.title}
                                    </h3>
                                </div>

                                <p className="text-sm text-ivory/60 mb-6 flex items-start gap-2 line-clamp-2">
                                    <MapPin size={16} className="shrink-0 mt-0.5" />
                                    {property.location}
                                </p>

                                <div className="grid grid-cols-2 gap-4 mb-8 mt-auto pt-6 border-t border-white/10">
                                    <div className="flex flex-col">
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-ivory/40 mb-1">Pricing</span>
                                        <span className="font-sans font-medium text-sm text-ivory">{property.price}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-mono text-[10px] uppercase tracking-widest text-ivory/40 mb-1">Scale</span>
                                        <span className="flex items-center gap-1 font-sans font-medium text-sm text-ivory">
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
                </div>
            </div>
        </section>
    );
}
