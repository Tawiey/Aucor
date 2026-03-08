import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';
export default function Protocol() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.protocol-card');

            cards.forEach((card, i) => {
                if (i === cards.length - 1) return; // Last card doesn't scale down

                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    endTrigger: cards[i + 1],
                    end: "top top",
                    pin: true,
                    pinSpacing: false,
                });

                gsap.to(card, {
                    scale: 0.9,
                    opacity: 0.3,
                    filter: "blur(10px)",
                    ease: "none",
                    scrollTrigger: {
                        trigger: cards[i + 1],
                        start: "top bottom",
                        end: "top top",
                        scrub: true,
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const steps = [
        {
            num: "01",
            title: "Submit Asset",
            desc: "Provide details for rapid appraisal. We analyze market standing and potential yield to structure the auction.",
            Graphic: () => (
                <div className="w-full h-full flex items-center justify-center relative bg-obsidian border border-white/5 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,46,45,0.1)_0%,transparent_70%)]" />
                    <svg className="w-1/2 h-1/2 animate-[spin_20s_linear_infinite]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
                        <circle cx="50" cy="50" r="40" strokeDasharray="4 4" className="text-ivory/20" />
                        <circle cx="50" cy="50" r="25" className="text-ivory/40" />
                        <polygon points="50,10 60,35 90,35 65,55 75,85 50,65 25,85 35,55 10,35 40,35" className="text-accent" />
                    </svg>
                </div>
            )
        },
        {
            num: "02",
            title: "Market Exposure",
            desc: "Instant syndication to our curated network of pre-approved high-net-worth investors and institutional buyers.",
            Graphic: () => (
                <div className="w-full h-full flex flex-col justify-center relative bg-obsidian border border-white/5 rounded-2xl overflow-hidden px-8">
                    <div className="w-full h-[60%] grid grid-cols-10 grid-rows-6 gap-2 opacity-30">
                        {Array(60).fill(0).map((_, i) => (
                            <div key={i} className="bg-ivory/30 rounded-sm" />
                        ))}
                    </div>
                    <div className="absolute left-0 right-0 h-[2px] bg-accent blur-[1px] animate-[pulse_2s_infinite]"
                        style={{ animation: 'scan 4s cubic-bezier(0.4, 0, 0.2, 1) infinite' }} />
                    <style>{`
            @keyframes scan {
              0% { top: 20%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { top: 80%; opacity: 0; }
            }
          `}</style>
                </div>
            )
        },
        {
            num: "03",
            title: "The Auction",
            desc: "Competitive bidding environment driving immediate liquidity and securing optimal market value execution.",
            Graphic: () => (
                <div className="w-full h-full flex items-center justify-center relative bg-obsidian border border-white/5 rounded-2xl overflow-hidden">
                    <svg className="w-full h-1/2" viewBox="0 0 200 50" preserveAspectRatio="none">
                        <path
                            d="M0,25 C20,25 30,10 40,25 C50,40 60,25 70,25 C90,25 95,5 100,25 C105,45 110,25 130,25 C150,25 160,15 170,25 C180,35 190,25 200,25"
                            fill="none"
                            stroke="#E62E2D"
                            strokeWidth="1.5"
                            strokeDasharray="200"
                            strokeDashoffset="200"
                            className="animate-[dash_3s_linear_infinite]"
                        />
                    </svg>
                    <style>{`
            @keyframes dash {
              to {
                stroke-dashoffset: 0;
              }
            }
          `}</style>
                </div>
            )
        }
    ];

    return (
        <div ref={containerRef} className="bg-obsidian w-full pb-[10dvh]" id="process">
            {steps.map((step, i) => (
                <div
                    key={i}
                    className="protocol-card h-[100dvh] w-full flex items-center justify-center px-6 sticky top-0 bg-obsidian"
                >
                    <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 md:gap-20 items-center">
                        {/* Logic / Content side */}
                        <div className="flex flex-col gap-6">
                            <span className="font-mono text-xl tracking-widest text-accent border border-accent/20 px-3 py-1 rounded w-max">
                                {step.num}
                            </span>
                            <h2 className="font-sans font-bold text-5xl md:text-6xl tracking-tight text-ivory">
                                {step.title}
                            </h2>
                            <p className="font-light text-lg md:text-xl text-ivory/60 leading-relaxed max-w-lg">
                                {step.desc}
                            </p>
                        </div>
                        {/* Visual side */}
                        <div className="h-[40vh] md:h-[60vh] w-full">
                            <step.Graphic />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
