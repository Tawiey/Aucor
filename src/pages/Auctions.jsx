import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import AuctionCountdown from '../components/AuctionCountdown';
import {
    calculateAuctionTimeLeft,
    formatAuctionDateLong,
    formatAuctionDay,
    formatAuctionMonth,
    formatAuctionTimeLong,
    getAuctionProperties,
    getAuctionPropertyCountLabel,
    getNextAuction,
    getAuctionRoute,
    upcomingAuctions
} from '../data/auctions';
import { PROPERTY_IMAGE_FALLBACK } from '../data/properties';

function AuctionEventCard({ auction }) {
    const previewProperties = getAuctionProperties(auction).slice(0, 3);

    return (
        <Link
            to={getAuctionRoute(auction.slug)}
            className="group flex h-full flex-col overflow-hidden rounded-[1.9rem] bg-[linear-gradient(160deg,rgba(255,255,255,0.02),rgba(255,255,255,0.008))] shadow-[0_18px_50px_rgba(0,0,0,0.16)] ring-1 ring-white/[0.05] transition-transform duration-300 hover:-translate-y-1 hover:ring-white/[0.1]"
        >
            <div className="px-6 pb-5 pt-6">
                <span className="inline-flex rounded-full bg-accent/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-accent">
                    {formatAuctionMonth(auction.dateTime)}
                </span>
                <div className="mt-5 flex items-end gap-3">
                    <span className="font-mono text-[4.2rem] font-semibold leading-none text-white">
                        {formatAuctionDay(auction.dateTime)}
                    </span>
                    <span className="pb-2 font-mono text-[10px] uppercase tracking-[0.26em] text-white/40">
                        Live event
                    </span>
                </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
                <h2 className="text-2xl font-semibold tracking-tight text-white">
                    {auction.title}
                </h2>

                <div className="mt-5 flex flex-col gap-3 text-sm text-white/58">
                    <span className="inline-flex items-center gap-2">
                        <Calendar size={14} className="text-accent/80" />
                        {formatAuctionDateLong(auction.dateTime)} · {formatAuctionTimeLong(auction.dateTime)}
                    </span>
                    <span className="inline-flex items-center gap-2">
                        <MapPin size={14} className="text-accent/80" />
                        {auction.location}
                    </span>
                </div>

                {previewProperties.length > 0 && (
                    <div className="mt-6">
                        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/42">
                            Included properties
                        </span>

                        <div className="mt-3 flex items-center gap-3">
                            {previewProperties.map((property) => (
                                <div key={property.id} className="h-16 w-20 overflow-hidden rounded-[1rem] bg-white/[0.03]">
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        onError={(event) => {
                                            event.currentTarget.onerror = null;
                                            event.currentTarget.src = PROPERTY_IMAGE_FALLBACK;
                                        }}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/6 pt-5">
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/52">
                        {getAuctionPropertyCountLabel(auction)}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors duration-300 group-hover:text-accent">
                        View auction
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function Auctions() {
    const nextAuction = getNextAuction();
    const [timeLeft, setTimeLeft] = useState(() => calculateAuctionTimeLeft(nextAuction.dateTime));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateAuctionTimeLeft(nextAuction.dateTime)), 1000);
        return () => clearInterval(timer);
    }, [nextAuction.dateTime]);

    return (
        <div className="min-h-screen theme-bg theme-text px-6 pb-24 pt-32 md:px-16">
            <div className="mx-auto flex max-w-7xl flex-col gap-12">
                <section className="relative overflow-hidden rounded-[2.15rem] shadow-[0_24px_70px_rgba(0,0,0,0.2)] ring-1 ring-white/[0.05]">
                    <img
                        src={nextAuction.heroImage}
                        alt={nextAuction.title}
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(10,10,14,0.92)_0%,rgba(10,10,14,0.78)_42%,rgba(18,12,16,0.74)_70%,rgba(18,12,16,0.82)_100%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,59,48,0.14),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%,rgba(0,0,0,0.16)_100%)]" />

                    <div className="relative z-10 grid min-h-[24rem] items-end gap-8 p-7 md:min-h-[25rem] md:grid-cols-[minmax(0,1.08fr)_minmax(18rem,0.82fr)] md:p-10 lg:gap-10">
                        <div className="max-w-[36rem]">
                            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent/90">
                                Next auction
                            </p>
                            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-[2.45rem]">
                                {nextAuction.title}
                            </h2>
                            <p className="mt-3 max-w-[31rem] text-[15px] leading-relaxed text-ivory/68 md:text-base">
                                {nextAuction.summary}
                            </p>

                            <div className="mt-5 flex flex-col gap-3 text-sm text-white/62">
                                <span className="inline-flex items-center gap-2">
                                    <Calendar size={14} className="text-accent/80" />
                                    {formatAuctionDateLong(nextAuction.dateTime)} · {formatAuctionTimeLong(nextAuction.dateTime)}
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <MapPin size={14} className="text-accent/80" />
                                    {nextAuction.location}
                                </span>
                            </div>

                            <div className="mt-7 flex flex-wrap items-center gap-3">
                                <Link
                                    to={getAuctionRoute(nextAuction.slug)}
                                    className="group relative inline-flex min-h-[3.2rem] items-center justify-center overflow-hidden rounded-[1.05rem] bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent/92"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        View auction
                                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                                    </span>
                                    <span className="absolute inset-0 z-0 block translate-y-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
                                </Link>

                                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/58 backdrop-blur-sm">
                                    {getAuctionPropertyCountLabel(nextAuction)}
                                </span>
                            </div>
                        </div>

                        <div className="w-full self-end md:justify-self-end">
                            <div className="max-w-[23rem] rounded-[1.5rem] border border-white/10 bg-black/18 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.18)] backdrop-blur-md md:ml-auto">
                                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent/90">
                                    Time to next auction
                                </p>
                                <div className="mt-3">
                                    <AuctionCountdown timeLeft={timeLeft} variant="detail" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="mb-8 max-w-3xl">
                        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent/90">
                            Browse upcoming auctions
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-[2.2rem]">
                            Upcoming sessions
                        </h2>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {upcomingAuctions.map((auction) => (
                            <AuctionEventCard key={auction.id} auction={auction} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
