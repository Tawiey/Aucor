import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import clsx from 'clsx';

function ShufflerCard() {
    const [items, setItems] = useState([
        { id: 1, text: "Under 30 Days to Close", label: "Speed" },
        { id: 2, text: "Accelerated Transactions", label: "Velocity" },
        { id: 3, text: "Swift Capital Liquidity", label: "Volume" },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setItems(prev => {
                const newArr = [...prev];
                const last = newArr.pop();
                newArr.unshift(last);
                return newArr;
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-slate/20 border border-white/5 rounded-[2rem] p-8 relative flex flex-col h-[320px] overflow-hidden group shadow-2xl">
            <h3 className="font-sans font-bold tracking-tight text-xl mb-2">Fast property sales</h3>
            <p className="text-sm text-ivory/60 mb-8">Optimized for velocity from listed to sold.</p>

            <div className="relative flex-1 mt-auto flex flex-col items-center justify-center">
                {items.map((item, i) => (
                    <div
                        key={item.id}
                        className="absolute rounded-xl border border-white/10 bg-obsidian p-5 w-full transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col gap-1 shadow-lg"
                        style={{
                            transform: `translateY(${i * 12}px) scale(${1 - i * 0.05})`,
                            opacity: 1 - i * 0.2,
                            zIndex: 10 - i,
                        }}
                    >
                        <span className="font-mono text-[10px] uppercase text-accent tracking-widest">[{item.label}]</span>
                        <span className="text-sm font-medium">{item.text}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function TypewriterCard() {
    const [text, setText] = useState('');
    const fullText = "Analyzing bids... Discovery active. True market value achieved via competitive auction protocol.";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, index));
            index++;
            if (index > fullText.length + 20) {
                index = 0;
                setText('');
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-slate/20 border border-white/5 rounded-[2rem] p-8 relative flex flex-col h-[320px] shadow-2xl">
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-sans font-bold tracking-tight text-xl w-3/4">Competitive price discovery</h3>
                <div className="flex items-center gap-2 bg-obsidian/50 px-3 py-1.5 rounded-full border border-white/5">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="font-mono text-[9px] font-bold tracking-wider text-ivory/80">LIVE</span>
                </div>
            </div>
            <p className="text-sm text-ivory/60 mb-8">Transparent auctions drive true market value.</p>

            <div className="mt-auto bg-obsidian/80 rounded-xl p-5 border border-white/5 font-mono text-[11px] md:text-xs text-accent min-h-[110px] leading-loose relative overflow-hidden flex items-start">
                <div className="w-full">
                    <span className="text-ivory/40 mr-2">{'>'}</span>
                    {text}
                    <span className="inline-block w-2 h-3 bg-accent ml-1 animate-pulse translate-y-0.5" />
                </div>
                <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-obsidian/80 to-transparent pointer-events-none" />
            </div>
        </div>
    );
}

function SchedulerCard() {
    const cursorRef = useRef(null);
    const containerRef = useRef(null);
    const [activeDay, setActiveDay] = useState(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            tl.set(cursorRef.current, { x: 0, y: 150, opacity: 0 });
            tl.to(cursorRef.current, { x: 60, y: 70, opacity: 1, duration: 0.8, ease: "power2.out" });
            tl.to(cursorRef.current, { x: 210, y: 40, duration: 1, ease: "power2.inOut" });
            tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
            tl.call(() => setActiveDay(4));
            tl.to(cursorRef.current, { scale: 1, duration: 0.1 });
            tl.to(cursorRef.current, { x: 140, y: 125, duration: 0.8, ease: "power2.inOut" }, "+=0.3");
            tl.to(cursorRef.current, { scale: 0.8, duration: 0.1 });
            tl.to(cursorRef.current, { scale: 1, duration: 0.1 });
            tl.call(() => setActiveDay(null), null, "+=0.2");
            tl.to(cursorRef.current, { y: 200, opacity: 0, duration: 0.5 });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <div ref={containerRef} className="bg-slate/20 border border-white/5 rounded-[2rem] p-8 relative flex flex-col h-[320px] shadow-2xl overflow-hidden">
            <h3 className="font-sans font-bold tracking-tight text-xl mb-2">Curated marketplace</h3>
            <p className="text-sm text-ivory/60 mb-8">Access pre-vetted investment opportunities.</p>

            <div className="mt-auto relative w-full flex flex-col items-center bg-obsidian/50 p-4 rounded-xl border border-white/5">
                <div className="grid grid-cols-7 gap-1.5 w-full mb-5">
                    {days.map((d, i) => (
                        <div
                            key={i}
                            className={clsx(
                                "aspect-square rounded border flex items-center justify-center font-mono text-xs transition-colors duration-300",
                                activeDay === i ? "bg-accent border-accent text-white shadow-[0_0_15px_rgba(230,46,45,0.4)]" : "border-white/5 text-ivory/30 bg-obsidian"
                            )}
                        >
                            {d}
                        </div>
                    ))}
                </div>

                <div className="w-2/3 mx-auto py-2.5 rounded border border-white/10 text-center font-mono text-[10px] text-ivory/80 bg-obsidian transition-colors duration-300">
                    SECURE INVESTMENT
                </div>

                <div ref={cursorRef} className="absolute top-0 left-0 w-7 h-7 z-20 pointer-events-none drop-shadow-xl" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 3.21V20.8C5.5 21.43 6.25 21.76 6.7 21.32L10.51 17.65L14.71 22.82C14.89 23.05 15.21 23.11 15.46 22.95L17.22 21.84C17.47 21.68 17.54 21.34 17.37 21.1L13.19 16H19.5C20.15 16 20.48 15.23 20.02 14.78L5.5 3.21Z" fill="white" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default function Features() {
    return (
        <section className="py-32 px-6 md:px-16 bg-obsidian text-ivory relative border-t border-white/5" id="features">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-tight mb-6">
                    Engineered for <span className="text-accent italic font-drama font-normal">results.</span>
                </h2>
                <p className="text-ivory/60 max-w-2xl mb-20 text-lg font-light leading-relaxed">
                    The traditional market is slow. We engineered functional mechanisms designed to ignite liquidity, ensure price discovery, and deliver a premium curation of opportunities.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ShufflerCard />
                    <TypewriterCard />
                    <SchedulerCard />
                </div>
            </div>
        </section>
    );
}
