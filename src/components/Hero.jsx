import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import UpcomingAuction from './UpcomingAuction';
import TrustedByMarquee from './TrustedByMarquee';

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
        <section ref={containerRef} className="relative min-h-[100dvh] w-full overflow-hidden px-6 pb-16 pt-36 md:px-16 md:pb-20 md:pt-40" id="home">
            {/* Background Image & Overlays */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/istrfry-marcus-VLjIWo_Kmao-unsplash.jpg"
                    alt="Luxury Architecture"
                    className="w-full h-full object-cover"
                />
                {/* Heavy gradient overlay pushing from bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/80 to-transparent bottom-0 h-full" />
                <div className="absolute inset-0 bg-obsidian/20 mix-blend-multiply" />
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-10rem)] w-[92%] max-w-7xl flex-col justify-end md:w-[94%]">
                <div className="grid items-end gap-10 pb-6 pt-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(24rem,0.95fr)] lg:gap-12 lg:pb-10 lg:pt-20">
                    <div className="max-w-3xl">
                        <h1 className="hero-reveal mt-7 font-sans text-[3.35rem] font-bold leading-[0.98] tracking-[-0.045em] text-ivory sm:text-[4.1rem] md:text-[5rem] xl:text-[5.8rem]">
                            The team that delivers results.
                        </h1>

                        <p className="hero-reveal mt-6 max-w-xl text-base leading-relaxed text-ivory/70 md:text-lg">
                            Auction-led property marketing for owners who need buyer confidence, speed, and sharper price discovery.
                        </p>
                    </div>

                    <UpcomingAuction />
                </div>

                <TrustedByMarquee />
            </div>
        </section>
    );
}
