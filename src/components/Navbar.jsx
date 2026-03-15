import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { ArrowRight, Sun, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
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
    }, [location.pathname, location.hash]);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Helper to determine if we should hash link (on home page) or standard link
    const NavLink = ({ to, children, className, onClick }) => {
        const isHash = to.startsWith('#');
        const linkClass = clsx(
            'text-xs font-medium hover:-translate-y-[1px] transition-all duration-300 uppercase tracking-widest',
            isFloatingHome
                ? 'text-white/88 hover:text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.32)]'
                : 'theme-text-muted hover:theme-text',
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

    const registerButtonClass = 'relative overflow-hidden group bg-accent text-white px-5 py-3 rounded-full font-medium text-sm transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]';
    const mobileIconButtonClass = clsx(
        'flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300',
        isFloatingHome
            ? 'border-white/14 bg-black/18 text-white shadow-[0_10px_30px_rgba(0,0,0,0.16)] hover:border-white/28 hover:bg-black/28'
            : 'border theme-border theme-surface-2 theme-text hover:border-accent/50'
    );

    return (
        <>
            <nav
                className={clsx(
                    'fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-[3rem] px-4 py-3 md:px-6 md:py-3.5 flex items-center justify-between w-[92%] max-w-6xl border transition-all duration-500',
                    isFloatingHome ? 'hero-glass shadow-lg shadow-black/10' : 'glass shadow-xl'
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
                            src="/logo-new.svg"
                            alt="Aucor Properties"
                            className={clsx(
                                'h-8 w-auto transition-all duration-400',
                                isFloatingHome ? 'opacity-100 drop-shadow-[0_2px_18px_rgba(0,0,0,0.28)]' : 'opacity-95'
                            )}
                        />
                    </Link>
                </div>

                <Link to="/" className="hidden md:flex items-center gap-2">
                    <img
                        src="/logo-new.svg"
                        alt="Aucor Properties"
                        className={clsx(
                            'h-8 w-auto transition-all duration-400 md:h-9',
                            isFloatingHome ? 'opacity-100 drop-shadow-[0_2px_18px_rgba(0,0,0,0.28)]' : 'opacity-95'
                        )}
                    />
                </Link>

                <div className="hidden md:flex items-center gap-10">
                    <NavLink to="/properties">Properties</NavLink>
                    <NavLink to="#features">Features</NavLink>
                    <NavLink to="#process">Process</NavLink>
                    <NavLink to="#contact">Contact</NavLink>
                </div>

                <div className="flex items-center gap-3">
                    <button className="hidden md:block relative overflow-hidden group bg-accent text-white px-6 py-3 rounded-full font-medium text-sm transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
                        <span className="relative z-10 flex items-center gap-2 tracking-wide">
                            Register
                            <ArrowRight size={16} />
                        </span>
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 block" />
                    </button>

                    <button className={clsx(registerButtonClass, 'px-4 sm:px-5 md:hidden')}>
                        <span className="relative z-10 flex items-center gap-2 tracking-wide">
                            Register
                            <ArrowRight size={16} />
                        </span>
                        <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 block" />
                    </button>
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
                            className="relative flex h-full w-full max-w-[26rem] flex-col overflow-hidden border-r border-white/10 bg-[linear-gradient(145deg,rgba(11,11,16,0.98),rgba(20,12,16,0.95))] px-6 pb-8 pt-8 shadow-[0_20px_90px_rgba(0,0,0,0.42)]"
                        >
                            <div className="pointer-events-none absolute inset-0">
                                <div className="absolute left-[-4rem] top-[-2rem] h-36 w-36 rounded-full bg-accent/16 blur-[70px]" />
                                <div className="absolute bottom-[-5rem] right-[-3rem] h-40 w-40 rounded-full bg-accent/10 blur-[90px]" />
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/14 to-transparent" />
                            </div>

                            <div className="relative z-10 mb-6 flex items-center justify-between">
                                <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                                    <img
                                        src="/logo-new.svg"
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

                            <div className="relative z-10 flex flex-col gap-2 border-t border-white/8 pt-6">
                                <NavLink
                                    to="/properties"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/88 hover:border-accent/30 hover:bg-white/[0.05] hover:text-white"
                                >
                                    <span>Properties</span>
                                    <ArrowRight size={16} className="text-accent/80" />
                                </NavLink>
                                <NavLink
                                    to="#features"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/88 hover:border-accent/30 hover:bg-white/[0.05] hover:text-white"
                                >
                                    <span>Features</span>
                                    <ArrowRight size={16} className="text-accent/80" />
                                </NavLink>
                                <NavLink
                                    to="#process"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/88 hover:border-accent/30 hover:bg-white/[0.05] hover:text-white"
                                >
                                    <span>Process</span>
                                    <ArrowRight size={16} className="text-accent/80" />
                                </NavLink>
                                <NavLink
                                    to="#contact"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="flex items-center justify-between rounded-[1.25rem] border border-white/8 bg-white/[0.03] px-4 py-4 text-sm text-white/88 hover:border-accent/30 hover:bg-white/[0.05] hover:text-white"
                                >
                                    <span>Contact</span>
                                    <ArrowRight size={16} className="text-accent/80" />
                                </NavLink>
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
