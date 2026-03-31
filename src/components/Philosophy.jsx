import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Philosophy() {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax Image
            gsap.to(imageRef.current, {
                yPercent: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            });

            // Line-by-line text reveal
            gsap.fromTo(
                '.phil-reveal',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 60%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[90dvh] w-full bg-obsidian text-ivory flex items-center justify-center overflow-hidden py-32 px-6"
        >
            {/* Background with Parallax */}
            <div className="absolute inset-0 z-0">
                <div ref={imageRef} className="absolute -top-[10%] -bottom-[10%] -left-[5%] -right-[5%] w-[110%] h-[120%]">
                    <img
                        src="https://images.unsplash.com/photo-1629079447746-991f8c1f010c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Dark Marble Texture"
                        className="w-full h-full object-cover opacity-15"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-12">
                <div className="flex flex-col gap-4 items-center">
                    <div className="phil-reveal overflow-hidden">
                        <span className="font-sans font-medium text-lg md:text-xl text-ivory/60 tracking-wide">
                            Most real estate focuses on:
                        </span>
                    </div>
                    <div className="phil-reveal overflow-hidden">
                        <span className="font-sans font-light text-xl md:text-2xl text-ivory/50 block">
                            conventional listings and prolonged negotiations.
                        </span>
                    </div>
                </div>

                <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-transparent phil-reveal" />

                <div className="flex flex-col gap-6 items-center">
                    <div className="phil-reveal overflow-hidden">
                        <span className="font-sans font-bold text-xl md:text-2xl tracking-widest uppercase">
                            We focus on:
                        </span>
                    </div>
                    <div className="phil-reveal px-4 pb-4">
                        <h2 className="font-drama text-5xl md:text-7xl lg:text-[6rem] leading-[1.16] text-ivory">
                            Price discovery<br className="hidden md:block" /> driven by <span className="text-accent">competitive</span> bidding.
                        </h2>
                    </div>
                </div>
            </div>
        </section>
    );
}
