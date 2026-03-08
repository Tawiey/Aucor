import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

export default function GetStarted() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.gs-reveal',
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-32 px-6 md:px-16 bg-obsidian text-ivory flex justify-center" id="contact">
            <div className="w-full max-w-6xl relative group">
                <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative bg-slate/10 border border-white/10 rounded-[3rem] p-12 md:p-24 overflow-hidden flex flex-col items-center text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] rounded-full pointer-events-none" />

                    <h2 className="gs-reveal font-sans font-bold text-4xl md:text-5xl lg:text-7xl tracking-tight mb-6 max-w-4xl leading-[1.1]">
                        Ready to secure your next <span className="font-drama italic text-accent font-normal">investment?</span>
                    </h2>

                    <p className="gs-reveal text-ivory/60 max-w-2xl text-lg font-light mb-12">
                        Register for upcoming property auctions and gain exclusive access to our curated marketplace of high-yield opportunities.
                    </p>

                    <div className="gs-reveal">
                        <button className="relative overflow-hidden group/btn bg-accent text-white px-10 py-5 rounded-full font-medium text-base md:text-lg transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-[0_0_30px_rgba(230,46,45,0.3)]">
                            <span className="relative z-10 flex items-center gap-3 tracking-wide">
                                Register Now
                                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                            </span>
                            <span className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 block" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
