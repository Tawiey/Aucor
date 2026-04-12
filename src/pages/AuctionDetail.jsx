import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Calendar, ChevronLeft, MapPin } from 'lucide-react';
import AuctionCountdown from '../components/AuctionCountdown';
import AuctionProcessSummary from '../components/AuctionProcessSummary';
import AuctionPropertyCard from '../components/AuctionPropertyCard';
import {
    calculateAuctionTimeLeft,
    formatAuctionDateLong,
    formatAuctionTimeLong,
    getAuctionBySlug,
    getAuctionProperties,
    getAuctionPropertyCountLabel
} from '../data/auctions';

const PRE_REGISTER_TO = '/contact';

export default function AuctionDetail() {
    const { slug } = useParams();
    const auction = getAuctionBySlug(slug);
    const properties = getAuctionProperties(auction);
    const [timeLeft, setTimeLeft] = useState(() => (
        auction ? calculateAuctionTimeLeft(auction.dateTime) : { days: 0, hours: 0, minutes: 0, seconds: 0 }
    ));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    useEffect(() => {
        if (!auction) {
            return undefined;
        }

        const timer = setInterval(() => setTimeLeft(calculateAuctionTimeLeft(auction.dateTime)), 1000);
        return () => clearInterval(timer);
    }, [auction]);

    if (!auction) {
        return (
            <div className="min-h-screen theme-bg theme-text px-6 pb-24 pt-32 md:px-16">
                <div className="mx-auto flex max-w-3xl flex-col items-start gap-6 rounded-[2.5rem] border border-white/8 bg-[linear-gradient(145deg,rgba(14,14,18,0.96),rgba(22,15,18,0.92))] p-10 shadow-[0_30px_90px_rgba(0,0,0,0.2)]">
                    <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent/90">
                        Auction not found
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                        We couldn&apos;t find that auction event.
                    </h1>
                    <p className="max-w-2xl text-lg leading-relaxed text-ivory/66">
                        The link may be outdated or the event may have been removed from the current auction programme.
                    </p>
                    <Link
                        to="/auctions"
                        className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-white/18 hover:bg-white/[0.08]"
                    >
                        View auctions
                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen theme-bg theme-text pb-24 pt-24">
            <header className="relative overflow-hidden border-b border-white/8">
                <div className="absolute inset-0">
                    <img src={auction.heroImage} alt={auction.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,8,12,0.78),rgba(8,8,12,0.92))]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,46,45,0.16),transparent_24%)]" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-10 md:px-16 md:pb-20 md:pt-12">
                    <div className="flex flex-wrap items-center gap-2 text-sm text-white/56">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/auctions" className="hover:text-white transition-colors">Auctions</Link>
                        <span>/</span>
                        <span className="text-white/86">{auction.title}</span>
                    </div>

                    <div className="mt-8 max-w-4xl">
                        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent/90">
                            {formatAuctionDateLong(auction.dateTime)} · {auction.city}
                        </p>
                        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-6xl md:leading-[0.98]">
                            {auction.title}
                        </h1>
                        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ivory/68">
                            {auction.description}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
                            <span className="inline-flex items-center gap-2">
                                <Calendar size={15} className="text-accent/80" />
                                {formatAuctionDateLong(auction.dateTime)} · {formatAuctionTimeLong(auction.dateTime)}
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <MapPin size={15} className="text-accent/80" />
                                {auction.location}
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 md:px-16">
                <section
                    id="pre-register"
                    className="relative -mt-10 grid gap-8 rounded-[2.4rem] border border-white/8 bg-[linear-gradient(145deg,rgba(14,14,18,0.98),rgba(22,15,18,0.94))] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.2)] md:grid-cols-[minmax(0,1.15fr)_minmax(21rem,0.85fr)] md:p-10"
                >
                    <div>
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-accent/90">
                            Auction information
                        </p>
                        <h2 className="text-3xl font-semibold tracking-tight text-white">
                            Everything you need before auction day.
                        </h2>
                        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ivory/66">
                            {auction.registrationSummary}
                        </p>

                        <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                            <div>
                                <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/42">Date & time</dt>
                                <dd className="mt-2 text-sm font-medium text-white">{formatAuctionDateLong(auction.dateTime)} · {formatAuctionTimeLong(auction.dateTime)}</dd>
                            </div>
                            <div>
                                <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/42">Auction type</dt>
                                <dd className="mt-2 text-sm font-medium text-white">{auction.category}</dd>
                            </div>
                            <div>
                                <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/42">Venue</dt>
                                <dd className="mt-2 text-sm font-medium text-white">{auction.venue}</dd>
                            </div>
                            <div>
                                <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/42">Properties on this auction</dt>
                                <dd className="mt-2 text-sm font-medium text-white">{getAuctionPropertyCountLabel(auction)}</dd>
                            </div>
                        </dl>
                    </div>

                    <div className="rounded-[2rem] border border-white/8 bg-white/[0.04] p-5 md:p-6">
                        <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent/90">
                            Time remaining until auction
                        </p>
                        <div className="mt-5">
                            <AuctionCountdown timeLeft={timeLeft} variant="detail" />
                        </div>

                        <div className="mt-6 flex flex-col gap-3">
                            <Link
                                to={PRE_REGISTER_TO}
                                className="group relative inline-flex min-h-[3.35rem] items-center justify-center overflow-hidden rounded-[1.1rem] bg-accent px-5 py-3 text-center text-sm font-semibold text-white transition-colors duration-300 hover:bg-accent/92"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    {auction.registrationLabel}
                                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                                </span>
                                <span className="absolute inset-0 z-0 block translate-y-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
                            </Link>

                            <Link
                                to="/auctions"
                                className="group inline-flex min-h-[3.35rem] items-center justify-center gap-2 rounded-[1.1rem] border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/18 hover:bg-white/[0.07] hover:text-white"
                            >
                                <ChevronLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
                                View auctions
                            </Link>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-3xl">
                            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent/90">
                                Properties on this auction
                            </p>
                            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-[2.4rem]">
                                Browse the assets currently scheduled for this event.
                            </h2>
                            <p className="mt-4 text-base leading-relaxed text-ivory/66">
                                Explore the property mix for this auction and dive deeper into each opportunity before bidding day.
                            </p>
                        </div>
                        <Link
                            to="/properties"
                            className="group inline-flex items-center gap-2 text-sm font-medium text-white/58 transition-colors duration-300 hover:text-accent"
                        >
                            View full catalogue
                            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                        {properties.map((property, index) => (
                            <AuctionPropertyCard
                                key={property.id}
                                property={property}
                                auction={auction}
                                index={index}
                            />
                        ))}
                    </div>
                </section>

                <AuctionProcessSummary />
            </div>
        </div>
    );
}
