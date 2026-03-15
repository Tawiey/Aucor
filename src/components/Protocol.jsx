import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const steps = [
    {
        num: '01',
        title: 'Multiple Auction Event',
        desc: 'Multiple monthly auctions are held in Johannesburg at The Houghton Golf Club. The venue is centrally located for convenience, and protocols are in place to ensure a smooth, professional event day for every guest.',
        image: '/istrfry-marcus-VLjIWo_Kmao-unsplash.jpg',
        accent: 'event'
    },
    {
        num: '02',
        title: 'Registration',
        desc: 'All potential bidders are required to register for the auction and pay a refundable registration fee of R50,000. FICA requirements must be met, and a convenient pre-registration facility is available on the Aucor Property website.',
        image: '/property-images/syed-ayan-malik-DI3MlpRdYeE-unsplash.jpg',
        accent: 'registration'
    },
    {
        num: '03',
        title: 'Auction',
        desc: 'The live auction begins at 11h00 and is conducted by a highly skilled accredited auctioneer. Buyers who cannot attend in person are able to bid telephonically by prior arrangement, and the auction is also live streamed online.',
        image: '/property-images/dj-steiner-DLpgvZWOnuU-unsplash.jpg',
        accent: 'auction'
    },
    {
        num: '04',
        title: 'Sale Agreement',
        desc: 'The highest bidder is assisted in signing the Conditions of Sale Agreement, and the deposit and commission are paid into the Aucor Property Trust Account. The signed offer is then presented to the seller, who may accept or reject the bid if the reserve price is not met.',
        image: '/property-images/wrs-tm-pl-TCkIri6lxEo-unsplash.jpg',
        accent: 'agreement'
    }
];

function AccentOverlay({ accent }) {
    if (accent === 'event') {
        return (
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(230,46,45,0.12),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_55%)]" />
                <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
                <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 border-dashed animate-[spin_22s_linear_infinite]" />
                <span className="absolute left-[58%] top-[38%] h-3 w-3 rounded-full bg-accent shadow-[0_0_22px_rgba(230,46,45,0.55)] animate-pulse" />
            </div>
        );
    }

    if (accent === 'registration') {
        return (
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(230,46,45,0.1),transparent_28%)]" />
                <div className="absolute left-[12%] top-[16%] h-[2px] w-[76%] bg-accent/70 blur-[0.5px] animate-[scanY_4.2s_ease-in-out_infinite]" />
                <div className="absolute bottom-[18%] left-[10%] right-[10%] grid gap-3">
                    {[0, 1, 2].map((line) => (
                        <div key={line} className="flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-sm">
                            <span className="h-2 w-2 rounded-full bg-accent/80" />
                            <span className="h-[1px] flex-1 bg-white/15" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (accent === 'auction') {
        return (
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,46,45,0.08),transparent_36%),linear-gradient(180deg,transparent,rgba(10,10,14,0.22))]" />
                <svg className="absolute inset-x-[8%] bottom-[18%] h-[32%] w-[84%]" viewBox="0 0 200 60" preserveAspectRatio="none">
                    <path
                        d="M0,40 C14,40 18,18 30,18 C42,18 44,50 58,50 C72,50 76,26 88,26 C102,26 104,10 116,10 C128,10 132,42 146,42 C160,42 164,24 176,24 C188,24 192,34 200,34"
                        fill="none"
                        stroke="#E62E2D"
                        strokeWidth="1.6"
                        strokeDasharray="260"
                        strokeDashoffset="260"
                        className="animate-[dash_3.4s_ease-out_infinite]"
                    />
                </svg>
                <div className="absolute bottom-[17%] left-[10%] right-[10%] h-px bg-white/10" />
            </div>
        );
    }

    return (
        <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(230,46,45,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_45%)]" />
            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15" />
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/60 shadow-[0_0_30px_rgba(230,46,45,0.18)]" />
            <div className="absolute bottom-[14%] left-[13%] right-[13%] rounded-[1.5rem] border border-white/10 bg-black/20 px-5 py-4 backdrop-blur-sm">
                <div className="mb-3 h-[1px] w-1/2 bg-white/20" />
                <div className="grid gap-2">
                    <div className="h-[1px] w-full bg-white/10" />
                    <div className="h-[1px] w-[78%] bg-white/10" />
                    <div className="h-[1px] w-[64%] bg-white/10" />
                </div>
            </div>
        </div>
    );
}

function VisualPanel({ step }) {
    return (
        <div className="relative h-[42vh] w-full overflow-hidden rounded-[2rem] border border-white/8 bg-obsidian shadow-[0_22px_60px_rgba(0,0,0,0.28)] md:h-[62vh]">
            <img
                src={step.image}
                alt={step.title}
                className="h-full w-full object-cover opacity-28 grayscale transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(10,10,14,0.52),rgba(10,10,14,0.78)),radial-gradient(circle_at_top_right,rgba(230,46,45,0.06),transparent_22%)]" />
            <AccentOverlay accent={step.accent} />
        </div>
    );
}

export default function Protocol() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.protocol-card');

            cards.forEach((card, i) => {
                if (i === cards.length - 1) return;

                const innerCard = card.querySelector('.protocol-card-inner');

                ScrollTrigger.create({
                    trigger: card,
                    start: 'top top',
                    endTrigger: cards[i + 1],
                    end: 'top top',
                    pin: true,
                    pinSpacing: false,
                    anticipatePin: 1,
                    invalidateOnRefresh: true
                });

                gsap.to(innerCard, {
                    scale: 0.9,
                    opacity: 0.3,
                    filter: 'blur(10px)',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: cards[i + 1],
                        start: 'top bottom',
                        end: 'top top',
                        scrub: true,
                        invalidateOnRefresh: true
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="w-full bg-obsidian pb-[10dvh]" id="process">
            <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pt-24 md:px-6 md:pt-28">
                <div className="max-w-3xl">
                    <div className="mb-4 flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-sm font-bold uppercase tracking-widest text-ivory/55">
                            Auction Process
                        </span>
                    </div>

                    <h2 className="text-4xl font-bold tracking-tight text-ivory md:text-5xl lg:text-6xl">
                        How It Works
                    </h2>

                    <p className="mt-5 max-w-2xl text-lg font-light leading-relaxed text-ivory/60">
                        A clear view of what happens from event registration through to the final sale agreement.
                    </p>
                </div>
            </div>

            {steps.map((step, index) => (
                <div
                    key={step.num}
                    className="protocol-card relative flex h-[100dvh] w-full items-center justify-center bg-obsidian px-6"
                    style={{ zIndex: index + 1 }}
                >
                    <div className="protocol-card-inner mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-20">
                        <div className="flex flex-col gap-6">
                            <span className="font-mono text-xl tracking-widest text-accent border border-accent/20 px-3 py-1 rounded w-max">
                                {step.num}
                            </span>

                            <h2 className="font-sans text-5xl font-bold tracking-tight text-ivory md:text-6xl">
                                {step.title}
                            </h2>

                            <p className="max-w-xl text-lg leading-relaxed text-ivory/62 md:text-xl">
                                {step.desc}
                            </p>
                        </div>

                        <VisualPanel step={step} />
                    </div>
                </div>
            ))}
        </section>
    );
}
