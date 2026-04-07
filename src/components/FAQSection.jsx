import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';

const faqGroups = [
    {
        id: 'sellers',
        label: 'For Sellers',
        intro: 'Answers for owners preparing to sell by auction.',
        items: [
            {
                question: 'What is a reserve price?',
                answer: 'The reserve price is the seller’s confidential minimum mandate price. It protects the seller by allowing a bid below reserve to be declined. Aucor and the seller agree it in the mandate after due diligence and market analysis.'
            },
            {
                question: 'What does it cost to sell by auction?',
                answer: 'The default cost is about R50,000 for the auction and its marketing. That cost can be negotiated, and Aucor may share or absorb part of it. Commission sits above the mandate price, so the seller receives 100% of the bid price.'
            },
            {
                question: 'What terms govern the sale?',
                answer: 'Aucor uses a proven standard terms sheet designed to protect all parties. It can be tailored to the seller’s needs during the mandate process. Full terms and conditions are available on the Aucor Property website.'
            },
            {
                question: 'How do you market a property?',
                answer: 'Aucor uses a hybrid campaign built for the asset and buyer audience. It can include the Aucor website, social media, direct marketing to a database of 30,000+ subscribers, major property portals, outdoor media, and selected print where needed.'
            }
        ]
    },
    {
        id: 'buyers',
        label: 'For Buyers',
        intro: 'What to know before you register, bid, and buy.',
        items: [
            {
                question: 'How do you register for an auction?',
                answer: 'You can register at the venue or pre-register on the Aucor Property website. Online registration closes the evening before the auction. All bidders must provide FICA documents and pay a refundable R50,000 registration fee. For help, call 011 033 6600.'
            },
            {
                question: 'Where do auctions take place?',
                answer: 'Our live, monthly auction events are held at the Houghton Golf Club in Johannesburg.'
            },
            {
                question: 'Can I bid if I cannot attend the auction in person?',
                answer: 'Yes. Buyers who cannot attend can bid telephonically by prior arrangement. Auctions are also live streamed on the Aucor Property website, YouTube, and Facebook.'
            },
            {
                question: 'What happens if I’m the highest bidder after the fall of the hammer?',
                answer: 'You sign the Conditions of Sale and pay the deposit and commission into the Aucor Property Trust Account. If the property did not meet reserve on the floor, the signed offer is then presented to the seller, who may accept or reject it.'
            }
        ]
    }
];

function FAQColumn({ group, activeIndex, onToggle }) {
    return (
        <div className="rounded-[2rem] border theme-border bg-white/[0.02] p-5 md:p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-accent">
                        {group.label}
                    </div>
                    <p className="mt-3 max-w-md text-sm leading-relaxed theme-text-muted">
                        {group.intro}
                    </p>
                </div>
            </div>

            <div className="space-y-3">
                {group.items.map((item, index) => {
                    const isOpen = activeIndex === index;

                    return (
                        <div
                            key={item.question}
                            className="overflow-hidden rounded-[1.5rem] border theme-border bg-black/10 transition-colors duration-300"
                        >
                            <button
                                type="button"
                                onClick={() => onToggle(index)}
                                className="flex w-full items-start gap-4 px-5 py-4 text-left transition-colors duration-300 hover:bg-white/[0.03]"
                            >
                                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                                    <motion.span
                                        animate={{ rotate: isOpen ? 45 : 0 }}
                                        transition={{ duration: 0.22, ease: 'easeOut' }}
                                    >
                                        <Plus size={16} className="text-accent" />
                                    </motion.span>
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold leading-snug theme-text md:text-[1.1rem]">
                                        {item.question}
                                    </h3>
                                </div>
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.28, ease: 'easeOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5 pl-[4.75rem]">
                                            <div className="h-px w-full bg-white/8" />
                                            <p className="pt-4 text-sm leading-7 theme-text-muted md:text-[15px]">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function FAQSection() {
    const [activeItems, setActiveItems] = useState(() => ({
        sellers: 0,
        buyers: 0
    }));

    const toggleItem = (groupId, index) => {
        setActiveItems((current) => ({
            ...current,
            [groupId]: current[groupId] === index ? -1 : index
        }));
    };

    return (
        <section id="faqs" className="faq-grid-pattern theme-bg theme-text relative overflow-hidden px-6 py-28 md:px-16 md:py-32">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(230,46,45,0.08),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.03),transparent_34%)]" />

            <div className="relative mx-auto max-w-6xl">
                <div className="mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
                    <div className="flex max-w-3xl flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-sm font-bold uppercase tracking-widest theme-text-muted">
                                Auction Guidance
                            </span>
                        </div>

                        <h2 className="text-4xl font-bold tracking-tight leading-[0.96] md:text-5xl lg:text-6xl">
                            FAQs
                        </h2>

                        <p className="max-w-2xl text-lg font-light leading-relaxed theme-text-muted">
                            Clear answers before you sell, register, or bid.
                        </p>
                    </div>

                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest theme-text-muted transition-colors hover:text-accent"
                    >
                        Need more detail?
                        <ArrowRight size={16} />
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    {faqGroups.map((group) => (
                        <FAQColumn
                            key={group.id}
                            group={group}
                            activeIndex={activeItems[group.id]}
                            onToggle={(index) => toggleItem(group.id, index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
