import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { ArrowRight, ChevronDown, Sun, Moon, Menu, Phone, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { primaryNavItems, moreNavItems } from '../data/navigation';

const CONTACT_PHONE_DISPLAY = '011 033 6600';
const CONTACT_PHONE_HREF = 'tel:+27110336600';
const LOGIN_LABEL = 'Log In';
const CREATE_ACCOUNT_LABEL = 'Create Account';
const LOGIN_TO = '#';
const CREATE_ACCOUNT_TO = '#';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const moreMenuRef = useRef(null);
    const isHome = location.pathname === '/';
    const isFloatingHome = isHome && !isScrolled;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMenuOpen(false);
        setIsMoreOpen(false);
        setIsMobileMoreOpen(false);
    }, [location.pathname, location.hash]);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const handlePointerDown = (event) => {
            if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
                setIsMoreOpen(false);
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);
        return () => document.removeEventListener('pointerdown', handlePointerDown);
    }, []);

    // Helper to determine if we should hash link (on home page) or standard link
    const NavLink = ({ to, type = 'route', children, className, onClick }) => {
        const isHash = type === 'hash';
        const linkClass = clsx(
            'inline-flex items-center justify-center leading-none text-xs font-medium transition-colors duration-200 uppercase tracking-widest md:h-12',
            isFloatingHome
                ? 'text-white/82 hover:text-accent drop-shadow-[0_1px_12px_rgba(0,0,0,0.32)]'
                : 'theme-text-muted hover:text-accent',
            className
        );

        if (isHash && !isHome) {
            return <Link to={`/${to}`} className={linkClass} onClick={onClick}>{children}</Link>;
        }
        if (isHash && isHome) {
            return <a href={to} className={linkClass} onClick={onClick}>{children}</a>;
        }
        return <Link to={to} className={linkClass} onClick={onClick}>{children}</Link>;
    };

    const mobileIconButtonClass = clsx(
        'flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300',
        isFloatingHome
            ? 'border-white/14 bg-black/18 text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)] hover:border-white/28 hover:bg-black/28'
            : 'border theme-border theme-surface-2 theme-text hover:border-accent/50'
    );
    const desktopLoginClass = clsx(
        'hidden md:inline-flex md:h-12 items-center justify-center text-sm font-medium leading-none transition-colors duration-300',
        isFloatingHome
            ? 'text-white/74 hover:text-accent drop-shadow-[0_1px_12px_rgba(0,0,0,0.28)]'
            : 'theme-text-muted hover:text-accent'
    );
    const desktopCreateAccountClass = clsx(
        'group hidden md:inline-flex md:h-12 items-center justify-center rounded-full border px-5 lg:px-6 text-sm font-medium leading-none transition-all duration-300',
        isFloatingHome
            ? 'border-white/14 bg-white/[0.05] text-white/88 shadow-[0_14px_34px_rgba(0,0,0,0.16)] hover:border-white/26 hover:bg-white/[0.09] hover:text-white'
            : 'border theme-border theme-surface-2 theme-text hover:border-white/18 hover:bg-white/[0.05]'
    );

    return (
        <>
            <nav
                className={clsx(
                    'fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-[3rem] px-4 py-3 md:px-6 md:py-4 flex items-center justify-between w-[92%] border transition-all duration-500',
                    isFloatingHome
                        ? 'hero-glass shadow-lg shadow-black/10 md:w-[94%] max-w-6xl md:max-w-7xl'
                        : 'glass shadow-xl md:w-[94%] max-w-6xl md:max-w-7xl'
                )}
            >
                <div className="flex items-center gap-3 md:hidden">
                    <button
                        type="button"
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen(prev => !prev)}
                        className={mobileIconButtonClass}
                    >
                        {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>

                    <Link to="/" className="flex items-center gap-2">
                        <img
                            src="/logo-new-white.svg"
                            alt="Aucor Properties"
                            className={clsx(
                                'h-8 w-auto transition-all duration-400',
                                isFloatingHome ? 'opacity-100 drop-shadow-[0_2px_18px_rgba(0,0,0,0.28)]' : 'opacity-95'
                            )}
                        />
                    </Link>
                </div>

                <a
                    href={CONTACT_PHONE_HREF}
                    className={clsx(
                        'ml-auto inline-flex items-center justify-end gap-1.5 rounded-full px-1 py-2 text-right text-[11px] font-medium leading-none tracking-wide transition-colors duration-300 md:hidden',
                        isFloatingHome
                            ? 'text-white/78 hover:text-accent drop-shadow-[0_1px_12px_rgba(0,0,0,0.28)]'
                            : 'theme-text-muted hover:text-accent'
                    )}
                >
                    <Phone size={13} strokeWidth={2.2} className="shrink-0" />
                    <span>{CONTACT_PHONE_DISPLAY}</span>
                </a>

                <Link to="/" className="hidden md:flex items-center gap-2">
                    <img
                        src="/logo-new-white.svg"
                        alt="Aucor Properties"
                        className={clsx(
                            'h-8 w-auto transition-all duration-400 md:h-11 lg:h-[3rem]',
                            isFloatingHome ? 'opacity-100 drop-shadow-[0_2px_18px_rgba(0,0,0,0.28)]' : 'opacity-95'
                        )}
                    />
                </Link>

                <div className="hidden md:flex items-center gap-7 lg:gap-8">
                    {primaryNavItems.map((item) => (
                        <NavLink key={item.label} to={item.to} type={item.type}>
                            {item.label}
                        </NavLink>
                    ))}

                    <div ref={moreMenuRef} className="relative">
                        <button
                            type="button"
                            onClick={() => setIsMoreOpen((current) => !current)}
                            aria-expanded={isMoreOpen}
                            className={clsx(
                                'inline-flex h-12 items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-widest transition-colors duration-200',
                                isFloatingHome
                                    ? 'text-white/82 hover:text-accent drop-shadow-[0_1px_12px_rgba(0,0,0,0.32)]'
                                    : 'theme-text-muted hover:text-accent'
                            )}
                        >
                            More
                            <ChevronDown
                                size={15}
                                className={clsx('transition-transform duration-200', isMoreOpen && 'rotate-180')}
                            />
                        </button>

                        <AnimatePresence>
                            {isMoreOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.18, ease: 'easeOut' }}
                                    className="absolute right-0 top-[calc(100%+0.75rem)] min-w-[14rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(150deg,rgba(11,11,16,0.98),rgba(20,12,16,0.94))] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
                                >
                                    <div className="flex flex-col gap-1">
                                        {moreNavItems.map((item) => (
                                            <NavLink
                                                key={item.label}
                                                to={item.to}
                                                type={item.type}
                                                onClick={() => setIsMoreOpen(false)}
                                                className="justify-between rounded-[1.1rem] px-4 py-3 text-left text-[11px] text-white/84 hover:bg-white/[0.05]"
                                            >
                                                <span>{item.label}</span>
                                            </NavLink>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                    <a
                        href={CONTACT_PHONE_HREF}
                        className={clsx(
                            'hidden md:inline-flex md:h-12 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium leading-none transition-all duration-300',
                            isFloatingHome
                                ? 'text-white/82 hover:text-accent drop-shadow-[0_1px_12px_rgba(0,0,0,0.28)]'
                                : 'theme-text-muted hover:text-accent'
                        )}
                    >
                        <Phone size={15} strokeWidth={2.2} className="shrink-0" />
                        {CONTACT_PHONE_DISPLAY}
                    </a>

                    <a href={LOGIN_TO} className={desktopLoginClass}>
                        {LOGIN_LABEL}
                    </a>

                    <a href={CREATE_ACCOUNT_TO} className={desktopCreateAccountClass}>
                        <span className="flex items-center gap-2 tracking-wide">
                            {CREATE_ACCOUNT_LABEL}
                            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                    </a>
                </div>
            </nav>

            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="fixed inset-0 z-[60] md:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-obsidian/78 backdrop-blur-xl"
                            onClick={() => setIsMenuOpen(false)}
                        />

                        <motion.div
                            initial={{ x: '-8%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: '-8%', opacity: 0 }}
                            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                            className="relative flex h-full w-full max-w-[26rem] flex-col overflow-hidden border-r border-white/10 bg-[linear-gradient(145deg,rgba(11,11,16,0.98),rgba(20,12,16,0.95))] px-5 pb-8 pt-8 shadow-[0_20px_90px_rgba(0,0,0,0.42)] sm:px-6"
                        >
                            <div className="pointer-events-none absolute inset-0">
                                <div className="absolute left-[-4rem] top-[-2rem] h-36 w-36 rounded-full bg-accent/16 blur-[70px]" />
                                <div className="absolute bottom-[-5rem] right-[-3rem] h-40 w-40 rounded-full bg-accent/10 blur-[90px]" />
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
                            </div>

                            <div className="relative z-10 mb-5 flex items-center justify-between">
                                <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                                    <img
                                        src="/logo-new-white.svg"
                                        alt="Aucor Properties"
                                        className="h-8 w-auto opacity-95"
                                    />
                                </Link>

                                <button
                                    type="button"
                                    aria-label="Close menu"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-black/18 text-white transition-all duration-300 hover:border-white/28 hover:bg-black/28"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="relative z-10 flex flex-col gap-2 border-t border-white/8 pt-5">
                                {primaryNavItems.map((item) => (
                                    <NavLink
                                        key={item.label}
                                        to={item.to}
                                        type={item.type}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center justify-between rounded-[1.1rem] px-4 py-3.5 text-sm text-white/86 hover:bg-white/[0.04] hover:text-white active:bg-white/[0.07]"
                                    >
                                        <span>{item.label}</span>
                                        <ArrowRight size={16} className="text-accent/80" />
                                    </NavLink>
                                ))}

                                <div
                                    className={clsx(
                                        'overflow-hidden rounded-[1.35rem] transition-all duration-200',
                                        isMobileMoreOpen && 'border border-white/6 bg-white/[0.02]'
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setIsMobileMoreOpen((current) => !current)}
                                        className={clsx(
                                            'flex w-full items-center justify-between rounded-[1.1rem] px-4 py-3.5 text-left text-sm uppercase tracking-widest text-white/86 transition-colors duration-300 hover:bg-white/[0.04] hover:text-white active:bg-white/[0.07]',
                                            isMobileMoreOpen && 'rounded-none'
                                        )}
                                    >
                                        <span>More</span>
                                        <ChevronDown
                                            size={16}
                                            className={clsx('text-accent/80 transition-transform duration-200', isMobileMoreOpen && 'rotate-180')}
                                        />
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isMobileMoreOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.22, ease: 'easeOut' }}
                                                className="overflow-hidden border-t border-white/8"
                                            >
                                                <div className="flex flex-col gap-1 p-2">
                                                    {moreNavItems.map((item) => (
                                                        <NavLink
                                                            key={item.label}
                                                            to={item.to}
                                                            type={item.type}
                                                            onClick={() => {
                                                                setIsMobileMoreOpen(false);
                                                                setIsMenuOpen(false);
                                                            }}
                                                            className="justify-between rounded-[1rem] px-3 py-3 text-[11px] text-white/84 hover:bg-white/[0.05] active:bg-white/[0.08]"
                                                        >
                                                            <span>{item.label}</span>
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            <a
                                href={CONTACT_PHONE_HREF}
                                className="relative z-10 mt-4 flex items-center justify-between rounded-[1.1rem] px-4 py-3.5 text-white/88 transition-all duration-300 hover:bg-white/[0.04] hover:text-white active:bg-white/[0.07]"
                            >
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">Call Aucor</p>
                                    <p className="mt-2 text-sm font-medium text-white">{CONTACT_PHONE_DISPLAY}</p>
                                </div>
                                <ArrowRight size={16} className="text-accent/80" />
                            </a>

                            <div className="relative z-10 mt-3 flex flex-col gap-2 border-t border-white/8 pt-4">
                                <a
                                    href={LOGIN_TO}
                                    className="group flex items-center justify-between rounded-[1.1rem] px-4 py-3.5 text-white/76 transition-all duration-300 hover:bg-white/[0.04] hover:text-accent active:bg-white/[0.07]"
                                >
                                    <span className="text-sm font-medium">{LOGIN_LABEL}</span>
                                    <ArrowRight size={16} className="text-white/42 transition-colors duration-300 group-hover:text-accent" />
                                </a>

                                <a
                                    href={CREATE_ACCOUNT_TO}
                                    className="group flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-4 py-3.5 text-white transition-all duration-300 hover:border-white/18 hover:bg-white/[0.06]"
                                >
                                    <span className="text-sm font-medium">{CREATE_ACCOUNT_LABEL}</span>
                                    <ArrowRight size={16} className="text-white/72 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </a>
                            </div>

                            <div className="relative z-10 mt-auto rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.24em] text-white/42">Display</p>
                                        <p className="mt-2 text-sm font-medium text-white">
                                            {theme === 'dark' ? 'Dark mode active' : 'Light mode active'}
                                        </p>
                                    </div>

                                    <button
                                        onClick={toggleTheme}
                                        aria-label="Toggle theme"
                                        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-black/20 text-white transition-all duration-300 hover:border-accent/40 hover:bg-black/30"
                                    >
                                        <AnimatePresence mode="wait" initial={false}>
                                            <motion.span
                                                key={theme}
                                                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                                transition={{ duration: 0.2, ease: 'easeInOut' }}
                                                className="absolute"
                                            >
                                                {theme === 'dark'
                                                    ? <Sun size={18} className="text-accent" />
                                                    : <Moon size={18} className="text-accent" />
                                                }
                                            </motion.span>
                                        </AnimatePresence>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
