import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SearchBar from './SearchBar';
import UpcomingAuction from './UpcomingAuction';

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
        <section ref={containerRef} className="relative min-h-[100dvh] w-full overflow-hidden px-6 pb-20 pt-40 md:px-16 md:pb-24 md:pt-44" id="home">
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
            <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-13rem)] w-full max-w-6xl flex-col justify-center">
                <div className="max-w-5xl">
                    <h1 className="hero-reveal font-drama text-[3rem] leading-[0.96] text-ivory md:text-[4.6rem] lg:whitespace-nowrap xl:text-[5.6rem]">
                        Find auction properties, fast.
                    </h1>

                    <p className="hero-reveal mt-5 max-w-2xl text-base leading-relaxed text-ivory/74 md:text-lg">
                        Search across commercial and residential auctions—built for serious buyers and sellers.
                    </p>
                </div>

                <div className="hero-reveal mt-10 w-full md:mt-12">
                    <SearchBar />
                </div>

                <div className="mt-14 md:mt-20">
                    <UpcomingAuction />
                </div>
            </div>
        </section>
    );
}
