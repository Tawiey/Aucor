import clsx from 'clsx';
import { ArrowRight, FileText } from 'lucide-react';

export default function ResourceButton({
    label,
    href,
    status = 'available',
    unavailableMessage = 'This document becomes available closer to the event.',
    className,
    fullWidth = false
}) {
    const baseClassName = clsx(
        'group relative inline-flex min-h-[3.2rem] items-center justify-center gap-3 rounded-[1.05rem] border px-4 py-3 text-sm font-medium transition-all duration-300',
        fullWidth && 'w-full',
        className
    );

    if (status === 'available') {
        return (
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={clsx(
                    baseClassName,
                    'border-white/10 bg-white/[0.04] text-white/82 hover:border-white/18 hover:bg-white/[0.08] hover:text-white'
                )}
            >
                <FileText size={16} className="text-white/60 transition-colors duration-300 group-hover:text-accent" />
                <span className="tracking-wide">{label}</span>
                <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/54">
                    Live
                </span>
                <ArrowRight size={15} className="text-white/46 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
        );
    }

    return (
        <div className={clsx('group relative inline-flex', fullWidth && 'w-full')}>
            <button
                type="button"
                aria-disabled="true"
                title={unavailableMessage}
                className={clsx(
                    baseClassName,
                    'cursor-not-allowed border-white/8 bg-white/[0.025] text-white/44'
                )}
                onClick={(event) => event.preventDefault()}
            >
                <FileText size={16} className="text-white/28" />
                <span className="tracking-wide">{label}</span>
                <span className="rounded-full border border-white/8 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/36">
                    Soon
                </span>
            </button>

            <div className="pointer-events-none absolute bottom-[calc(100%+0.6rem)] left-1/2 z-20 hidden w-[15rem] -translate-x-1/2 rounded-[1rem] border border-white/10 bg-[linear-gradient(145deg,rgba(14,14,18,0.98),rgba(22,15,18,0.96))] px-3 py-2 text-center text-xs leading-relaxed text-white/72 shadow-[0_18px_40px_rgba(0,0,0,0.28)] opacity-0 transition-all duration-200 group-hover:block group-hover:opacity-100 group-focus-within:block group-focus-within:opacity-100 md:block">
                {unavailableMessage}
            </div>
        </div>
    );
}
