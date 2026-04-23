import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SoldPropertyCard from './SoldPropertyCard';
import { featuredSoldProperties } from '../data/properties';

export default function FeaturedSoldProperties() {
    return (
        <section className="theme-bg px-6 py-24 md:px-16 md:py-28">
            <div className="mx-auto max-w-7xl">
                <div className="relative overflow-hidden rounded-[2.6rem] border theme-border theme-surface-2 px-6 py-8 shadow-[0_28px_80px_rgba(0,0,0,0.22)] md:px-10 md:py-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,46,45,0.1)_0%,transparent_42%)]" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

                    <div className="max-w-2xl">
                        <div className="relative z-10 mb-4 flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-sm font-bold uppercase tracking-widest theme-text-muted">
                                Closed sales
                            </span>
                        </div>

                        <h2 className="relative z-10 text-3xl font-bold tracking-tight theme-text md:text-[2.6rem]">
                            Recently sold
                        </h2>
                    </div>

                    <div className="relative z-10 mt-10 grid gap-6 lg:grid-cols-3">
                        {featuredSoldProperties.map((property, index) => (
                            <SoldPropertyCard key={property.id} property={property} index={index} />
                        ))}
                    </div>

                    <div className="relative z-10 mt-10 flex justify-center">
                        <Link
                            to="/selling"
                            className="group relative inline-flex min-h-[3.5rem] items-center justify-center overflow-hidden rounded-[1.1rem] bg-accent px-6 py-3 text-base font-semibold text-white shadow-[0_18px_32px_rgba(230,46,45,0.2)] transition-colors duration-300 hover:bg-accent/92"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Sell your property
                                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                            </span>
                            <span className="absolute inset-0 block translate-y-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
