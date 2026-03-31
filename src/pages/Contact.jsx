import { Mail, MapPin, Phone } from 'lucide-react';

const contactCards = [
    {
        icon: Phone,
        eyebrow: 'Call',
        title: 'Speak to the Aucor team',
        detail: '011 033 6600',
        copy: 'For buyer registration, seller discussions, and general auction enquiries.'
    },
    {
        icon: Mail,
        eyebrow: 'Email',
        title: 'Send an enquiry',
        detail: 'property@aucor.com',
        copy: 'Use email for document requests, campaign questions, and follow-up information.'
    },
    {
        icon: MapPin,
        eyebrow: 'Visit',
        title: 'Johannesburg office',
        detail: 'Contact page location details placeholder',
        copy: 'Use this area for the fuller office and appointment details once finalised.'
    }
];

export default function Contact() {
    return (
        <div className="min-h-screen theme-bg theme-text px-6 pb-24 pt-32 md:px-16">
            <div className="mx-auto flex max-w-7xl flex-col gap-12">
                <header className="overflow-hidden rounded-[2.75rem] border border-white/8 bg-[linear-gradient(145deg,rgba(14,14,18,0.96),rgba(22,15,18,0.92))] px-7 py-10 shadow-[0_30px_90px_rgba(0,0,0,0.2)] md:px-12 md:py-14">
                    <div className="max-w-4xl">
                        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-accent/90">
                            Contact
                        </p>
                        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl md:leading-[0.98]">
                            Dedicated contact details for buyers, sellers, and campaign enquiries.
                        </h1>
                        <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-ivory/66">
                            This page gives the navigation a proper contact destination with more room for office, enquiry, and support detail than the homepage CTA section can comfortably carry.
                        </p>
                    </div>
                </header>

                <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="grid gap-6">
                        {contactCards.map(({ icon: Icon, eyebrow, title, detail, copy }) => (
                            <article
                                key={title}
                                className="rounded-[2rem] border border-white/8 bg-[linear-gradient(160deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.16)]"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="rounded-2xl bg-accent/10 p-3 text-accent">
                                        <Icon size={20} />
                                    </div>
                                    <div>
                                        <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-accent/90">
                                            {eyebrow}
                                        </p>
                                        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                                            {title}
                                        </h2>
                                        <p className="mt-3 text-lg font-medium text-white/88">
                                            {detail}
                                        </p>
                                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory/66">
                                            {copy}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    <section className="rounded-[2.25rem] border border-white/8 bg-white/[0.03] p-7 md:p-8">
                        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.26em] text-accent/90">
                            Enquiry Form
                        </p>
                        <h2 className="text-3xl font-semibold tracking-tight text-white">
                            Start the conversation.
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-ivory/66">
                            This placeholder form gives the page a credible enquiry structure now, while leaving room for a fuller contact workflow later.
                        </p>

                        <form className="mt-8 flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="h-12 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/28 focus:border-white/20"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="h-12 rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/28 focus:border-white/20"
                            />
                            <textarea
                                rows={6}
                                placeholder="Tell us how we can help."
                                className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] px-4 py-4 text-sm text-white outline-none transition-colors duration-300 placeholder:text-white/28 focus:border-white/20"
                            />
                            <button
                                type="button"
                                className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-accent px-6 text-sm font-medium text-white transition-colors duration-300"
                            >
                                <span className="relative z-10">Submit Enquiry</span>
                                <span className="absolute inset-0 z-0 block translate-y-full bg-white/20 transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:translate-y-0" />
                            </button>
                        </form>
                    </section>
                </section>
            </div>
        </div>
    );
}
