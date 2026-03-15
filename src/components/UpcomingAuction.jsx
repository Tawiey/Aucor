import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format } from 'date-fns';
import { X, Calendar, MapPin, ArrowRight, Clock3 } from 'lucide-react';

const TARGET_DATE = new Date('2026-03-17T11:00:00');
const AUCTION_TITLE = 'Prime Commercial Showcase';
const AUCTION_LOCATION = 'The Houghton Golf Club, Johannesburg';
const AUCTION_DIRECTIONS = '#';
const AUCTION_DATE_SHORT = format(TARGET_DATE, 'dd MMM yyyy');
const AUCTION_DATE_LONG = format(TARGET_DATE, 'd MMMM yyyy');
const AUCTION_TIME = '11:00 AM';
const AUCTION_TIME_LONG = '11h00 SAST';

const countdownUnits = [
    { key: 'days', label: 'Days', shortLabel: 'D' },
    { key: 'hours', label: 'Hours', shortLabel: 'H' },
    { key: 'minutes', label: 'Minutes', shortLabel: 'M' },
    { key: 'seconds', label: 'Seconds', shortLabel: 'S' }
];

function calculateTimeLeft() {
    const now = new Date();

    if (now >= TARGET_DATE) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: differenceInDays(TARGET_DATE, now),
        hours: differenceInHours(TARGET_DATE, now) % 24,
        minutes: differenceInMinutes(TARGET_DATE, now) % 60,
        seconds: differenceInSeconds(TARGET_DATE, now) % 60
    };
}

function formatNumber(num) {
    return num.toString().padStart(2, '0');
}

function AnimatedValue({ value, className }) {
    return (
        <span className={className}>
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={value}
                    initial={{ y: 10, opacity: 0, filter: 'blur(4px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -10, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.24, ease: 'easeOut' }}
                    className="inline-block"
                >
                    {formatNumber(value)}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

function CountdownRow({ timeLeft, compact = false, rail = false }) {
    const containerClass = rail
        ? 'grid grid-cols-4 gap-2'
        : 'grid grid-cols-4 gap-2 md:gap-3';
    const cellClass = rail
        ? 'rounded-[1.15rem] border border-white/8 bg-white/[0.025] px-2.5 py-2 text-center md:px-3'
        : 'rounded-[1.4rem] border border-white/10 bg-white/[0.04] px-3 py-3 text-center md:px-4';
    const valueClass = rail
        ? 'font-mono text-xl font-semibold tracking-tight text-white md:text-2xl'
        : compact
            ? 'font-mono text-2xl font-semibold tracking-tight text-white md:text-[2rem]'
            : 'font-mono text-[2.2rem] font-semibold tracking-tight text-white md:text-[2.6rem]';
    const labelClass = rail
        ? 'mt-1 text-[9px] uppercase tracking-[0.24em] text-white/34'
        : 'mt-1 text-[10px] uppercase tracking-[0.28em] text-white/42 md:text-[11px]';

    return (
        <div className={containerClass}>
            {countdownUnits.map((unit) => (
                <motion.div
                    key={unit.key}
                    layout
                    whileHover={rail ? undefined : { y: -2 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={cellClass}
                >
                    <AnimatedValue
                        value={timeLeft[unit.key]}
                        className={valueClass}
                    />
                    <div className={labelClass}>
                        {compact ? unit.shortLabel : unit.label}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

function AuctionModal({ isExpanded, onClose, timeLeft }) {
    return (
        <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                >
                    <div
                        className="absolute inset-0 bg-obsidian/82 backdrop-blur-2xl"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ scale: 0.93, y: 32, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.93, y: 32, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 280, damping: 26, delay: 0.08 }}
                        className="relative flex w-full max-w-5xl flex-col gap-10 overflow-hidden rounded-[2.5rem] border border-accent/20 bg-[linear-gradient(150deg,rgba(13,13,18,0.98),rgba(24,14,18,0.95))] p-8 shadow-[0_0_100px_rgba(230,46,45,0.14)] md:flex-row md:p-12"
                    >
                        <motion.div
                            animate={{ x: [0, 12, 0], y: [0, -10, 0] }}
                            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                            className="pointer-events-none absolute right-[-3rem] top-[-2rem] h-40 w-40 rounded-full bg-accent/18 blur-[70px]"
                        />

                        <button
                            onClick={onClose}
                            className="absolute right-5 top-5 z-20 rounded-full bg-white/5 p-3 text-ivory transition-colors hover:bg-white/10 hover:text-accent"
                        >
                            <X size={22} />
                        </button>

                        <div className="relative z-10 flex flex-1 flex-col">
                            <div className="mb-8 flex items-center gap-3">
                                <div className="h-3 w-3 rounded-full bg-accent animate-pulse" />
                                <span className="font-mono text-sm uppercase tracking-[0.25em] text-accent">
                                    Upcoming Event
                                </span>
                            </div>

                            <h2 className="mb-8 font-sans text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                                Prime Commercial <span className="font-drama font-normal italic text-white">Showcase</span>
                            </h2>

                            <div className="mb-12 flex flex-col gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl bg-accent/10 p-3 text-accent">
                                        <Calendar size={20} />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 text-sm uppercase tracking-[0.2em] text-ivory/60">Date & Time</h4>
                                        <p className="text-lg font-medium md:text-xl">{AUCTION_DATE_LONG} • {AUCTION_TIME_LONG}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="rounded-xl bg-accent/10 p-3 text-accent">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="mb-1 text-sm uppercase tracking-[0.2em] text-ivory/60">Location</h4>
                                        <p className="text-lg font-medium md:text-xl">{AUCTION_LOCATION}</p>
                                        <a href={AUCTION_DIRECTIONS} className="mt-2 inline-block font-mono text-xs text-accent hover:underline underline-offset-4">
                                            Get Directions &rarr;
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-auto flex flex-col gap-4 sm:flex-row">
                                <button className="group relative w-full overflow-hidden rounded-full bg-accent px-8 py-4 text-center font-medium text-white shadow-[0_0_20px_rgba(230,46,45,0.3)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] sm:w-auto">
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Pre-Register
                                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                    </span>
                                    <span className="absolute inset-0 z-0 block translate-y-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
                                </button>
                                <button className="w-full rounded-full border border-white/20 px-8 py-4 text-center font-medium text-ivory transition-colors duration-300 hover:bg-white/5 sm:w-auto">
                                    View Property Catalog
                                </button>
                            </div>
                        </div>

                        <div className="relative flex w-full flex-col justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 md:w-[22rem]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(230,46,45,0.12)_0%,transparent_62%)]" />
                            <span className="relative z-10 mb-8 text-xs uppercase tracking-[0.25em] text-ivory/50">T-Minus</span>

                            <div className="relative z-10 flex flex-col gap-5">
                                {countdownUnits.map((unit) => (
                                    <div key={unit.key} className="flex items-end justify-between border-b border-white/10 pb-4">
                                        <AnimatedValue
                                            value={timeLeft[unit.key]}
                                            className="font-mono text-5xl font-bold tracking-tighter text-white"
                                        />
                                        <span className="mb-2 text-xs uppercase tracking-[0.22em] text-ivory/40">
                                            {unit.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function UpcomingAuction() {
    const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft());
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

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
                transition={{ duration: 0.7, delay: 0.76, ease: 'easeOut' }}
                className="hero-reveal relative w-full"
            >
                <motion.button
                    type="button"
                    onClick={() => setIsExpanded(true)}
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="group relative w-full overflow-hidden rounded-[1.85rem] border border-white/10 bg-[linear-gradient(135deg,rgba(12,12,18,0.76),rgba(18,12,16,0.72))] px-4 py-4 text-left shadow-[0_18px_44px_rgba(0,0,0,0.18)] backdrop-blur-lg md:px-5 md:py-4"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.035),transparent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative z-10 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                        <div className="min-w-0 max-w-[28rem]">
                            <div className="flex flex-wrap items-center gap-2.5">
                                <span className="inline-flex items-center gap-2 rounded-full border border-accent/16 bg-accent/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent/92">
                                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                                    Next Auction
                                </span>
                            </div>

                            <div className="mt-3">
                                <h3 className="text-lg font-semibold tracking-[0.01em] text-white md:text-xl">
                                    {AUCTION_TITLE}
                                </h3>
                                <div className="mt-2 flex flex-col gap-1.5 text-sm text-ivory/56 md:flex-row md:flex-wrap md:items-center md:gap-4">
                                    <span className="inline-flex items-center gap-2">
                                        <Calendar size={14} className="text-accent/72" />
                                        {AUCTION_DATE_LONG} • {AUCTION_TIME_LONG}
                                    </span>
                                    <span className="inline-flex items-center gap-2">
                                        <MapPin size={14} className="text-accent/72" />
                                        Johannesburg
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full max-w-[20rem] xl:mx-8">
                            <CountdownRow timeLeft={timeLeft} rail />
                        </div>

                        <div className="flex items-center justify-between gap-4 border-t border-white/8 pt-3 xl:min-w-[12rem] xl:justify-end xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
                            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/42 xl:hidden">
                                <Clock3 size={14} className="text-accent/72" />
                                Live countdown
                            </div>
                            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/62 transition-colors group-hover:text-white/82">
                                Auction details
                                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                            </span>
                        </div>
                    </div>
                </motion.button>
            </motion.div>

            <AnimatePresence>
                {isVisible && !isExpanded && (
                    <motion.button
                        type="button"
                        initial={{ opacity: 0, x: 70, y: 16, scale: 0.92 }}
                        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 70, y: 16, scale: 0.92 }}
                        whileHover={{ y: -3, scale: 1.02 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                        className="group fixed bottom-6 right-6 z-40 w-[270px] cursor-pointer text-left md:bottom-10 md:right-10 md:w-[290px]"
                        onClick={() => setIsExpanded(true)}
                    >
                        <div className="relative overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(145deg,rgba(13,13,18,0.92),rgba(24,14,18,0.88))] p-4 shadow-2xl backdrop-blur-xl">
                            <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] translate-x-[-140%] skew-x-[-30deg] transition-transform duration-700 ease-out group-hover:translate-x-[150%]" />
                            <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-accent/18 blur-[44px]" />

                            <div className="relative z-10 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/78">
                                        Next Auction
                                    </span>
                                </div>
                                <Calendar size={14} className="text-accent/80" />
                            </div>

                            <div className="relative z-10 mt-4">
                                <CountdownRow timeLeft={timeLeft} compact />
                            </div>

                            <div className="relative z-10 mt-4 border-t border-white/10 pt-4 text-xs font-medium tracking-wide text-white/62">
                                {AUCTION_DATE_SHORT} • {AUCTION_TIME}
                            </div>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            <AuctionModal
                isExpanded={isExpanded}
                onClose={() => setIsExpanded(false)}
                timeLeft={timeLeft}
            />
        </>
    );
}
