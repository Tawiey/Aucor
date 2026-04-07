import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import AuctionCountdown from './AuctionCountdown';
import {
    calculateAuctionTimeLeft,
    formatAuctionDateLong,
    formatAuctionDateShort,
    formatAuctionTimeLong,
    formatAuctionTimeShort,
    getAuctionPropertyCountLabel,
    getNextAuction,
    getAuctionRoute
} from '../data/auctions';

function FloatingAuctionReminder({ isVisible, auction, timeLeft }) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 70, y: 16, scale: 0.92 }}
                    animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 70, y: 16, scale: 0.92 }}
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                    className="fixed bottom-5 right-5 z-40 w-[248px] md:bottom-8 md:right-8 md:w-[268px]"
                >
                    <Link
                        to={getAuctionRoute(auction.slug)}
                        className="group block cursor-pointer text-left"
                    >
                        <div className="relative overflow-hidden rounded-[1.55rem] border border-white/10 bg-[linear-gradient(145deg,rgba(13,13,18,0.92),rgba(24,14,18,0.88))] p-3.5 shadow-2xl backdrop-blur-xl md:p-4">
                            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] translate-x-[-140%] skew-x-[-30deg] transition-transform duration-700 ease-out group-hover:translate-x-[150%]" />
                            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-accent/18 blur-[44px]" />

                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                                    <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/78 md:text-[10px]">
                                        Next Auction
                                    </span>
                                </div>
                                <Calendar size={14} className="text-accent/80" />
                            </div>

                            <div className="relative z-10 mt-3.5">
                                <AuctionCountdown timeLeft={timeLeft} variant="floating" />
                            </div>

                            <div className="relative z-10 mt-3.5 border-t border-white/10 pt-3 text-[11px] font-medium tracking-[0.01em] text-white/62 md:text-xs">
                                {formatAuctionDateShort(auction.dateTime)} • {formatAuctionTimeShort(auction.dateTime)}
                            </div>
                        </div>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function UpcomingAuction() {
    const nextAuction = getNextAuction();
    const [timeLeft, setTimeLeft] = useState(() => calculateAuctionTimeLeft(nextAuction.dateTime));
    const [isVisible, setIsVisible] = useState(false);
    const auctionRoute = getAuctionRoute(nextAuction.slug);

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateAuctionTimeLeft(nextAuction.dateTime)), 1000);
        return () => clearInterval(timer);
    }, [nextAuction.dateTime]);

    useEffect(() => {
        const handleScroll = () => {
            setIsVisible(window.scrollY > window.innerHeight * 0.5);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.72, delay: 0.36, ease: 'easeOut' }}
                className="hero-reveal relative w-full max-w-[38rem] justify-self-end"
            >
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(150deg,rgba(12,12,18,0.9),rgba(27,15,18,0.78))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-6">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,46,45,0.12)_0%,transparent_44%)]" />
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

                    <div className="relative z-10 flex items-start justify-between gap-5">
                        <div className="min-w-0">
                            <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/58">
                                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                                Upcoming Auction
                            </span>
                            <h2 className="mt-3 text-[1.75rem] font-bold leading-none tracking-tight text-white md:text-[1.95rem] md:leading-[1.02] md:whitespace-nowrap">
                                {nextAuction.title}
                            </h2>
                            <span className="mt-3 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/52">
                                {getAuctionPropertyCountLabel(nextAuction)}
                            </span>
                        </div>

                        <Link
                            to={auctionRoute}
                            className="group mt-0.5 hidden shrink-0 items-center gap-2 text-sm font-medium text-white/48 transition-colors duration-300 hover:text-accent md:inline-flex"
                        >
                            Auction details
                            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>
                    </div>

                    <div className="relative z-10 mt-6">
                        <AuctionCountdown timeLeft={timeLeft} variant="hero" />

                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/58">
                            <span className="inline-flex items-center gap-2">
                                <Calendar size={14} className="text-accent/72" />
                                {formatAuctionDateLong(nextAuction.dateTime)} • {formatAuctionTimeLong(nextAuction.dateTime)}
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <MapPin size={14} className="text-accent/72" />
                                {nextAuction.location}
                            </span>
                        </div>

                        <Link
                            to={auctionRoute}
                            className="group mt-4 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors duration-300 hover:text-accent md:hidden"
                        >
                            Auction details
                            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                                <Link
                                    to={auctionRoute}
                                    className="group relative inline-flex min-h-[3.35rem] items-center justify-center overflow-hidden rounded-[1.1rem] bg-accent px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_18px_32px_rgba(230,46,45,0.2)] transition-colors duration-300 hover:bg-accent/92 sm:min-w-[13.75rem]"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Pre-register to bid
                                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                                    </span>
                                    <span className="absolute inset-0 block translate-y-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
                                </Link>

                                <Link
                                    to="/selling"
                                    className="group inline-flex min-h-[3.35rem] items-center justify-center gap-2 rounded-[1.1rem] border border-white/10 bg-white/[0.035] px-5 py-3 text-sm font-medium text-white/68 transition-all duration-300 hover:border-white/18 hover:bg-white/[0.07] hover:text-white sm:min-w-[11.5rem]"
                                >
                                    <span>Sell your property</span>
                                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <FloatingAuctionReminder
                isVisible={isVisible}
                auction={nextAuction}
                timeLeft={timeLeft}
            />
        </>
    );
}
