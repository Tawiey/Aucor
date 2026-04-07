import { auctionProcessSteps } from '../data/auctionProcess';

export default function AuctionProcessSummary() {
    return (
        <section className="rounded-[2.4rem] border border-white/8 bg-[linear-gradient(160deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.16)] md:p-10">
            <div className="max-w-3xl">
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-accent/90">
                    How it works
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white md:text-[2.1rem]">
                    Auction day, registration, and the path to sale in one place.
                </h2>
                <p className="mt-4 text-base leading-relaxed text-ivory/66">
                    Use this summary for the key steps bidders need before event day, during the live session, and immediately after a successful bid.
                </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {auctionProcessSteps.map((step) => (
                    <article
                        key={step.num}
                        className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5"
                    >
                        <span className="inline-flex rounded-full border border-accent/20 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                            {step.num}
                        </span>
                        <h3 className="mt-4 text-lg font-semibold text-white">
                            {step.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-ivory/64">
                            {step.desc}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}
