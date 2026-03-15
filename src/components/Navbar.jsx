import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { ArrowRight, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
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

    // Helper to determine if we should hash link (on home page) or standard link
    const NavLink = ({ to, children }) => {
        const isHash = to.startsWith('#');
        const linkClass = clsx(
            'text-xs font-medium hover:-translate-y-[1px] transition-all duration-300 uppercase tracking-widest',
            isFloatingHome
                ? 'text-white/88 hover:text-white drop-shadow-[0_1px_12px_rgba(0,0,0,0.32)]'
                : 'theme-text-muted hover:theme-text'
        );

        if (isHash && !isHome) {
            return <Link to={`/${to}`} className={linkClass}>{children}</Link>;
        }
        if (isHash && isHome) {
            return <a href={to} className={linkClass}>{children}</a>;
        }
        return <Link to={to} className={linkClass}>{children}</Link>;
    };

    return (
        <nav
            className={clsx(
                'fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-[3rem] px-6 py-3.5 flex items-center justify-between w-[92%] max-w-6xl border transition-all duration-500',
                isFloatingHome ? 'hero-glass shadow-lg shadow-black/10' : 'glass shadow-xl'
            )}
        >
            <Link to="/" className="flex items-center gap-2">
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
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className={clsx(
                        'relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300',
                        isFloatingHome
                            ? 'border-white/20 bg-black/15 shadow-[0_10px_30px_rgba(0,0,0,0.16)] hover:border-white/35 hover:bg-black/25'
                            : 'border theme-border hover:border-accent/50',
                        !isFloatingHome && (theme === 'light' ? 'bg-black/5 hover:bg-black/10' : 'bg-white/5 hover:bg-white/10')
                    )}
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
                                ? <Sun size={16} className="text-accent" />
                                : <Moon size={16} className="text-accent" />
                            }
                        </motion.span>
                    </AnimatePresence>
                </button>

                {/* CTA */}
                <button className="relative overflow-hidden group bg-accent text-white px-6 py-3 rounded-full font-medium text-sm transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
                    <span className="relative z-10 flex items-center gap-2 tracking-wide">
                        Register
                        <ArrowRight size={16} />
                    </span>
                    <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 block" />
                </button>
            </div>
        </nav>
    );
}
