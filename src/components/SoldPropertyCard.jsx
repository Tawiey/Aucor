import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { PROPERTY_IMAGE_FALLBACK } from '../data/properties';

export default function SoldPropertyCard({ property, index = 0 }) {
    return (
        <motion.article
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-white/10 bg-white/[0.04] shadow-[0_24px_60px_rgba(0,0,0,0.16)] backdrop-blur-sm"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={property.image}
                    alt={property.title}
                    onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = PROPERTY_IMAGE_FALLBACK;
                    }}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />

                <span className="absolute right-4 top-4 rounded-[0.8rem] bg-accent px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_rgba(230,46,45,0.22)]">
                    Sold
                </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
                <h3 className="min-h-[3.5rem] text-xl font-semibold leading-tight text-white">
                    {property.title}
                </h3>

                <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-white/66">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-white/36" />
                    {property.location}
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-white/42">
                    <Calendar size={14} className="text-white/32" />
                    Sold via auction · {property.auctionDate}
                </div>

                <Link
                    to={`/properties/${property.id}`}
                    className="group mt-6 inline-flex items-center justify-center gap-2 rounded-[1rem] border border-white/10 bg-white/[0.04] py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/18 hover:bg-white/[0.08]"
                >
                    View Details
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
            </div>
        </motion.article>
    );
}
