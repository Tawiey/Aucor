import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { auctionCountdownUnits, formatAuctionCountdownNumber } from '../data/auctions';

function ValueSlot({ value, slotClassName, valueClassName }) {
    return (
        <span className={clsx('relative inline-flex items-center justify-center overflow-hidden tabular-nums', slotClassName)}>
            <span className={clsx('invisible font-mono leading-none tracking-tight', valueClassName)}>88</span>
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={value}
                    initial={{ y: 4, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -4, opacity: 0 }}
                    transition={{ duration: 0.16, ease: 'easeOut' }}
                    className={clsx(
                        'absolute inset-0 flex items-center justify-center text-center font-mono leading-none tracking-tight',
                        valueClassName
                    )}
                >
                    {formatAuctionCountdownNumber(value)}
                </motion.span>
            </AnimatePresence>
        </span>
    );
}

const variantStyles = {
    hero: {
        wrapper: 'grid grid-cols-4 gap-2 md:gap-2.5',
        card: 'flex min-h-[5.1rem] flex-col items-center justify-center rounded-[1rem] border border-white/8 bg-white/[0.035] px-2.5 py-2 text-center md:min-h-[5.4rem]',
        slot: 'h-[2.1rem] min-w-[2.5rem] md:h-[2.25rem] md:min-w-[2.8rem]',
        value: 'text-[1.35rem] font-semibold text-white md:text-[1.55rem]',
        label: 'mt-1.5 block text-[9px] uppercase tracking-[0.24em] text-white/36 md:text-[10px]'
    },
    floating: {
        wrapper: 'grid grid-cols-4 gap-2 md:gap-2.5',
        card: 'flex min-h-[5.1rem] flex-col items-center justify-center rounded-[1.15rem] border border-white/9 bg-white/[0.038] px-2.5 py-1.5 text-center md:min-h-[5.55rem] md:px-3 md:py-2',
        slot: 'h-[2.05rem] min-w-[2.55rem] md:h-[2.25rem] md:min-w-[2.8rem]',
        value: 'text-[1.55rem] font-semibold text-white md:text-[1.72rem]',
        label: 'mt-1.5 block w-full text-center text-[9px] uppercase leading-none tracking-[0.24em] text-white/40 md:text-[10px]'
    },
    detail: {
        wrapper: 'grid grid-cols-4 gap-2 md:gap-2.5',
        card: 'flex min-h-[5.15rem] flex-col items-center justify-center rounded-[1.1rem] border border-white/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-2.5 py-2.5 text-center shadow-[0_10px_22px_rgba(0,0,0,0.12)] backdrop-blur-sm md:min-h-[5.4rem]',
        slot: 'h-[2.2rem] min-w-[2.7rem] md:h-[2.35rem] md:min-w-[2.95rem]',
        value: 'text-[1.55rem] font-semibold text-white md:text-[1.75rem]',
        label: 'mt-1.5 block w-full text-center text-[9px] uppercase leading-none tracking-[0.24em] text-white/38 md:text-[10px]'
    }
};

export default function AuctionCountdown({ timeLeft, variant = 'hero' }) {
    const styles = variantStyles[variant] ?? variantStyles.hero;

    return (
        <div className={styles.wrapper}>
            {auctionCountdownUnits.map((unit) => (
                <div key={unit.key} className={styles.card}>
                    <ValueSlot
                        value={timeLeft[unit.key]}
                        slotClassName={styles.slot}
                        valueClassName={styles.value}
                    />
                    <span className={styles.label}>{unit.shortLabel}</span>
                </div>
            ))}
        </div>
    );
}
