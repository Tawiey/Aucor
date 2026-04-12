import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Maximize } from 'lucide-react';
import { PROPERTY_IMAGE_FALLBACK } from '../data/properties';
import { formatAuctionDateShort } from '../data/auctions';

export default function AuctionPropertyCard({ property, auction, index = 0 }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="theme-card border theme-border rounded-[1.7rem] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.16)] flex flex-col"
        >
            <div className="h-60 relative overflow-hidden">
                <img
                    src={property.image}
                    alt={property.title}
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = PROPERTY_IMAGE_FALLBACK;
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/78 via-transparent to-transparent" />

                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 backdrop-blur-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/88">On Auction</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/60">
                        {formatAuctionDateShort(auction.dateTime)}
                    </p>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
                <h3 className="font-sans text-xl font-bold leading-tight theme-text">
                    {property.title}
                </h3>

                <p className="mt-3 flex items-start gap-2 text-sm theme-text-muted">
                    <MapPin size={16} className="mt-0.5 shrink-0" />
                    {property.location}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t theme-border pt-5">
                    <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-ivory/56 mb-1">Pricing</span>
                        <span className="text-sm font-medium theme-text">{property.price}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-ivory/56 mb-1">Scale</span>
                        <span className="flex items-center gap-1 text-sm font-medium theme-text">
                            <Maximize size={12} className="theme-text-subtle" /> {property.size}
                        </span>
                    </div>
                </div>

                <Link
                    to={`/properties/${property.id}`}
                    className="group mt-6 inline-flex items-center justify-center gap-2 rounded-[1rem] border theme-border theme-surface-2 py-3 text-sm font-medium theme-text transition-all duration-300 hover:border-accent/40 hover:text-white"
                >
                    View property
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
            </div>
        </motion.article>
    );
}
