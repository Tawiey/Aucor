import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function ContentBlock({ section }) {
    if (section.type === 'grid') {
        return (
            <section className="grid gap-6 md:grid-cols-2">
                {section.items.map((item) => (
                    <article
                        key={item.title}
                        className="overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(160deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.16)]"
                    >
                        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.26em] text-accent/90">
                            {item.eyebrow}
                        </p>
                        <h3 className="text-2xl font-semibold tracking-tight text-white">
                            {item.title}
                        </h3>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/66 md:text-[15px]">
                            {item.body}
                        </p>
                    </article>
                ))}
            </section>
        );
    }

    return (
        <section className="rounded-[2.25rem] border border-white/8 bg-[linear-gradient(160deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.16)] md:p-10">
            <div className="max-w-3xl">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.26em] text-accent/90">
                    {section.eyebrow}
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-[2.1rem]">
                    {section.title}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-ivory/68">
                    {section.body}
                </p>
            </div>
        </section>
    );
}

export default function ContentPageShell({
    eyebrow,
    title,
    intro,
    sections,
    cta
}) {
    return (
        <div className="min-h-screen theme-bg theme-text px-6 pb-24 pt-32 md:px-16">
            <div className="mx-auto flex max-w-7xl flex-col gap-14">
                <header className="overflow-hidden rounded-[2.75rem] border border-white/8 bg-[linear-gradient(145deg,rgba(14,14,18,0.96),rgba(22,15,18,0.92))] px-7 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.2)] md:px-12 md:py-14">
                    <div className="max-w-4xl">
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-accent/90">
                            {eyebrow}
                        </p>
                        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl md:leading-[0.98]">
                            {title}
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-ivory/66">
                            {intro}
                        </p>
                    </div>
                </header>

                <div className="flex flex-col gap-8">
                    {sections.map((section) => (
                        <ContentBlock key={section.title} section={section} />
                    ))}
                </div>

                {cta && (
                    <section className="flex flex-col items-start gap-4 rounded-[2.25rem] border border-white/8 bg-white/[0.03] px-7 py-8 md:flex-row md:items-center md:justify-between md:px-10">
                        <div className="max-w-2xl">
                            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.26em] text-accent/90">
                                {cta.eyebrow}
                            </p>
                            <h2 className="text-2xl font-semibold tracking-tight text-white">
                                {cta.title}
                            </h2>
                            <p className="mt-3 text-sm leading-relaxed text-ivory/66">
                                {cta.body}
                            </p>
                        </div>

                        <Link
                            to={cta.to}
                            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors duration-300"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                {cta.label}
                                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                            <span className="absolute inset-0 z-0 block translate-y-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
                        </Link>
                    </section>
                )}
            </div>
        </div>
    );
}
