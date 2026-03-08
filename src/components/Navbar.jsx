import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Helper to determine if we should hash link (on home page) or standard link
    const NavLink = ({ to, children }) => {
        const isHome = location.pathname === '/';
        const isHash = to.startsWith('#');

        if (isHash && !isHome) {
            return (
                <Link to={`/${to}`} className="text-sm font-medium text-ivory/80 hover:text-ivory hover:-translate-y-[1px] transition-all duration-300 uppercase tracking-widest text-xs">
                    {children}
                </Link>
            );
        }

        if (isHash && isHome) {
            return (
                <a href={to} className="text-sm font-medium text-ivory/80 hover:text-ivory hover:-translate-y-[1px] transition-all duration-300 uppercase tracking-widest text-xs">
                    {children}
                </a>
            )
        }

        return (
            <Link to={to} className="text-sm font-medium text-ivory/80 hover:text-ivory hover:-translate-y-[1px] transition-all duration-300 uppercase tracking-widest text-xs">
                {children}
            </Link>
        )
    }

    return (
        <nav
            className={clsx(
                'fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 rounded-[3rem] px-8 py-4 flex items-center justify-between w-[92%] max-w-6xl',
                isScrolled ? 'glass' : 'bg-transparent text-ivory'
            )}
        >
            <Link to="/" className="flex items-center gap-2">
                <img src="/logo.png" alt="Aucor Properties" className="h-7 md:h-8 w-auto mix-blend-screen opacity-90" />
            </Link>

            <div className="hidden md:flex items-center gap-10">
                <NavLink to="/properties">Properties</NavLink>
                <NavLink to="#features">Features</NavLink>
                <NavLink to="#process">Process</NavLink>
                <NavLink to="#contact">Contact</NavLink>
            </div>

            <button className="relative overflow-hidden group bg-accent text-white px-7 py-3 rounded-full font-medium text-sm transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]">
                <span className="relative z-10 flex items-center gap-2 tracking-wide">
                    Register for Auctions
                    <ArrowRight size={16} />
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] z-0 block" />
            </button>
        </nav>
    );
}
