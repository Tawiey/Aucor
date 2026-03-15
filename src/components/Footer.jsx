import { Link } from 'react-router-dom';

const footerGroups = [
    {
        title: 'Properties',
        links: [
            { label: 'Current properties', to: '/properties', type: 'internal' },
            { label: 'Past properties', href: '#', type: 'external' }
        ]
    },
    {
        title: 'Documents',
        links: [
            { label: 'FAQs', href: '/#faqs', type: 'external' },
            { label: 'Privacy Policy', href: '#', type: 'external' },
            { label: 'Terms and conditions', href: '#', type: 'external' },
            { label: 'FICA requirements', href: '#', type: 'external' },
            { label: 'Trust Bank Account Details', href: '#', type: 'external' }
        ]
    },
    {
        title: 'Social Media',
        links: [
            { label: 'Facebook', href: '#', type: 'external' },
            { label: 'LinkedIn', href: '#', type: 'external' },
            { label: 'Instagram', href: '#', type: 'external' },
            { label: 'YouTube', href: '#', type: 'external' }
        ]
    }
];

export default function Footer() {
    return (
        <footer className="theme-surface theme-text pt-24 pb-12 px-6 md:px-16 rounded-t-[4rem] relative overflow-hidden border-t theme-border">
            <div className="max-w-6xl mx-auto flex flex-col gap-16">

                {/* Top Grid */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-[minmax(0,1.35fr)_repeat(3,minmax(0,0.8fr))] md:gap-8">
                    <div className="flex flex-col items-start gap-4">
                        <img src="/logo-new.svg" alt="Aucor Properties" className="mb-2 h-9 w-auto opacity-95 md:h-11" />
                        <p className="theme-text-muted font-light max-w-xs text-sm leading-relaxed">
                            Precision longevity in property investment. The leading marketplace for competitive discovery.
                        </p>
                    </div>

                    {footerGroups.map((group) => (
                        <div key={group.title} className="flex flex-col gap-4">
                            <h4 className="font-sans font-semibold text-sm tracking-widest uppercase theme-text-muted">{group.title}</h4>
                            {group.links.map((link) => (
                                link.type === 'internal' ? (
                                    <Link
                                        key={link.label}
                                        to={link.to}
                                        className="theme-text-muted hover:text-accent transition-colors text-sm w-max"
                                    >
                                        {link.label}
                                    </Link>
                                ) : (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        className="theme-text-muted hover:text-accent transition-colors text-sm w-max"
                                    >
                                        {link.label}
                                    </a>
                                )
                            ))}
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] theme-border" style={{ background: 'var(--border-color)' }} />

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="theme-text-subtle text-xs font-mono">
                        &copy; {new Date().getFullYear()} Aucor Properties. All rights reserved.
                    </p>

                    <div className="flex items-center gap-3 px-4 py-2 rounded-full border theme-border theme-surface-2 backdrop-blur-sm">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </div>
                        <span className="font-mono text-[10px] theme-text-muted font-semibold tracking-widest uppercase">
                            System Operational
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
}
