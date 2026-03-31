import { useEffect, useMemo, useRef, useState } from 'react';

const STATS = [
    {
        id: 'sales-value',
        variant: 'hero',
        value: 17.96,
        decimals: 2,
        suffix: ' Billion',
        label: 'Rand value in sales',
        supportingCopy: 'Measured across transactions executed through Aucor Property.',
        accent: 'Market Value',
        duration: 2800
    },
    {
        id: 'properties-sold',
        variant: 'support',
        value: 1982,
        decimals: 0,
        suffix: '',
        label: 'Properties sold to date',
        supportingCopy: 'A long track record of closed deals across commercial and residential stock.',
        accent: 'Closed Transactions',
        duration: 2550
    },
    {
        id: 'combined-experience',
        variant: 'support',
        value: 300,
        decimals: 0,
        suffix: '',
        finalSuffix: '+',
        label: 'Years of combined industry experience',
        supportingCopy: 'Specialist expertise spanning brokerage, auctions, and investment advisory.',
        accent: 'Combined Expertise',
        duration: 2450
    }
];

function easeOutQuart(progress) {
    return 1 - Math.pow(1 - progress, 4);
}

function formatStatValue(stat, value, isComplete) {
    const roundedValue = stat.decimals > 0 ? value.toFixed(stat.decimals) : String(Math.round(value));
    const suffix = isComplete ? (stat.finalSuffix ?? stat.suffix ?? '') : (stat.suffix ?? '');
    return `${roundedValue}${suffix}`;
}

function StatShell({ children, className = '', isVisible, delay = 0 }) {
    return (
        <article
            className={`relative overflow-hidden rounded-[2.4rem] border border-white/8 bg-[linear-gradient(155deg,rgba(26,25,31,0.98),rgba(13,13,18,0.96))] shadow-[0_30px_90px_rgba(0,0,0,0.34)] transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.07),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(230,46,45,0.12),transparent_34%)]" />
                <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:36px_36px]" />
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
                <div className="absolute bottom-0 left-10 h-24 w-24 rounded-full bg-accent/12 blur-[48px]" />
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/[0.045] blur-[62px]" />
            </div>
            {children}
        </article>
    );
}

function HeroStatCard({ stat, value, isComplete, isVisible }) {
    return (
        <StatShell isVisible={isVisible} className="md:col-span-2 lg:min-h-[25rem]" delay={0}>
            <div className="relative z-10 flex h-full flex-col gap-10 p-8 md:p-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-3 rounded-full bg-white/[0.04] px-4 py-2">
                        <span className="relative flex h-3 w-3">
                            <span className="absolute inset-0 rounded-full bg-accent/45 blur-[4px]" />
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/62">
                            {stat.accent}
                        </span>
                    </div>

                    <div className="mt-8">
                        <p className="font-sans text-[3.9rem] font-semibold leading-[0.92] tracking-[-0.07em] text-white tabular-nums sm:text-[4.7rem] lg:text-[6.4rem]">
                            {formatStatValue(stat, value, isComplete)}
                        </p>
                        <p className="mt-5 max-w-[26rem] text-xl leading-tight text-ivory/88 md:text-2xl">
                            {stat.label}
                        </p>
                    </div>
                </div>

                <div className="lg:max-w-[18rem] lg:pb-2">
                    <div className="h-px w-24 bg-gradient-to-r from-accent/60 to-transparent" />
                    <p className="mt-6 text-sm leading-relaxed text-ivory/58 md:text-[15px]">
                        {stat.supportingCopy}
                    </p>
                </div>
            </div>
        </StatShell>
    );
}

function SupportStatCard({ stat, value, isComplete, isVisible, delay }) {
    return (
        <StatShell isVisible={isVisible} className="min-h-[19rem]" delay={delay}>
            <div className="relative z-10 flex h-full flex-col p-7 md:p-8">
                <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/54">
                        {stat.accent}
                    </span>
                    <span className="h-px w-14 bg-gradient-to-r from-white/10 to-accent/45" />
                </div>

                <div className="mt-10">
                    <p className="font-sans text-[3.2rem] font-semibold leading-[0.95] tracking-[-0.06em] text-white tabular-nums sm:text-[3.6rem]">
                        {formatStatValue(stat, value, isComplete)}
                    </p>
                    <p className="mt-4 text-lg leading-tight text-ivory/84">
                        {stat.label}
                    </p>
                </div>

                <p className="mt-auto pt-8 text-sm leading-relaxed text-ivory/56">
                    {stat.supportingCopy}
                </p>
            </div>
        </StatShell>
    );
}

export default function Features() {
    const sectionRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [values, setValues] = useState(() => STATS.map(() => 0));

    const heroStat = useMemo(() => STATS.find((stat) => stat.variant === 'hero'), []);
    const supportStats = useMemo(() => STATS.filter((stat) => stat.variant === 'support'), []);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    return;
                }

                setHasAnimated(true);
                observer.disconnect();
            },
            { threshold: 0.3 }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!hasAnimated) {
            return undefined;
        }

        let frameId = 0;
        const start = performance.now();

        const tick = (now) => {
            let shouldContinue = false;

            const nextValues = STATS.map((stat) => {
                const progress = Math.min((now - start) / stat.duration, 1);
                const easedProgress = easeOutQuart(progress);

                if (progress < 1) {
                    shouldContinue = true;
                }

                return stat.value * easedProgress;
            });

            setValues(nextValues);

            if (shouldContinue) {
                frameId = window.requestAnimationFrame(tick);
            }
        };

        frameId = window.requestAnimationFrame(tick);

        return () => window.cancelAnimationFrame(frameId);
    }, [hasAnimated]);

    return (
        <section
            ref={sectionRef}
            className="relative border-t border-white/5 bg-obsidian px-6 py-32 text-ivory md:px-16"
            id="features"
        >
            <div className="mx-auto max-w-6xl">
                <h2 className="mb-6 text-4xl font-sans font-bold tracking-tight md:text-5xl lg:text-6xl">
                    Engineered for <span className="font-drama font-normal italic text-accent">results.</span>
                </h2>
                <p className="mb-16 max-w-2xl text-lg font-light leading-relaxed text-ivory/60 md:mb-20">
                    The traditional market is slow. We engineered functional mechanisms designed to ignite liquidity, ensure price discovery, and deliver a premium curation of opportunities.
                </p>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {heroStat && (
                        <HeroStatCard
                            stat={heroStat}
                            value={Math.min(values[STATS.findIndex((stat) => stat.id === heroStat.id)], heroStat.value)}
                            isComplete={values[STATS.findIndex((stat) => stat.id === heroStat.id)] >= heroStat.value}
                            isVisible={hasAnimated}
                        />
                    )}

                    {supportStats.map((stat, index) => {
                        const statIndex = STATS.findIndex((item) => item.id === stat.id);
                        const currentValue = values[statIndex];
                        const isComplete = currentValue >= stat.value;

                        return (
                            <SupportStatCard
                                key={stat.id}
                                stat={stat}
                                value={isComplete ? stat.value : currentValue}
                                isComplete={isComplete}
                                isVisible={hasAnimated}
                                delay={160 + index * 120}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
