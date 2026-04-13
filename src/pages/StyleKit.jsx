import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Copy, ExternalLink, Minus, Plus } from 'lucide-react';
import SearchBar from '../components/SearchBar';
import AuctionCountdown from '../components/AuctionCountdown';
import AuctionPropertyCard from '../components/AuctionPropertyCard';
import SoldPropertyCard from '../components/SoldPropertyCard';
import ResourceButton from '../components/ResourceButton';
import TrustedByMarquee from '../components/TrustedByMarquee';
import { testimonials } from '../data/testimonials';
import { featuredSoldProperties } from '../data/properties';
import { getAuctionProperties, getNextAuction } from '../data/auctions';

const navigation = [
    { id: 'overview', label: 'Overview' },
    { id: 'actions', label: 'Actions' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'headings', label: 'Headings' },
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
const previewTestimonial = testimonials[0];

const sectionCode = {
    overview: `<SectionShell
  eyebrow="Overview"
  title="Document the system, not the page"
  description="Preview the component clearly. Put the guidance beside it."
/>`,
    actions: `<div className="flex flex-wrap gap-3">
  <PrimaryButton>Pre-register to bid</PrimaryButton>
  <SecondaryButton>Sell your property</SecondaryButton>
  <TextLink href="/auctions">View auctions</TextLink>
  <ResourceButton
    label="Auction Magazine"
    status="coming_soon"
    unavailableMessage="This document becomes available closer to the event."
  />
</div>`,
    navigation: `<nav className="flex items-center gap-6">
  <NavItem active>Auctions</NavItem>
  <NavItem>Properties</NavItem>
  <NavItem>Services</NavItem>
</nav>

<Tabs defaultValue="overview">
  <TabTrigger value="overview">Overview</TabTrigger>
  <TabTrigger value="details">Details</TabTrigger>
  <TabTrigger value="faq">FAQ</TabTrigger>
</Tabs>`,
    headings: `<SectionLabel>Section label</SectionLabel>
<HeroHeading>The team that delivers results.</HeroHeading>
<SectionHeading>Featured sold properties</SectionHeading>
<SupportCopy>
  One short sentence should clarify the message.
</SupportCopy>`,
    'data-display': `<AuctionCountdown timeLeft={timeLeft} variant="detail" />

<SearchBar variant="section" />

<dl className="grid gap-4">
  <DataRow label="Auction date" value="14 April 2026" />
  <DataRow label="Venue" value="The Houghton Golf Club" />
</dl>`,
    cards: `<EventCard auction={auction} />

<div className="grid gap-6 lg:grid-cols-2">
  <PropertyCard property={property} />
  <SoldPropertyCard property={soldProperty} />
</div>`,
    forms: `<form className="space-y-4">
  <Input label="Full name" placeholder="Enter your name" />
  <Input label="Email address" type="email" />
  <Select label="Interest" options={["Buying", "Selling"]} />
  <Textarea label="Message" />
</form>`,
    proof: `<TrustedByMarquee />

<TestimonialCard
  quote={testimonial.quote}
  name={testimonial.name}
  meta={testimonial.meta}
/>`,
    disclosure: `<AccordionItem
  title="How do I register?"
  content="Complete your FICA checks and submit the refundable bidder fee."
/>

<Pagination currentPage={2} totalPages={4} />`
};

function CopyCodeButton({ code, label }) {
    const [copied, setCopied] = useState(false);

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(code);
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
            className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-slate-950"
            aria-label={`Copy ${label} example code`}
        >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy example'}
        </button>
    );
}

function SectionCard({ id, title, description, previewTone = 'light', preview, docs, code }) {
    const previewClassName = previewTone === 'dark'
        ? 'bg-slate-950 text-white'
        : 'bg-slate-50 text-slate-900';

    return (
        <section id={id} className="scroll-mt-24 border-b border-slate-200 pb-12 last:border-b-0">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                    <h2 className="text-xl font-semibold tracking-tight text-slate-950 md:text-2xl">{title}</h2>
                    <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                        {description}
                    </p>
                </div>
                <CopyCodeButton code={code} label={title} />
            </div>

            <div className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(19rem,0.75fr)]">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
                    <div className="mb-4 flex items-center justify-between border-b border-slate-200 pb-3">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                            Preview
                        </span>
                        <span className="text-xs font-medium text-slate-400">Live component</span>
                    </div>
                    <div className={`overflow-hidden rounded-[1rem] p-4 md:p-5 ${previewClassName}`}>
                        {preview}
                    </div>
                </div>

                <aside className="space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                        <h3 className="text-sm font-semibold text-slate-900">Guidelines</h3>
                        <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-700">
                            {docs.map((doc) => (
                                <li key={doc}>{doc}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950">
                        <div className="border-b border-white/10 px-4 py-3">
                            <h3 className="text-sm font-semibold text-white">Example code</h3>
                        </div>
                        <pre className="overflow-x-auto px-4 py-4 text-xs leading-6 text-slate-300">
                            <code>{code}</code>
                        </pre>
                    </div>
                </aside>
            </div>
        </section>
    );
}

function TestimonialPreviewCard() {
    const initials = previewTestimonial.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? '')
        .join('');

    return (
        <article className="max-w-md rounded-xl border border-slate-200 bg-white p-4 text-slate-900 shadow-sm">
            <div className="flex items-start justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Testimonial card
                </span>
                <span className="text-3xl font-semibold leading-none text-slate-200">”</span>
            </div>

            <blockquote className="mt-4 text-[0.95rem] font-medium leading-7 text-slate-700">
                {previewTestimonial.quote}
            </blockquote>

            <div className="mt-5 flex items-center gap-3 border-t border-slate-200 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold tracking-[0.08em] text-white">
                    {initials}
                </div>
                <div>
                    <div className="text-sm font-semibold text-slate-900">{previewTestimonial.name}</div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-slate-500">{previewTestimonial.meta}</div>
                </div>
            </div>
        </article>
    );
}

function PaginationPreview() {
    return (
        <div className="flex flex-wrap items-center gap-2">
            {['Prev', '1', '2', '3', '4', 'Next'].map((item, index) => {
                const active = item === '2';
                return (
                    <button
                        key={item}
                        type="button"
                        className={`inline-flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors ${
                            active
                                ? 'bg-slate-900 text-white'
                                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 hover:text-slate-900'
                        } ${index === 0 || index === 5 ? 'min-w-[4.25rem]' : ''}`}
                    >
                        {item}
                    </button>
                );
            })}
        </div>
    );
}

function EventCardPreview() {
    return (
        <div className="max-w-[25rem] rounded-[1.5rem] bg-[linear-gradient(150deg,rgba(12,12,18,0.94),rgba(27,15,18,0.82))] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.24)] ring-1 ring-white/10">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/58">
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        Event card
                    </span>
                    <h3 className="mt-3 text-[1.45rem] font-bold leading-none tracking-tight text-white">{previewAuction.title}</h3>
                    <span className="mt-3 inline-flex rounded-full bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.16em] text-white/56 ring-1 ring-white/10">
                        {previewAuction.propertyIds.length} Properties
                    </span>
                </div>
                <Link
                    to="/auctions"
                    className="group hidden items-center gap-2 text-sm font-medium text-white/48 transition-colors duration-300 hover:text-accent sm:inline-flex"
                >
                    Details
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
            </div>

            <div className="mt-6">
                <AuctionCountdown timeLeft={previewCountdown} variant="hero" />
            </div>

            <div className="mt-4 text-sm text-white/58">
                14 April 2026 · 11h00 SAST
            </div>

            <div className="mt-6 flex flex-col gap-3">
                <div className="flex flex-col gap-3 sm:flex-row">
                    <button type="button" className="group relative inline-flex min-h-[3.2rem] items-center justify-center overflow-hidden rounded-[1rem] bg-accent px-5 py-3 text-sm font-semibold text-white">
                        <span className="absolute inset-0 translate-y-full bg-white/18 transition-transform duration-500 ease-out group-hover:translate-y-0" />
                        <span className="relative z-10 flex items-center gap-2">
                            Primary Button
                            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                    </button>
                    <button type="button" className="group inline-flex min-h-[3.2rem] items-center justify-center gap-2 rounded-[1rem] bg-white/[0.04] px-5 py-3 text-sm font-medium text-white/72 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[0.08] hover:text-white">
                        Secondary Button
                        <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                </div>
                <div className="max-w-[13.75rem]">
                    <ResourceButton
                        label="Auction Magazine"
                        href="#"
                        status="coming_soon"
                        unavailableMessage="This document becomes available closer to the event."
                        fullWidth
                    />
                </div>
            </div>
        </div>
    );
}

function NavPreview() {
    return (
        <div className="space-y-5">
            <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-center gap-5">
                    <span className="text-sm font-semibold text-slate-950">Aucor</span>
                    <a href="#0" className="text-sm font-medium text-slate-950">Auctions</a>
                    <a href="#0" className="text-sm font-medium text-slate-500 hover:text-slate-950">Properties</a>
                    <a href="#0" className="text-sm font-medium text-slate-500 hover:text-slate-950">Services</a>
                    <a href="#0" className="text-sm font-medium text-slate-500 hover:text-slate-950">Contact</a>
                </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-2">
                <div className="flex flex-wrap gap-2">
                    {['Overview', 'Details', 'FAQ'].map((tab, index) => (
                        <button
                            key={tab}
                            type="button"
                            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                                index === 0 ? 'bg-slate-900 text-white' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-950'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

function FormPreview() {
    return (
        <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Full name</span>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-300"
                    />
                </label>
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Email address</span>
                    <input
                        type="email"
                        placeholder="name@example.com"
                        className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-300"
                    />
                </label>
            </div>

            <div className="grid gap-4 md:grid-cols-[minmax(0,0.65fr)_minmax(0,1fr)]">
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Interest</span>
                    <select className="h-11 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition-colors focus:border-slate-300">
                        <option>Buying</option>
                        <option>Selling</option>
                    </select>
                </label>
                <label className="space-y-2">
                    <span className="text-sm font-medium text-slate-700">Message</span>
                    <textarea
                        rows="4"
                        placeholder="Tell us what you need."
                        className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-slate-300"
                    />
                </label>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="mb-3 text-sm font-medium text-slate-900">Search pattern</p>
                <SearchBar variant="section" />
            </div>
        </div>
    );
}

export default function StyleKit() {
    return (
        <div className="min-h-screen bg-slate-50 pt-10 text-slate-900">
            <div className="mx-auto flex max-w-[96rem] flex-col gap-8 px-6 pb-24 md:px-8 lg:flex-row lg:px-10">
                <aside className="lg:sticky lg:top-8 lg:h-[calc(100vh-4rem)] lg:w-[15rem] lg:flex-none">
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                        <div className="border-b border-slate-200 px-2 pb-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                Style Kit
                            </p>
                            <h1 className="mt-2 text-lg font-semibold tracking-tight text-slate-950">
                                Shared patterns
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                A reusable reference for building the next pages.
                            </p>
                        </div>

                        <nav className="mt-4 space-y-1">
                            <p className="px-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                Sections
                            </p>
                            <div className="flex flex-col gap-1">
                                {navigation.map((item) => (
                                    <a
                                        key={item.id}
                                        href={`#${item.id}`}
                                        className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-100 hover:text-slate-950"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </nav>
                    </div>
                </aside>

                <main className="min-w-0 flex-1">
                    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-7 shadow-sm md:px-8 md:py-8">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                            Internal route
                        </p>
                        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
                            Document the system, not the page
                        </h2>
                        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-[15px]">
                            Keep the shell minimal. Preview the component clearly. Put the guidance beside it. Use generic names so the same patterns can scale across auctions, listings, and future content pages.
                        </p>
                    </div>

                    <div className="mt-8 space-y-10 rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm md:px-8">
                        <SectionCard
                            id="overview"
                            title="Overview"
                            description="The style kit should read like product documentation, not a themed landing page. Keep text normal-sized, use fewer outlines, and let grouping plus soft background shifts do most of the organization."
                            previewTone="light"
                            code={sectionCode.overview}
                            preview={
                                <div className="grid gap-4 md:grid-cols-3">
                                    {[
                                        ['Preview first', 'Show the real component in a stable frame before explaining it.'],
                                        ['Neutral shell', 'Use whites, soft grays, and restrained shadows for the documentation page itself.'],
                                        ['Generic naming', 'Name patterns by purpose so they can be reused anywhere in the product.']
                                    ].map(([title, body]) => (
                                        <div key={title} className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                                            <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
                                            <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
                                        </div>
                                    ))}
                                </div>
                            }
                            docs={[
                                'The page shell should stay light and quiet so the components themselves carry the visual contrast.',
                                'Prefer background tone changes and spacing before adding another border.',
                                'Every section should feel easy to scan in under a few seconds.'
                            ]}
                        />

                        <SectionCard
                            id="actions"
                            title="Actions"
                            description="Use this section to compare action hierarchy and document-state behavior without burying the components in extra chrome."
                            previewTone="light"
                            code={sectionCode.actions}
                            preview={
                                <div className="space-y-5">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <button type="button" className="group relative inline-flex min-h-[3rem] items-center justify-center overflow-hidden rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white">
                                            <span className="absolute inset-0 translate-y-full bg-white/18 transition-transform duration-500 ease-out group-hover:translate-y-0" />
                                            <span className="relative z-10 flex items-center gap-2">
                                                Primary Button
                                                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                                            </span>
                                        </button>

                                        <button type="button" className="group inline-flex min-h-[3rem] items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 transition-colors duration-300 hover:bg-slate-50 hover:text-slate-950">
                                            Secondary Button
                                            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                                        </button>

                                        <Link to="/" className="group inline-flex min-h-[3rem] items-center gap-2 text-sm font-medium text-slate-500 transition-colors duration-300 hover:text-accent">
                                            Text Link
                                            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                                        </Link>
                                    </div>

                                    <div className="grid gap-3 md:grid-cols-2">
                                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                                            <ResourceButton
                                                label="Document Action"
                                                href="#"
                                                status="available"
                                                fullWidth
                                            />
                                        </div>
                                        <div className="rounded-xl border border-slate-200 bg-white p-4">
                                            <ResourceButton
                                                label="Document Action"
                                                href="#"
                                                status="coming_soon"
                                                unavailableMessage="This document becomes available closer to the event."
                                                fullWidth
                                            />
                                        </div>
                                    </div>
                                </div>
                            }
                            docs={[
                                'The primary action should appear once per section.',
                                'Disabled document actions should stay visible when they help set user expectation.',
                                'Text links should rely on color shift and a small arrow move, not heavy animation.'
                            ]}
                        />

                        <SectionCard
                            id="navigation"
                            title="Navigation"
                            description="Use generic navigation patterns that can work in page headers, section headers, and internal tabbed views."
                            previewTone="light"
                            code={sectionCode.navigation}
                            preview={<NavPreview />}
                            docs={[
                                'Nav items should be simple, stable, and easy to scan.',
                                'Tabs should rely on state contrast rather than decorative borders.',
                                'Keep the active item obvious without over-styling the entire row.'
                            ]}
                        />

                        <SectionCard
                            id="headings"
                            title="Headings"
                            description="Headings should be clear, compact, and easy to reuse. The documentation shell should show them at normal reading scale rather than poster scale."
                            previewTone="light"
                            code={sectionCode.headings}
                            preview={
                                <div className="space-y-8">
                                    <div>
                                        <div className="mb-3 flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-accent" />
                                            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                                Section Label
                                            </span>
                                        </div>
                                        <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">
                                            Hero Heading
                                        </h2>
                                        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                                            Supporting copy should usually be one short sentence that clarifies the message.
                                        </p>
                                    </div>

                                    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                                        <h3 className="text-2xl font-semibold tracking-tight text-slate-950">Section Heading</h3>
                                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
                                            Use section headings to explain one idea well and cut repetition in the support line.
                                        </p>
                                    </div>
                                </div>
                            }
                            docs={[
                                'If the support line repeats the heading, remove it.',
                                'Section labels should orient the user, not add a second headline.',
                                'Use regular text sizes in the style guide so component proportion is easy to judge.'
                            ]}
                        />

                        <SectionCard
                            id="data-display"
                            title="Data Display"
                            description="Structured information should feel precise and readable. Keep the documentation shell simple and place the component in a stable preview frame."
                            previewTone="light"
                            code={sectionCode['data-display']}
                            preview={
                                <div className="grid gap-5 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)]">
                                    <div className="rounded-xl border border-slate-200 bg-white p-5">
                                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                            Countdown
                                        </p>
                                        <div className="mt-4 rounded-[1.1rem] bg-slate-950 p-4">
                                            <AuctionCountdown timeLeft={previewCountdown} variant="detail" />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="rounded-xl border border-slate-200 bg-white p-5">
                                            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                                Search
                                            </p>
                                            <SearchBar variant="section" />
                                        </div>
                                        <div className="rounded-xl border border-slate-200 bg-white p-5">
                                            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                                Key details
                                            </p>
                                            <dl className="space-y-3">
                                                {[
                                                    ['Auction date', '14 April 2026'],
                                                    ['Venue', 'The Houghton Golf Club'],
                                                    ['Location', 'Johannesburg']
                                                ].map(([label, value]) => (
                                                    <div key={label} className="flex items-center justify-between gap-4">
                                                        <dt className="text-sm text-slate-500">{label}</dt>
                                                        <dd className="text-sm font-medium text-slate-900">{value}</dd>
                                                    </div>
                                                ))}
                                            </dl>
                                        </div>
                                    </div>
                                </div>
                            }
                            docs={[
                                'Countdown blocks should stay compact and low-noise.',
                                'Filter/search containers should read as tools, not hero art.',
                                'Use fewer outlines and more background separation inside utility previews.'
                            ]}
                        />

                        <SectionCard
                            id="cards"
                            title="Cards"
                            description="Document reusable card families by role and state, not by where they first appeared."
                            previewTone="dark"
                            code={sectionCode.cards}
                            preview={
                                <div className="space-y-6">
                                    <EventCardPreview />
                                    <div className="grid gap-6 xl:grid-cols-2">
                                        {previewProperty && <AuctionPropertyCard property={previewProperty} auction={previewAuction} />}
                                        {previewSoldProperty && <SoldPropertyCard property={previewSoldProperty} />}
                                    </div>
                                </div>
                            }
                            docs={[
                                'Use Event Card for date-led auction context and event CTAs.',
                                'Use Property Card for live inventory with operational detail.',
                                'Use Sold Property Card as proof and make the sold state visible immediately.'
                            ]}
                        />

                        <SectionCard
                            id="forms"
                            title="Forms"
                            description="Forms should feel calm and functional. Inputs, selects, textareas, and search patterns should be readable before they try to look branded."
                            previewTone="light"
                            code={sectionCode.forms}
                            preview={<FormPreview />}
                            docs={[
                                'Form labels should be visible and brief.',
                                'Use one clear field rhythm instead of mixing control heights.',
                                'Reserve stronger styling for the submit action, not every control.'
                            ]}
                        />

                        <SectionCard
                            id="proof"
                            title="Proof"
                            description="Proof modules should be calm, compact, and easy to read. The documentation shell should help users focus on the example rather than competing with it."
                            previewTone="light"
                            code={sectionCode.proof}
                            preview={
                                <div className="space-y-6">
                                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white px-4 py-3">
                                        <TrustedByMarquee />
                                    </div>
                                    <TestimonialPreviewCard />
                                </div>
                            }
                            docs={[
                                'Logo marquees should feel like quiet credibility, not decorative motion.',
                                'Testimonial cards should stay compact so the quote is pleasant to read.',
                                'Let logos and outcomes do more work than support copy in proof sections.'
                            ]}
                        />

                        <SectionCard
                            id="disclosure"
                            title="Disclosure"
                            description="Accordions and pagination are future-facing listing patterns. Keep them simple, legible, and consistent with the rest of the system."
                            previewTone="light"
                            code={sectionCode.disclosure}
                            preview={
                                <div className="space-y-5">
                                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                                        <button type="button" className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left">
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">Accordion Item</p>
                                                <p className="mt-1 text-sm text-slate-600">Use for grouped detail that should stay collapsed by default.</p>
                                            </div>
                                            <Plus size={16} className="text-slate-500" />
                                        </button>

                                        <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
                                            Expanded disclosure content should be front-loaded and easy to skim.
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-slate-200 bg-white p-4">
                                        <div className="mb-4 flex items-center justify-between gap-3">
                                            <p className="text-sm font-medium text-slate-900">Pagination</p>
                                            <Minus size={16} className="text-slate-400" />
                                        </div>
                                        <PaginationPreview />
                                    </div>
                                </div>
                            }
                            docs={[
                                'Accordions should answer one real question clearly and quickly.',
                                'Pagination should feel quietly functional, not decorative.',
                                'Use state contrast and spacing before adding more visual chrome.'
                            ]}
                        />

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold tracking-tight text-slate-950 md:text-2xl">Route</h2>
                                    <p className="mt-2 text-sm leading-7 text-slate-600">
                                        The internal style guide is available at <span className="font-medium text-slate-900">/style-kit</span>.
                                    </p>
                                </div>
                                <Link
                                    to="/style-kit"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors duration-300 hover:text-slate-950"
                                >
                                    Open this page directly
                                    <ExternalLink size={16} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
