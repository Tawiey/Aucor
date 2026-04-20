import { useLayoutEffect, useState } from 'react';
import {
    ArrowRight,
    Calendar,
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Copy,
    MapPin,
    Minus,
    Plus
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import AuctionCountdown from '../components/AuctionCountdown';
import AuctionPropertyCard from '../components/AuctionPropertyCard';
import SoldPropertyCard from '../components/SoldPropertyCard';
import ResourceButton from '../components/ResourceButton';
import { clientLogos } from '../data/clientLogos';
import { featuredSoldProperties } from '../data/properties';
import { getAuctionProperties, getNextAuction } from '../data/auctions';
import { primaryNavItems, moreNavItems } from '../data/navigation';

const navigation = [
    { id: 'foundations', label: 'Foundations' },
    { id: 'actions', label: 'Actions' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'typography', label: 'Typography' },
    { id: 'data-display', label: 'Data Display' },
    { id: 'cards', label: 'Cards' },
    { id: 'forms', label: 'Forms' },
    { id: 'proof', label: 'Proof' },
    { id: 'disclosure', label: 'Disclosure' }
];

const previewAuction = getNextAuction();
const previewProperty = getAuctionProperties(previewAuction)[0];
const previewSoldProperty = featuredSoldProperties[0];
const previewCountdown = { days: 12, hours: 8, minutes: 45, seconds: 0 };
const placeholderAuction = {
    ...previewAuction,
    title: 'Example auction session',
    location: 'Example venue, Johannesburg',
    propertyIds: ['EX01', 'EX02', 'EX03', 'EX04'],
    magazine: {
        href: '#',
        status: 'coming_soon',
        unavailableMessage: 'This document becomes available closer to the event.'
    }
};
const placeholderProperty = {
    ...previewProperty,
    id: 'EX-101',
    title: 'Example industrial asset',
    location: 'Example address, Sandton',
    price: 'R18,500,000 estimate',
    size: '4 200m² GLA'
};
const placeholderSoldProperty = {
    ...previewSoldProperty,
    id: 'EX-202',
    title: 'Example sold commercial asset',
    location: 'Example address, Cape Town',
    auctionDate: '21 Jan 2026'
};
const previewQuote = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere, orci non faucibus maximus, velit dui fringilla nibh, vitae tempus justo nisl in est.';

const typographyTokens = [
    {
        name: 'Display / H1',
        sample: 'The team that delivers results.',
        family: 'Inter',
        size: '3.35rem -> 5.8rem',
        weight: '700',
        tracking: '-0.045em',
        usage: 'Homepage hero and highest-emphasis page headlines'
    },
    {
        name: 'Section / H2',
        sample: 'Recently sold',
        family: 'Inter',
        size: '2rem -> 2.6rem',
        weight: '700',
        tracking: 'tight',
        usage: 'Section headers and major page blocks'
    },
    {
        name: 'Card / H3',
        sample: 'Investment Portfolio Session',
        family: 'Inter',
        size: '1.25rem -> 1.5rem',
        weight: '600',
        tracking: 'tight',
        usage: 'Cards, secondary hero surfaces, compact titles'
    },
    {
        name: 'Body',
        sample: 'Auction-led property marketing for owners who need buyer confidence and sharper price discovery.',
        family: 'Inter',
        size: '0.95rem -> 1.125rem',
        weight: '400',
        tracking: 'normal',
        usage: 'Main supporting copy and descriptive paragraphs'
    },
    {
        name: 'Eyebrow',
        sample: 'Upcoming auction',
        family: 'Inter',
        size: '0.6875rem -> 0.75rem',
        weight: '600',
        tracking: '0.18em -> 0.28em',
        usage: 'Section labels, surface labels, category markers'
    },
    {
        name: 'Mono Meta',
        sample: '14 APR 2026',
        family: 'JetBrains Mono',
        size: '0.625rem -> 0.75rem',
        weight: '500',
        tracking: '0.18em -> 0.26em',
        usage: 'Dates, badges, count labels, metadata lines'
    }
];

const foundationRows = [
    ['Primary font', 'Inter (`font-sans`)'],
    ['Editorial font', 'Playfair Display (`font-drama`)'],
    ['Mono font', 'JetBrains Mono (`font-mono`)'],
    ['Accent color', '#E62E2D'],
    ['Base background', '#0D0D12'],
    ['Primary text', '#FAF8F5'],
    ['Default border', 'rgba(255,255,255,0.10)'],
    ['Common radius', '12px / 16px / 28px depending on control size'],
    ['Surface pattern', 'dark translucent surfaces with soft blur and low-noise borders'],
    ['Shadow language', 'large soft black shadows, restrained accent glow']
];

const sectionClasses = {
    foundations: `tailwind.config.js
fontFamily: {
  sans: ['Inter', 'sans-serif'],
  drama: ['Playfair Display', 'serif'],
  mono: ['JetBrains Mono', 'monospace'],
}

colors: {
  obsidian: '#0D0D12',
  accent: '#E62E2D',
  ivory: '#FAF8F5',
}`,
    actions: `Production sources
- src/components/UpcomingAuction.jsx
- src/components/Navbar.jsx
- src/components/ResourceButton.jsx
- src/components/GetStarted.jsx

Primary CTA
group relative inline-flex min-h-[3.35rem] items-center justify-center overflow-hidden rounded-[1.1rem] bg-accent px-5 py-3 text-center text-sm font-semibold text-white

Navbar ghost CTA
group hidden md:inline-flex md:h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.05] px-5 lg:px-6 text-sm font-medium leading-none text-white/88

Document action (available)
group relative inline-flex min-h-[3.2rem] items-center justify-center gap-3 rounded-[1.05rem] border border-white/10 px-4 py-3 text-sm font-medium text-white/82

Document action (coming soon)
group relative inline-flex min-h-[3.2rem] items-center justify-center gap-3 rounded-[1.05rem] border border-white/8 bg-white/[0.025] px-4 py-3 text-sm font-medium text-white/44`,
    navigation: `Production sources
- src/components/Navbar.jsx
- src/data/navigation.js

Desktop nav item
inline-flex items-center justify-center leading-none text-xs font-medium uppercase tracking-widest text-white/82 transition-colors duration-200 hover:text-accent

More trigger
inline-flex h-12 items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-widest text-white/82 transition-colors duration-200 hover:text-accent

Dropdown panel
absolute right-0 top-[calc(100%+0.75rem)] min-w-[14rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(150deg,rgba(11,11,16,0.98),rgba(20,12,16,0.94))] p-2

Proposed secondary tabs
rounded-lg px-4 py-2 text-sm font-medium
active: bg-white text-black
inactive: text-white/54 hover:bg-white/[0.08] hover:text-white`,
    typography: `Display / H1
font-sans text-[3.35rem] font-bold leading-[0.98] tracking-[-0.045em] md:text-[5rem] xl:text-[5.8rem]

Section / H2
text-2xl font-semibold tracking-tight md:text-[2.6rem]

Card / H3
text-[1.45rem] font-semibold tracking-tight

Eyebrow
text-[11px] font-semibold uppercase tracking-[0.18em]

Mono Meta
font-mono text-[11px] uppercase tracking-[0.2em]`,
    'data-display': `Production sources
- src/components/AuctionCountdown.jsx
- src/pages/AuctionDetail.jsx
- src/components/UpcomingAuction.jsx

Countdown wrapper
grid grid-cols-4 gap-2 md:gap-2.5

Detail countdown card
flex min-h-[5.15rem] flex-col items-center justify-center rounded-[1.1rem] border border-white/7 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-2.5 py-2.5

Auction detail facts
font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/42
mt-2 text-sm font-medium text-white`,
    cards: `Production sources
- src/components/UpcomingAuction.jsx
- src/components/AuctionPropertyCard.jsx
- src/components/SoldPropertyCard.jsx

Upcoming auction surface
relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(150deg,rgba(12,12,18,0.9),rgba(27,15,18,0.78))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl

Auction property card
theme-card border theme-border rounded-[1.7rem] overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.16)] flex flex-col

Sold property card
flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-white/10 bg-white/[0.04] shadow-[0_24px_60px_rgba(0,0,0,0.16)] backdrop-blur-sm`,
    forms: `Production source
- src/components/SearchBar.jsx

Hero shell
rounded-[1.75rem] border border-white/16 bg-[linear-gradient(145deg,rgba(13,13,18,0.92),rgba(29,17,21,0.82))] px-4 py-3 ring-1 ring-accent/12 backdrop-blur-xl

Hero input
h-12 rounded-full border border-white/14 bg-white/[0.07] pl-12 pr-5 text-[15px] text-ivory placeholder:text-ivory/36 hover:border-white/22 hover:bg-white/[0.09] focus:border-white/28 focus:bg-white/[0.11]

Section shell
rounded-[1.65rem] border border-white/10 bg-[linear-gradient(145deg,rgba(18,18,24,0.9),rgba(18,12,18,0.82))] px-4 py-3 backdrop-blur-md

Section input
h-11 rounded-full border border-white/10 bg-white/[0.04] pl-12 pr-5 text-sm text-ivory placeholder:text-ivory/34 hover:border-white/18 hover:bg-white/[0.06] focus:border-white/28 focus:bg-white/[0.09]

Proposed standalone input (derived)
h-11 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-white/28 hover:border-white/18 hover:bg-white/[0.06] focus:border-white/26 focus:bg-white/[0.08]`,
    proof: `Production sources
- src/components/Testimonials.jsx
- src/components/TrustedByMarquee.jsx

Testimonial card
relative overflow-hidden rounded-[1.65rem] border border-white/7 bg-[linear-gradient(145deg,rgba(255,255,255,0.028),rgba(255,255,255,0.012))] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.14)] backdrop-blur-sm

Logo lane item
flex h-[5.25rem] min-w-[10.5rem] flex-none items-center justify-center px-7 py-4

Logo image
max-h-10 w-auto max-w-[8.75rem] object-contain opacity-70 transition-opacity duration-300 hover:opacity-88`,
    disclosure: `Production source
- src/components/FAQSection.jsx

Accordion shell
overflow-hidden rounded-[1.5rem] border theme-border bg-black/10 transition-colors duration-300

Accordion trigger
flex w-full items-start gap-4 px-5 py-4 text-left transition-colors duration-300 hover:bg-white/[0.03]

Icon medallion
mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]

Proposed pagination
inline-flex h-10 min-w-[2.75rem] items-center justify-center rounded-lg px-3 text-sm font-medium
active: bg-white text-black
inactive: border border-white/10 bg-white/[0.04] text-white/62`
};

function CopyValueButton({ value, label }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(value);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch {
            setCopied(false);
        }
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-white/72 transition-colors duration-200 hover:bg-white/[0.08] hover:text-white"
            aria-label={`Copy ${label}`}
        >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy implementation'}
        </button>
    );
}

function StatusChip({ status }) {
    if (!status) return null;

    const statusClassName = status === 'Production'
        ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
        : 'border-white/10 bg-white/[0.06] text-white/68';

    return (
        <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${statusClassName}`}>
            {status}
        </span>
    );
}

function PreviewFrame({ children, tone = 'soft', padded = true, status = null, componentLabel = 'Live component' }) {
    const toneClassName = tone === 'dark' ? 'bg-[#06070b] text-white' : 'bg-[#0d1016] text-white';

    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#11141c] shadow-[0_18px_45px_rgba(0,0,0,0.28)]">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">
                    Preview
                </span>
                <div className="flex items-center gap-2">
                    {componentLabel ? <span className="text-xs text-white/34">{componentLabel}</span> : null}
                    <StatusChip status={status} />
                </div>
            </div>
            <div className={`${toneClassName} ${padded ? 'p-5 md:p-6' : ''}`}>
                {children}
            </div>
        </div>
    );
}

function Panel({ title, children }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_18px_45px_rgba(0,0,0,0.2)]">
            <h3 className="text-sm font-semibold text-white">{title}</h3>
            <div className="mt-3">{children}</div>
        </div>
    );
}

function UsagePanel({ usage, notes }) {
    return (
        <Panel title="Usage">
            <p className="text-sm leading-7 text-white/72">{usage}</p>
            <ul className="mt-3 space-y-3 text-sm leading-7 text-white/62">
                {notes.map((note) => (
                    <li key={note}>{note}</li>
                ))}
            </ul>
        </Panel>
    );
}

function SpecPanel({ groups }) {
    return (
        <Panel title="Style spec">
            <div className="space-y-4">
                {groups.map((group) => (
                    <div key={group.title}>
                        <h4 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/42">
                            {group.title}
                        </h4>
                        <dl className="mt-2 space-y-2">
                            {group.rows.map(([label, value]) => (
                                <div key={label} className="flex items-start justify-between gap-4 border-b border-white/6 pb-2 last:border-b-0 last:pb-0">
                                    <dt className="text-sm text-white/54">{label}</dt>
                                    <dd className="text-right text-sm font-medium text-white/84">{value}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                ))}
            </div>
        </Panel>
    );
}

function CodePanel({ code }) {
    return (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#05060a] shadow-[0_18px_45px_rgba(0,0,0,0.32)]">
            <div className="border-b border-white/10 px-4 py-3">
                <h3 className="text-sm font-semibold text-white">Classes / implementation</h3>
            </div>
            <pre className="overflow-x-auto px-4 py-4 text-xs leading-6 text-slate-300">
                <code>{code}</code>
            </pre>
        </div>
    );
}

function Section({ id, title, description, preview, usage, notes, specs, code }) {
    const [activeTab, setActiveTab] = useState('usage');
    const tabs = [
        { id: 'usage', label: 'Usage' },
        { id: 'spec', label: 'Style spec' },
        { id: 'classes', label: 'Classes' }
    ];

    let detailPanel = <UsagePanel usage={usage} notes={notes} />;
    if (activeTab === 'spec') {
        detailPanel = <SpecPanel groups={specs} />;
    } else if (activeTab === 'classes') {
        detailPanel = <CodePanel code={code} />;
    }

    return (
        <section id={id} className="scroll-mt-24 border-b border-white/8 pb-12 last:border-b-0">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-white/62">{description}</p>
                </div>
                <CopyValueButton value={code} label={`${title} classes`} />
            </div>

            <div className="space-y-5">
                <div>{preview}</div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 shadow-[0_18px_45px_rgba(0,0,0,0.2)] md:p-4">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                        isActive
                                            ? 'bg-white text-black'
                                            : 'text-white/58 hover:bg-white/[0.08] hover:text-white'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div>{detailPanel}</div>
            </div>
        </section>
    );
}

function FoundationsPreview() {
    return (
        <PreviewFrame componentLabel="Token reference">
            <div className="space-y-8">
                <div>
                    <h3 className="text-sm font-semibold text-white">Typography tokens</h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-2">
                        {typographyTokens.map((token) => (
                            <div key={token.name} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/42">
                                    {token.name}
                                </div>
                                <div className="mt-3 text-lg font-semibold text-white">{token.sample}</div>
                                <div className="mt-3 grid gap-1 text-sm text-white/58">
                                    <div>Family: {token.family}</div>
                                    <div>Size: {token.size}</div>
                                    <div>Weight: {token.weight}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-white">Core visual tokens</h3>
                    <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {[
                            ['Accent', '#E62E2D', 'bg-accent'],
                            ['Obsidian', '#0D0D12', 'bg-obsidian'],
                            ['Ivory', '#FAF8F5', 'bg-ivory'],
                            ['Border', 'white / 10%', 'bg-white/10'],
                            ['Surface', 'white / 4%', 'bg-white/[0.04]'],
                            ['Radius', '12px, 16px, 28px', 'bg-white/[0.04]']
                        ].map(([label, value, swatch]) => (
                            <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                                <div className={`h-10 rounded-lg ${swatch}`} />
                                <div className="mt-3 text-sm font-semibold text-white">{label}</div>
                                <div className="mt-1 text-sm text-white/58">{value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PreviewFrame>
    );
}

function ActionsPreview() {
    return (
        <div className="space-y-5">
            <PreviewFrame status="Production" componentLabel="Recurring CTA patterns">
                <div className="flex flex-wrap items-center gap-3">
                    <button type="button" className="group relative inline-flex min-h-[3.35rem] items-center justify-center overflow-hidden rounded-[1.1rem] bg-accent px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_18px_32px_rgba(230,46,45,0.2)] transition-colors duration-300 hover:bg-accent/92">
                        <span className="relative z-10 flex items-center gap-2">
                            Primary action
                            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                        <span className="absolute inset-0 block translate-y-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
                    </button>

                    <button type="button" className="group inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.05] px-5 text-sm font-medium leading-none text-white/88 transition-all duration-300 hover:border-white/26 hover:bg-white/[0.09] hover:text-white">
                        <span className="flex items-center gap-2 tracking-wide">
                            Secondary action
                            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                    </button>

                    <button type="button" className="group inline-flex items-center gap-2 text-sm font-medium text-white/58 transition-colors duration-300 hover:text-accent">
                        Text link
                        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                </div>
            </PreviewFrame>

            <PreviewFrame tone="dark" status="Production" componentLabel="ResourceButton states">
                <div data-theme="dark" className="rounded-2xl bg-[#06070b] p-5 md:p-6">
                    <div className="grid gap-3 md:grid-cols-2">
                        <ResourceButton label="Document action" href="#" status="available" fullWidth />
                        <ResourceButton
                            label="Document action"
                            href="#"
                            status="coming_soon"
                            unavailableMessage="This document becomes available closer to the event."
                            fullWidth
                        />
                    </div>
                </div>
            </PreviewFrame>
        </div>
    );
}

function NavigationPreview() {
    const [activeTab, setActiveTab] = useState('overview');
    const [showDropdown, setShowDropdown] = useState(true);
    const tabs = ['overview', 'lots', 'faq'];

    return (
        <div className="space-y-5">
            <PreviewFrame status="Production" componentLabel="Navbar desktop pattern">
                <div className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(150deg,rgba(11,11,16,0.98),rgba(20,12,16,0.94))] px-5 py-4 shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
                    <div className="flex flex-wrap items-center justify-between gap-5">
                        <div className="flex items-center gap-7">
                            <img src="/logo-new-white.svg" alt="Aucor Properties" className="h-10 w-auto opacity-100" />

                            <div className="flex flex-wrap items-center gap-6">
                                {primaryNavItems.map((item) => (
                                    <button
                                        key={item.label}
                                        type="button"
                                        className={`inline-flex items-center justify-center leading-none text-xs font-medium uppercase tracking-widest transition-colors duration-200 ${
                                            item.label === 'Process'
                                                ? 'text-accent drop-shadow-[0_1px_12px_rgba(0,0,0,0.32)]'
                                                : 'text-white/82 hover:text-accent'
                                        }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}

                                <div className="relative inline-flex">
                                    <button
                                        type="button"
                                        onClick={() => setShowDropdown((current) => !current)}
                                        className="inline-flex h-12 items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-widest text-white/82 transition-colors duration-200 hover:text-accent"
                                    >
                                        More
                                        <ChevronDown
                                            size={15}
                                            className={`transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                                        />
                                    </button>

                                    {showDropdown && (
                                        <div className="absolute left-0 top-[calc(100%+0.75rem)] min-w-[14rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(150deg,rgba(11,11,16,0.98),rgba(20,12,16,0.94))] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.35)]">
                                            <div className="flex flex-col gap-1">
                                                {moreNavItems.map((item) => (
                                                    <button
                                                        key={item.label}
                                                        type="button"
                                                        className="flex items-center justify-between rounded-[1.1rem] px-4 py-3 text-left text-[11px] uppercase tracking-widest text-white/84 transition-colors duration-200 hover:bg-white/[0.05] hover:text-accent"
                                                    >
                                                        <span>{item.label}</span>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="inline-flex items-center gap-2 rounded-full px-4 text-sm font-medium text-white/82">
                                011 033 6600
                            </div>
                            <button type="button" className="text-sm font-medium text-white/74 transition-colors duration-300 hover:text-accent">
                                Log In
                            </button>
                            <button type="button" className="group inline-flex h-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.05] px-5 text-sm font-medium leading-none text-white/88 transition-all duration-300 hover:border-white/26 hover:bg-white/[0.09] hover:text-white">
                                <span className="flex items-center gap-2 tracking-wide">
                                    Create Account
                                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </PreviewFrame>

            <PreviewFrame status="Proposed" componentLabel="Secondary tabs">
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
                    <div className="flex flex-wrap gap-2">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab;
                            return (
                                <button
                                    key={tab}
                                    type="button"
                                    onClick={() => setActiveTab(tab)}
                                    className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors ${
                                        isActive
                                            ? 'bg-white text-black'
                                            : 'text-white/54 hover:bg-white/[0.08] hover:text-white'
                                    }`}
                                >
                                    {tab}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </PreviewFrame>
        </div>
    );
}

function TypographyPreview() {
    return (
        <PreviewFrame componentLabel="Token reference">
            <div className="space-y-6">
                {typographyTokens.map((token) => (
                    <div key={token.name} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                            <div>
                                <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/42">
                                    {token.name}
                                </div>
                                <div className={`mt-3 ${
                                    token.name === 'Display / H1'
                                        ? 'font-sans text-[2.8rem] font-bold leading-[0.98] tracking-[-0.045em] text-white'
                                        : token.name === 'Section / H2'
                                            ? 'text-[2rem] font-semibold tracking-tight text-white'
                                            : token.name === 'Card / H3'
                                                ? 'text-[1.45rem] font-semibold tracking-tight text-white'
                                                : token.name === 'Body'
                                                    ? 'text-base leading-7 text-white/72'
                                                    : token.name === 'Eyebrow'
                                                        ? 'text-[11px] font-semibold uppercase tracking-[0.18em] text-white/58'
                                                        : 'font-mono text-[11px] uppercase tracking-[0.2em] text-white/58'
                                }`}>
                                    {token.sample}
                                </div>
                            </div>
                            <div className="grid gap-1 text-sm text-white/54">
                                <div>{token.family}</div>
                                <div>{token.size}</div>
                                <div>{token.weight}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </PreviewFrame>
    );
}

function AuctionFactsPreview() {
    return (
        <div className="rounded-[2rem] border border-white/8 bg-[linear-gradient(145deg,rgba(14,14,18,0.98),rgba(22,15,18,0.94))] p-5 md:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-accent/90">
                Auction information
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                Everything you need before auction day.
            </h3>
            <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/42">Date & time</dt>
                    <dd className="mt-2 text-sm font-medium text-white">14 April 2026 · 11h00 SAST</dd>
                </div>
                <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/42">Auction type</dt>
                    <dd className="mt-2 text-sm font-medium text-white">Commercial property auction</dd>
                </div>
                <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/42">Venue</dt>
                    <dd className="mt-2 text-sm font-medium text-white">The Houghton Golf Club</dd>
                </div>
                <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-ivory/42">Properties on this auction</dt>
                    <dd className="mt-2 text-sm font-medium text-white">{previewAuction.propertyIds.length} properties</dd>
                </div>
            </dl>
        </div>
    );
}

function DataDisplayPreview() {
    return (
        <div className="space-y-5">
            <PreviewFrame tone="dark" status="Production" componentLabel="Auction countdown">
                <div data-theme="dark">
                    <AuctionCountdown timeLeft={previewCountdown} variant="detail" />
                </div>
            </PreviewFrame>

            <PreviewFrame tone="dark" status="Production" componentLabel="Auction detail facts">
                <div data-theme="dark">
                    <AuctionFactsPreview />
                </div>
            </PreviewFrame>

            <PreviewFrame tone="dark" status="Production" componentLabel="Process step chip">
                <div className="flex flex-wrap items-center gap-4">
                    <span className="font-mono text-xl tracking-widest text-accent border border-accent/20 px-3 py-1 rounded w-max">
                        01
                    </span>
                    <div className="flex items-center gap-3">
                        <span className="rounded-[0.8rem] bg-accent px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_24px_rgba(230,46,45,0.22)]">
                            Sold
                        </span>
                        <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/58">
                            Example count
                        </span>
                    </div>
                </div>
            </PreviewFrame>
        </div>
    );
}

function UpcomingAuctionSurfacePreview() {
    return (
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(150deg,rgba(12,12,18,0.9),rgba(27,15,18,0.78))] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl md:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,46,45,0.12)_0%,transparent_44%)]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

            <div className="relative z-10 flex items-start justify-between gap-5">
                <div className="min-w-0">
                    <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.26em] text-white/58">
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        Example surface
                    </span>
                    <h3 className="mt-3 text-[1.75rem] font-bold leading-none tracking-tight text-white md:text-[1.95rem] md:leading-[1.02]">
                        {placeholderAuction.title}
                    </h3>
                    <span className="mt-3 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/52">
                        Example count
                    </span>
                </div>

                <button type="button" className="group mt-0.5 hidden shrink-0 items-center gap-2 text-sm font-medium text-white/48 transition-colors duration-300 hover:text-accent md:inline-flex">
                    Auction details
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
            </div>

            <div className="relative z-10 mt-6">
                <AuctionCountdown timeLeft={previewCountdown} variant="hero" />

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/58">
                    <span className="inline-flex items-center gap-2">
                        <Calendar size={14} className="text-accent/72" />
                        Example date • Example time
                    </span>
                    <span className="inline-flex items-center gap-2">
                        <MapPin size={14} className="text-accent/72" />
                        {placeholderAuction.location}
                    </span>
                </div>

                <div className="mt-6 flex flex-col gap-3">
                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                        <button type="button" className="group relative inline-flex min-h-[3.35rem] items-center justify-center overflow-hidden rounded-[1.1rem] bg-accent px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_18px_32px_rgba(230,46,45,0.2)] transition-colors duration-300 hover:bg-accent/92 sm:min-w-[13.75rem]">
                            <span className="relative z-10 flex items-center gap-2">
                                Primary action
                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                            </span>
                            <span className="absolute inset-0 block translate-y-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
                        </button>

                        <ResourceButton
                            label="Document action"
                            href={placeholderAuction.magazine?.href ?? '#'}
                            status={placeholderAuction.magazine?.status}
                            unavailableMessage={placeholderAuction.magazine?.unavailableMessage}
                            className="sm:min-w-[13rem]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function CardsPreview() {
    return (
        <div className="space-y-5">
            <PreviewFrame tone="dark" status="Production" componentLabel="Upcoming auction surface">
                <div data-theme="dark" className="max-w-[38rem]">
                    <UpcomingAuctionSurfacePreview />
                </div>
            </PreviewFrame>

            <PreviewFrame tone="dark" status="Production" componentLabel="Property card family">
                <div data-theme="dark" className="grid gap-5 xl:grid-cols-2">
                    <AuctionPropertyCard property={placeholderProperty} auction={placeholderAuction} />
                    <SoldPropertyCard property={placeholderSoldProperty} />
                </div>
            </PreviewFrame>

            <PreviewFrame tone="dark" status="Production" componentLabel="Engineered for Results stat cards">
                <div className="grid gap-5 md:grid-cols-2">
                    <article className="relative overflow-hidden rounded-[2.4rem] border border-white/8 bg-[linear-gradient(155deg,rgba(26,25,31,0.98),rgba(13,13,18,0.96))] shadow-[0_30px_90px_rgba(0,0,0,0.34)] md:col-span-2">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.07),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(230,46,45,0.12),transparent_34%)]" />
                        <div className="relative z-10 flex h-full flex-col gap-10 p-8 md:p-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-3 rounded-full bg-white/[0.04] px-4 py-2">
                                    <span className="relative flex h-3 w-3">
                                        <span className="absolute inset-0 rounded-full bg-accent/45 blur-[4px]" />
                                        <span className="relative inline-flex h-3 w-3 rounded-full bg-accent" />
                                    </span>
                                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/62">
                                        Example accent
                                    </span>
                                </div>

                                <div className="mt-8">
                                    <p className="font-sans text-[3.9rem] font-semibold leading-[0.92] tracking-[-0.07em] text-white tabular-nums sm:text-[4.7rem]">
                                        00.00
                                    </p>
                                    <p className="mt-5 max-w-[26rem] text-xl leading-tight text-ivory/88 md:text-2xl">
                                        Example stat label
                                    </p>
                                </div>
                            </div>

                            <div className="lg:max-w-[18rem] lg:pb-2">
                                <div className="h-px w-24 bg-gradient-to-r from-accent/60 to-transparent" />
                                <p className="mt-6 text-sm leading-relaxed text-ivory/58 md:text-[15px]">
                                    Example supporting copy describing the stat.
                                </p>
                            </div>
                        </div>
                    </article>

                    <article className="relative overflow-hidden rounded-[2.4rem] border border-white/8 bg-[linear-gradient(155deg,rgba(26,25,31,0.98),rgba(13,13,18,0.96))] shadow-[0_30px_90px_rgba(0,0,0,0.34)]">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(230,46,45,0.1),transparent_28%)]" />
                        <div className="relative z-10 flex h-full flex-col p-7 md:p-8">
                            <div className="flex items-center justify-between gap-4">
                                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/54">
                                    Example accent
                                </span>
                                <span className="h-px w-14 bg-gradient-to-r from-white/10 to-accent/45" />
                            </div>

                            <div className="mt-10">
                                <p className="font-sans text-[3.2rem] font-semibold leading-[0.95] tracking-[-0.06em] text-white tabular-nums sm:text-[3.6rem]">
                                    00+
                                </p>
                                <p className="mt-4 text-lg leading-tight text-ivory/84">
                                    Example support stat
                                </p>
                            </div>

                            <p className="mt-auto pt-8 text-sm leading-relaxed text-ivory/56">
                                Example supporting copy for the secondary stat card variant.
                            </p>
                        </div>
                    </article>
                </div>
            </PreviewFrame>
        </div>
    );
}

function ProposedStandaloneFields() {
    return (
        <form className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2">
                <span className="text-sm font-medium text-white/76">Full name</span>
                <input
                    type="text"
                    placeholder="Enter your name"
                    className="h-11 w-full rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/28 hover:border-white/18 hover:bg-white/[0.06] focus:border-white/26 focus:bg-white/[0.08]"
                />
            </label>
            <label className="space-y-2">
                <span className="text-sm font-medium text-white/76">Email address</span>
                <input
                    type="email"
                    placeholder="name@example.com"
                    className="h-11 w-full rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/28 hover:border-white/18 hover:bg-white/[0.06] focus:border-white/26 focus:bg-white/[0.08]"
                />
            </label>
            <label className="space-y-2">
                <span className="text-sm font-medium text-white/76">Interest</span>
                <select className="h-11 w-full rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white outline-none transition-all duration-300 hover:border-white/18 hover:bg-white/[0.06] focus:border-white/26 focus:bg-white/[0.08]">
                    <option>Buying</option>
                    <option>Selling</option>
                </select>
            </label>
            <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-medium text-white/76">Message</span>
                <textarea
                    rows="4"
                    placeholder="Tell us what you need."
                    className="w-full rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/28 hover:border-white/18 hover:bg-white/[0.06] focus:border-white/26 focus:bg-white/[0.08]"
                />
            </label>
        </form>
    );
}

function FormsPreview() {
    return (
        <div className="space-y-5">
            <PreviewFrame tone="dark" status="Production" componentLabel="Search / listing filters">
                <div data-theme="dark">
                    <SearchBar variant="section" />
                </div>
            </PreviewFrame>

            <PreviewFrame status="Proposed" componentLabel="Standalone form fields">
                <ProposedStandaloneFields />
            </PreviewFrame>
        </div>
    );
}

function ProductionTestimonialCard() {
    const initials = 'LP';

    return (
        <article className="relative max-w-md overflow-hidden rounded-[1.65rem] border border-white/7 bg-[linear-gradient(145deg,rgba(255,255,255,0.028),rgba(255,255,255,0.012))] p-4 shadow-[0_18px_42px_rgba(0,0,0,0.14)] backdrop-blur-sm">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(230,46,45,0.12),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.022),transparent_38%)]" />

            <div className="relative flex h-full flex-col">
                <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.26em] text-accent/88">
                        Client voice
                    </span>
                    <span className="text-3xl font-semibold leading-none tracking-[-0.06em] text-white/8">
                        ”
                    </span>
                </div>

                <blockquote className="text-[0.95rem] font-medium leading-[1.55] tracking-[-0.012em] text-ivory/92">
                    {previewQuote}
                </blockquote>

                <div className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4">
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] text-xs font-semibold tracking-[0.08em] text-white/90">
                        <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(230,46,45,0.16),transparent_58%)]" />
                        <span className="relative z-10">{initials}</span>
                    </div>

                    <div className="min-w-0">
                        <div className="truncate text-sm font-semibold tracking-tight text-white">
                            Lorem Ipsum
                        </div>
                        <div className="mt-0.5 truncate text-[10px] uppercase tracking-[0.18em] text-white/46">
                            Example attribution
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

function TrustedByPreview() {
    return (
        <div className="relative left-1/2 w-[calc(100%+1rem)] -translate-x-1/2 overflow-hidden px-2 py-4">
            <div className="flex flex-col items-center text-center">
                <span className="text-sm font-semibold uppercase tracking-[0.28em] text-white/58">
                    Trusted by
                </span>
            </div>

            <div className="mt-7 overflow-hidden">
                <div className="flex min-w-max items-center">
                    {[...clientLogos.slice(0, 6), ...clientLogos.slice(0, 6)].map((logo, index) => (
                        <div
                            key={`${logo.alt}-${index}`}
                            className="flex h-[5.25rem] min-w-[10.5rem] flex-none items-center justify-center px-7 py-4"
                            aria-hidden={index >= 6}
                        >
                            <img
                                src={logo.src}
                                alt={index >= 6 ? '' : logo.alt}
                                className="max-h-10 w-auto max-w-[8.75rem] object-contain opacity-70 transition-opacity duration-300 hover:opacity-88"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ProofPreview() {
    return (
        <div className="space-y-5">
            <PreviewFrame status="Production" componentLabel="Testimonial card">
                <ProductionTestimonialCard />
            </PreviewFrame>

            <PreviewFrame status="Production" componentLabel="Trusted-by band">
                <TrustedByPreview />
            </PreviewFrame>
        </div>
    );
}

function FAQAccordionPreview() {
    const [open, setOpen] = useState('register');
    const items = [
        {
            id: 'register',
            title: 'Example frequently asked question?',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere, orci non faucibus maximus, velit dui fringilla nibh.'
        },
        {
            id: 'reserve',
            title: 'Another example FAQ item?',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae arcu non nibh semper aliquet in vitae velit.'
        }
    ];

    return (
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.02] p-5 md:p-6">
            <div className="mb-6">
                <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
                    Example group
                </div>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/62">
                    Example guidance copy for this accordion group.
                </p>
            </div>

            <div className="space-y-3">
                {items.map((item) => {
                    const isOpen = open === item.id;

                    return (
                        <div
                            key={item.id}
                            className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/10 transition-colors duration-300"
                        >
                            <button
                                type="button"
                                onClick={() => setOpen(isOpen ? null : item.id)}
                                className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors duration-300 hover:bg-white/[0.03]"
                            >
                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                                    {isOpen ? (
                                        <Minus size={16} className="text-accent" />
                                    ) : (
                                        <Plus size={16} className="text-accent" />
                                    )}
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold leading-snug text-white md:text-[1.1rem]">
                                        {item.title}
                                    </h3>
                                </div>
                            </button>

                            {isOpen ? (
                                <div className="px-5 pb-5 pl-[4.75rem]">
                                    <div className="h-px w-full bg-white/8" />
                                    <p className="pt-4 text-sm leading-7 text-white/62 md:text-[15px]">
                                        {item.body}
                                    </p>
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function PaginationPreview() {
    const [page, setPage] = useState(2);
    const pages = [1, 2, 3, 4];

    return (
        <div className="flex flex-wrap items-center gap-2">
            <button
                type="button"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="inline-flex h-10 min-w-[2.75rem] items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white/62 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
                <ChevronLeft size={16} />
            </button>
            {pages.map((item) => {
                const active = page === item;
                return (
                    <button
                        key={item}
                        type="button"
                        onClick={() => setPage(item)}
                        className={`inline-flex h-10 min-w-[2.75rem] items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ${
                            active
                                ? 'bg-white text-black'
                                : 'border border-white/10 bg-white/[0.04] text-white/62 hover:bg-white/[0.08] hover:text-white'
                        }`}
                    >
                        {item}
                    </button>
                );
            })}
            <button
                type="button"
                onClick={() => setPage((current) => Math.min(4, current + 1))}
                className="inline-flex h-10 min-w-[2.75rem] items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-white/62 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
}

function DisclosurePreview() {
    return (
        <div className="space-y-5">
            <PreviewFrame status="Production" componentLabel="FAQ accordion pattern">
                <FAQAccordionPreview />
            </PreviewFrame>

            <PreviewFrame status="Proposed" componentLabel="Pagination pattern">
                <PaginationPreview />
            </PreviewFrame>
        </div>
    );
}

export default function StyleKit() {
    useLayoutEffect(() => {
        const html = document.documentElement;
        const body = document.body;
        const root = document.getElementById('root');

        const previousHtmlTheme = html.getAttribute('data-theme');
        const previousHtmlBackground = html.style.backgroundColor;
        const previousHtmlColor = html.style.color;
        const previousHtmlColorScheme = html.style.colorScheme;
        const previousHtmlFilter = html.style.filter;
        const previousHtmlOpacity = html.style.opacity;

        const previousBodyBackground = body.style.backgroundColor;
        const previousBodyColor = body.style.color;
        const previousBodyFilter = body.style.filter;
        const previousBodyOpacity = body.style.opacity;
        const previousBodyTransition = body.style.transition;

        const previousRootBackground = root?.style.backgroundColor ?? '';
        const previousRootColor = root?.style.color ?? '';
        const previousRootFilter = root?.style.filter ?? '';
        const previousRootOpacity = root?.style.opacity ?? '';

        html.setAttribute('data-theme', 'dark');
        html.style.backgroundColor = '#09090b';
        html.style.color = '#faf8f5';
        html.style.colorScheme = 'dark';
        html.style.filter = 'none';
        html.style.opacity = '1';

        body.style.backgroundColor = '#09090b';
        body.style.color = '#faf8f5';
        body.style.filter = 'none';
        body.style.opacity = '1';
        body.style.transition = 'none';

        if (root) {
            root.style.backgroundColor = '#09090b';
            root.style.color = '#faf8f5';
            root.style.filter = 'none';
            root.style.opacity = '1';
        }

        return () => {
            if (previousHtmlTheme) {
                html.setAttribute('data-theme', previousHtmlTheme);
            } else {
                html.removeAttribute('data-theme');
            }

            html.style.backgroundColor = previousHtmlBackground;
            html.style.color = previousHtmlColor;
            html.style.colorScheme = previousHtmlColorScheme;
            html.style.filter = previousHtmlFilter;
            html.style.opacity = previousHtmlOpacity;

            body.style.backgroundColor = previousBodyBackground;
            body.style.color = previousBodyColor;
            body.style.filter = previousBodyFilter;
            body.style.opacity = previousBodyOpacity;
            body.style.transition = previousBodyTransition;

            if (root) {
                root.style.backgroundColor = previousRootBackground;
                root.style.color = previousRootColor;
                root.style.filter = previousRootFilter;
                root.style.opacity = previousRootOpacity;
            }
        };
    }, []);

    return (
        <div
            data-theme="dark"
            className="relative isolate min-h-screen bg-[#09090b] text-white opacity-100"
            style={{ colorScheme: 'dark', filter: 'none' }}
        >
            <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(230,46,45,0.12),transparent_22%),linear-gradient(180deg,#0b0c10_0%,#09090b_100%)]" />
            <div className="mx-auto flex max-w-[96rem] flex-col gap-8 px-6 py-8 md:px-8 lg:flex-row lg:px-10">
                <aside className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:w-[15rem] lg:flex-none">
                    <div className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(15,17,23,0.96),rgba(10,11,16,0.94))] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
                        <div className="border-b border-white/10 px-2 pb-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">
                                Style kit
                            </p>
                            <h2 className="mt-2 text-lg font-semibold tracking-tight text-white">
                                Shared patterns
                            </h2>
                            <p className="mt-2 text-sm leading-6 text-white/58">
                                Production components first. Proposed patterns are labeled explicitly.
                            </p>
                        </div>

                        <nav className="mt-4">
                            <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/38">
                                Sections
                            </p>
                            <div className="flex flex-col gap-1">
                                {navigation.map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className="rounded-lg px-3 py-2 text-sm font-medium text-white/56 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </nav>
                    </div>
                </aside>

                <main className="min-w-0 flex-1 space-y-8">
                    <div className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(145deg,rgba(16,18,24,0.98),rgba(10,11,16,0.98))] px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:px-8">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/42">
                            Internal route
                        </p>
                        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                            Style kit
                        </h1>
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/62">
                            Generic component references, implementation specs, and reusable classes for Aucor web pages.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(14,16,22,0.98),rgba(10,11,16,0.98))] px-6 py-8 shadow-[0_24px_60px_rgba(0,0,0,0.28)] md:px-8">
                        <div className="space-y-12">
                            <Section
                                id="foundations"
                                title="Foundations"
                                description="Core design tokens used across the site: fonts, colors, borders, radii, and shared surface language."
                                preview={<FoundationsPreview />}
                                usage="Use this section as the base reference before composing page-level components."
                                notes={[
                                    'Treat token names as reusable building blocks, not page-specific labels.',
                                    'The system is dark-first, with restrained borders and one accent color.',
                                    'Use the typography tokens below instead of inventing one-off heading scales.'
                                ]}
                                specs={[
                                    {
                                        title: 'Design tokens',
                                        rows: foundationRows
                                    }
                                ]}
                                code={sectionClasses.foundations}
                            />

                            <Section
                                id="actions"
                                title="Actions"
                                description="Production CTA patterns taken from the actual site, plus document-action states used around auctions."
                                preview={<ActionsPreview />}
                                usage="Use primary buttons for one dominant action, use the ghost CTA pattern for secondary account actions, and keep document actions visible even before the document is live."
                                notes={[
                                    'These are production patterns, not abstract button variants.',
                                    'If a new CTA does not already exist as a component, derive it from one of these recurring patterns.',
                                    'ResourceButton is the canonical document-action implementation.'
                                ]}
                                specs={[
                                    {
                                        title: 'Production CTA patterns',
                                        rows: [
                                            ['Primary CTA height', '53px minimum'],
                                            ['Primary radius', '1.1rem / 17.6px'],
                                            ['Ghost CTA radius', 'full / pill'],
                                            ['Text size', '14px'],
                                            ['Primary hover', 'white overlay reveal + subtle arrow shift']
                                        ]
                                    },
                                    {
                                        title: 'Document action',
                                        rows: [
                                            ['Height', '51px minimum'],
                                            ['Radius', '1.05rem / 16.8px'],
                                            ['State labels', 'Live / Soon'],
                                            ['Unavailable state', 'disabled button with tooltip'],
                                            ['Surface', 'white / 4% on dark']
                                        ]
                                    }
                                ]}
                                code={sectionClasses.actions}
                            />

                            <Section
                                id="navigation"
                                title="Navigation"
                                description="Production navbar treatment plus a clearly separated proposed secondary-tab pattern."
                                preview={<NavigationPreview />}
                                usage="Use the navbar pattern as the canonical top-level navigation reference. Use the tab row only when a page genuinely needs a local section switcher."
                                notes={[
                                    'Navbar items and the More dropdown are production.',
                                    'Secondary tabs are proposed until they exist in a production page.',
                                    'Selected pills must keep black text on white.'
                                ]}
                                specs={[
                                    {
                                        title: 'Production navbar',
                                        rows: [
                                            ['Text size', '12px uppercase'],
                                            ['Weight', '500'],
                                            ['Default color', 'white / 82% on floating state'],
                                            ['Hover color', 'accent red'],
                                            ['Dropdown width', '14rem minimum'],
                                            ['Dropdown radius', '1.5rem / 24px']
                                        ]
                                    },
                                    {
                                        title: 'Proposed tabs',
                                        rows: [
                                            ['Padding', '8px vertical / 16px horizontal'],
                                            ['Radius', '8px'],
                                            ['Active surface', 'solid white'],
                                            ['Active text', 'black'],
                                            ['Inactive hover', 'white / 8% surface']
                                        ]
                                    }
                                ]}
                                code={sectionClasses.navigation}
                            />

                            <Section
                                id="typography"
                                title="Typography"
                                description="Generic heading and text tokens used throughout the project."
                                preview={<TypographyPreview />}
                                usage="Use these tokens as the shared type scale for page assembly. Prefer these names over page-specific labels."
                                notes={[
                                    'Display / H1 is for hero or very high-emphasis page openings only.',
                                    'Section / H2 should anchor major sections.',
                                    'Eyebrow and Mono Meta are for labels, dates, and structured metadata.'
                                ]}
                                specs={[
                                    {
                                        title: 'Font families',
                                        rows: [
                                            ['Inter', 'Primary UI and body font'],
                                            ['Playfair Display', 'Editorial / dramatic accent font'],
                                            ['JetBrains Mono', 'Metadata and coded labels']
                                        ]
                                    },
                                    {
                                        title: 'Primary tokens',
                                        rows: [
                                            ['Display / H1', '3.35rem -> 5.8rem, 700, Inter'],
                                            ['Section / H2', '2rem -> 2.6rem, 600/700, Inter'],
                                            ['Card / H3', '1.25rem -> 1.5rem, 600, Inter'],
                                            ['Body', '0.95rem -> 1.125rem, 400, Inter'],
                                            ['Eyebrow / Mono Meta', '0.625rem -> 0.75rem uppercase']
                                        ]
                                    }
                                ]}
                                code={sectionClasses.typography}
                            />

                            <Section
                                id="data-display"
                                title="Data Display"
                                description="Production countdown and auction-fact patterns used on auction surfaces."
                                preview={<DataDisplayPreview />}
                                usage="Use countdowns and fact clusters for auction timing, venue, and event metadata. Keep labels quieter than the values."
                                notes={[
                                    'Both previews are production extracts from live auction pages.',
                                    'Countdown modules should stay compact and low-noise.',
                                    'Fact clusters should not introduce decorative chrome that is not in the production UI.'
                                ]}
                                specs={[
                                    {
                                        title: 'Production countdown',
                                        rows: [
                                            ['Columns', '4'],
                                            ['Card radius', '1.1rem / 17.6px'],
                                            ['Value size', '1.55rem -> 1.75rem'],
                                            ['Label size', '9px -> 10px uppercase'],
                                            ['Surface', 'gradient white / 4.5% to 2%']
                                        ]
                                    },
                                    {
                                        title: 'Auction facts',
                                        rows: [
                                            ['Label style', '10px mono meta'],
                                            ['Value style', '14px medium'],
                                            ['Layout', '2-column facts grid'],
                                            ['Container radius', '2rem / 32px']
                                        ]
                                    },
                                    {
                                        title: 'Micro display patterns',
                                        rows: [
                                            ['Process step chip', 'mono number with accent border'],
                                            ['Status badge', 'accent sold badge on image'],
                                            ['Meta pill', 'white / 5% rounded chip for counts']
                                        ]
                                    }
                                ]}
                                code={sectionClasses['data-display']}
                            />

                            <Section
                                id="cards"
                                title="Cards"
                                description="Production card family for auctions, properties, and sold-property variants."
                                preview={<CardsPreview />}
                                usage="Use these when the card itself is the browsing unit. Keep the family visually related across live and sold states."
                                notes={[
                                    'All previews in this section are production patterns.',
                                    'The upcoming-auction surface is extracted from the live homepage card.',
                                    'Auction and sold property cards should feel related without collapsing into the same state.'
                                ]}
                                specs={[
                                    {
                                        title: 'Engineered for Results',
                                        rows: [
                                            ['Hero card radius', '2.4rem / 38.4px'],
                                            ['Support card radius', '2.4rem / 38.4px'],
                                            ['Value style', 'large tabular numeric display'],
                                            ['Surface', 'dark gradient with subtle accent glow']
                                        ]
                                    },
                                    {
                                        title: 'Upcoming auction surface',
                                        rows: [
                                            ['Radius', '2rem / 32px'],
                                            ['Surface', 'dark gradient with red tint bias'],
                                            ['Countdown variant', 'AuctionCountdown hero'],
                                            ['Actions', 'primary CTA + ResourceButton']
                                        ]
                                    },
                                    {
                                        title: 'Property cards',
                                        rows: [
                                            ['Auction card radius', '1.7rem / 27.2px'],
                                            ['Sold card radius', '1.85rem / 29.6px'],
                                            ['Image treatment', 'full bleed object-cover'],
                                            ['Buttons', 'ghost-style surface with subtle arrow motion']
                                        ]
                                    }
                                ]}
                                code={sectionClasses.cards}
                            />

                            <Section
                                id="forms"
                                title="Forms"
                                description="Production search/input patterns first, with standalone fields documented separately as a proposed extension."
                                preview={<FormsPreview />}
                                usage="Treat SearchBar as the canonical live input system. Only use standalone fields if the page requires direct form entry and no production component already exists."
                                notes={[
                                    'Hero and section search shells are production.',
                                    'Standalone fields are proposed, derived from the existing search/input styling.',
                                    'Do not document a field as canonical until it exists in production or becomes a shared component.'
                                ]}
                                specs={[
                                    {
                                        title: 'Production SearchBar',
                                        rows: [
                                            ['Preview count', 'single production search pattern only'],
                                            ['Rest border', 'white / 10%'],
                                            ['Rest fill', 'white / 4%'],
                                            ['Focus border', 'white / 28%'],
                                            ['Focus fill', 'white / 9%'],
                                            ['Input radius', 'full / pill']
                                        ]
                                    },
                                    {
                                        title: 'Proposed standalone fields',
                                        rows: [
                                            ['Rest border', 'white / 10%'],
                                            ['Focus border', 'white / 26%'],
                                            ['Single-line radius', 'full / pill'],
                                            ['Textarea radius', '1.5rem / 24px'],
                                            ['Status', 'proposed until implemented']
                                        ]
                                    }
                                ]}
                                code={sectionClasses.forms}
                            />

                            <Section
                                id="proof"
                                title="Proof"
                                description="Production proof components: testimonial card treatment and the trusted-by logo band."
                                preview={<ProofPreview />}
                                usage="Use proof patterns after explaining an offer, process, or results. They should reinforce the story, not replace it."
                                notes={[
                                    'Both previews are production extracts from the live site.',
                                    'Logos should not be wrapped in individual capsules.',
                                    'Testimonial cards should remain compact and highly readable.'
                                ]}
                                specs={[
                                    {
                                        title: 'Testimonial card',
                                        rows: [
                                            ['Radius', '1.65rem / 26.4px'],
                                            ['Surface', 'layered white / 2.8% to 1.2%'],
                                            ['Quote size', '0.95rem'],
                                            ['Avatar', '40px circular medallion']
                                        ]
                                    },
                                    {
                                        title: 'Trusted-by band',
                                        rows: [
                                            ['Logo opacity', '70% default'],
                                            ['Treatment', 'moving horizontal logo lane, no per-logo capsules'],
                                            ['Item width', '10.5rem minimum'],
                                            ['Vertical rhythm', '5.25rem lane height']
                                        ]
                                    }
                                ]}
                                code={sectionClasses.proof}
                            />

                            <Section
                                id="disclosure"
                                title="Disclosure"
                                description="Production FAQ accordion pattern plus a clearly labeled proposed pagination pattern."
                                preview={<DisclosurePreview />}
                                usage="Use disclosure only when interaction changes the content itself. Keep the interaction simple, functional, and obvious."
                                notes={[
                                    'The accordion preview is production and follows FAQSection.',
                                    'Pagination is proposed until it is used in a production listing page.',
                                    'Selected pagination text must stay black on white.'
                                ]}
                                specs={[
                                    {
                                        title: 'Production accordion',
                                        rows: [
                                            ['Container radius', '1.5rem / 24px'],
                                            ['Surface', 'black / 10% inside white / 2% column shell'],
                                            ['Icon medallion', '36px bordered circle'],
                                            ['Body style', '14px to 15px with relaxed leading']
                                        ]
                                    },
                                    {
                                        title: 'Proposed pagination',
                                        rows: [
                                            ['Control size', '40px height minimum'],
                                            ['Active surface', 'solid white'],
                                            ['Active text', 'black'],
                                            ['Inactive surface', 'white / 4%'],
                                            ['Status', 'proposed']
                                        ]
                                    }
                                ]}
                                code={sectionClasses.disclosure}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
