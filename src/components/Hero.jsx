import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDownRight } from 'lucide-react';

export default function Hero() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.hero-reveal',
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: 'power3.out',
                    delay: 0.2
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-[100dvh] w-full overflow-hidden flex flex-col justify-end pb-24 px-6 md:px-16" id="home">
            {/* Background Image & Overlays */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                    alt="Luxury Architecture"
                    className="w-full h-full object-cover"
                />
                {/* Heavy gradient overlay pushing from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent bottom-0 h-full" />
                <div className="absolute inset-0 bg-obsidian/20 mix-blend-multiply" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl pt-20">
                <h1 className="flex flex-col gap-2">
                    <span className="hero-reveal font-sans font-bold text-xl md:text-3xl text-ivory/80 tracking-widest uppercase">
                        Curated investments meet
                    </span>
                    <span className="hero-reveal font-drama italic text-6xl md:text-[8rem] leading-[0.9] text-ivory">
                        Auction <br className="hidden md:block" /> precision.
                    </span>
                </h1>

                <p className="hero-reveal mt-8 mb-10 max-w-lg text-lg text-ivory/70 font-sans font-light leading-relaxed">
                    The curated marketplace for high-yield property investment. Fast sales. Competitive real-time discovery. Secure your deal.
                </p>

                <div className="hero-reveal flex flex-wrap items-center gap-4">
                    <button className="relative overflow-hidden group bg-accent text-white px-8 py-4 rounded-full font-medium text-sm transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
                        <span className="relative z-10 flex items-center gap-3 tracking-wide">
                            Find Properties
                            <ArrowDownRight size={18} />
                        </span>
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 block" />
                    </button>

                    <button className="px-8 py-4 rounded-full font-medium text-sm text-ivory border border-white/20 hover:bg-white/5 transition-colors duration-300 backdrop-blur-sm">
                        List Your Property
                    </button>
                </div>
            </div>
        </section>
    );
}
