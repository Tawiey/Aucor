import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { X, Calendar, MapPin, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

// Target Date for the Next Auction
const TARGET_DATE = new Date("2026-03-17T11:00:00");

export default function UpcomingAuction() {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // Calculate time left
    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            if (now >= TARGET_DATE) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

            return {
                days: differenceInDays(TARGET_DATE, now),
                hours: differenceInHours(TARGET_DATE, now) % 24,
                minutes: differenceInMinutes(TARGET_DATE, now) % 60,
                seconds: differenceInSeconds(TARGET_DATE, now) % 60
            };
        };

        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Show sticker after scrolling down past hero
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > window.innerHeight * 0.5) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Fallback: if somehow user reloads scrolled, trigger check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper formatting function
    const formatNumber = (num) => num.toString().padStart(2, '0');

    return (
        <>
            {/* The Sticky "Ticket" Trigger */}
            <AnimatePresence>
                {isVisible && !isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, x: 100, rotate: 10 }}
                        animate={{ opacity: 1, x: 0, rotate: 0 }}
                        exit={{ opacity: 0, x: 100, rotate: 10 }}
                        whileHover={{ scale: 1.05, rotate: -2 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-40 cursor-pointer shadow-2xl group"
                        onClick={() => setIsExpanded(true)}
                    >
                        {/* Ticket Body */}
                        <div className="bg-obsidian/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 w-[280px] md:w-[320px] relative overflow-hidden backdrop-filter">
                            {/* Holographic Glare Effect on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-x-[-150%] skew-x-[-45deg] transition-transform duration-700 ease-in-out group-hover:translate-x-[150%]" />

                            {/* Accent Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[40px] rounded-full pointer-events-none" />

                            <div className="flex items-center gap-2 mb-4 relative z-10 w-full justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                    <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase font-semibold text-ivory/80">
                                        Next Auction
                                    </span>
                                </div>
                                <Calendar size={14} className="text-accent/80" />
                            </div>

                            {/* Live Countdown */}
                            <div className="flex justify-between items-end gap-2 mb-4">
                                {[
                                    { label: 'Days', value: timeLeft.days },
                                    { label: 'Hrs', value: timeLeft.hours },
                                    { label: 'Mins', value: timeLeft.minutes },
                                    { label: 'Secs', value: timeLeft.seconds }
                                ].map((unit, i) => (
                                    <div key={unit.label} className="flex flex-col items-center">
                                        <span className="font-mono text-2xl md:text-3xl font-bold text-ivory leading-none tracking-tighter">
                                            {formatNumber(unit.value)}
                                        </span>
                                        <span className="font-sans text-[8px] md:text-[10px] uppercase tracking-widest text-ivory/40 mt-1">
                                            {unit.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="w-full h-[1px] bg-white/10 mb-4" />

                            <p className="font-sans text-xs md:text-sm text-ivory/60 font-medium tracking-wide">
                                17 Mar 2026 • 11:00 AM
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* The Full Screen Modal Overlay */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                    >
                        {/* Backdrop Blur Layer */}
                        <div
                            className="absolute inset-0 bg-obsidian/80 backdrop-blur-2xl"
                            onClick={() => setIsExpanded(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, y: 40, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 40, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25, delay: 0.1 }}
                            className="bg-obsidian border border-accent/20 rounded-[3rem] p-8 md:p-16 max-w-4xl w-full relative overflow-hidden shadow-[0_0_100px_rgba(230,46,45,0.15)] flex flex-col md:flex-row gap-12"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsExpanded(false)}
                                className="absolute top-6 right-6 md:top-8 md:right-8 p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors z-20 text-ivory hover:text-accent"
                            >
                                <X size={24} />
                            </button>

                            {/* Left Col: Details */}
                            <div className="flex-1 flex flex-col relative z-10">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="w-3 h-3 rounded-full bg-accent animate-pulse" />
                                    <span className="font-mono text-sm tracking-widest text-accent uppercase">
                                        Upcoming Event
                                    </span>
                                </div>

                                <h2 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight mb-8 leading-[1.1]">
                                    Prime Commercial <span className="font-drama italic font-normal text-white">Showcase</span>
                                </h2>

                                <div className="flex flex-col gap-6 mb-12">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-accent/10 text-accent">
                                            <Calendar size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-sans text-sm tracking-widest text-ivory/60 uppercase mb-1">Date & Time</h4>
                                            <p className="font-sans font-medium text-lg md:text-xl">17 March 2026 • 11h00 SAST</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-accent/10 text-accent">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-sans text-sm tracking-widest text-ivory/60 uppercase mb-1">Location</h4>
                                            <p className="font-sans font-medium text-lg md:text-xl">The Houghton Golf Club, Johannesburg</p>
                                            <a href="#" className="font-mono text-xs text-accent mt-2 inline-block hover:underline underline-offset-4">Get Directions &rarr;</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                    <button className="relative overflow-hidden group bg-accent text-white px-8 py-4 rounded-full font-medium transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] w-full sm:w-auto text-center shadow-[0_0_20px_rgba(230,46,45,0.3)]">
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Pre-Register
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 block" />
                                    </button>
                                    <button className="px-8 py-4 rounded-full font-medium text-ivory border border-white/20 hover:bg-white/5 transition-colors duration-300 w-full sm:w-auto text-center">
                                        View Property Catalog
                                    </button>
                                </div>
                            </div>

                            {/* Right Col: Massive Countdown Visual */}
                            <div className="w-full md:w-1/3 flex flex-col justify-center items-center bg-white/5 rounded-[2rem] p-8 border border-white/10 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(230,46,45,0.1)_0%,transparent_60%)]" />

                                <span className="font-sans text-xs tracking-[0.2em] text-ivory/50 uppercase mb-8">T-Minus</span>

                                <div className="flex flex-col gap-6 w-full relative z-10">
                                    {[
                                        { label: 'Days', value: timeLeft.days },
                                        { label: 'Hours', value: timeLeft.hours },
                                        { label: 'Minutes', value: timeLeft.minutes },
                                        { label: 'Seconds', value: timeLeft.seconds }
                                    ].map((unit, i) => (
                                        <div key={unit.label} className="flex items-end justify-between border-b border-white/10 pb-4">
                                            <span className="font-mono text-5xl font-bold tracking-tighter text-white">
                                                {formatNumber(unit.value)}
                                            </span>
                                            <span className="font-sans text-xs uppercase tracking-widest text-ivory/40 mb-2">
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
        </>
    );
}
