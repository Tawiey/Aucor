import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, ArrowRight } from 'lucide-react';

const faqGroups = [
    {
        id: 'sellers',
        label: 'For Sellers',
        intro: 'Clear answers for owners preparing to bring property to auction.',
        items: [
            {
                question: 'What is a reserve price?',
                answer: 'A reserve price is the seller’s mandate value. The purpose of a reserve price is to offer the seller protection on value and provide the option to reject an offer, should it be lower than the reserve. The reserve price is stipulated and agreed in a confidential mandate agreement between Aucor Property and the seller. It is typically determined by various factors, such as a due diligence process and market analysis.'
            },
            {
                question: 'How much does it cost to take a property to auction and who assumes this cost?',
                answer: 'The default cost to put a property on auction is approximately R50,000. This includes the cost of conducting the auction, as well as the marketing and advertising elements involved in generating interest among potential buyers. These costs can be negotiated at the time of the mandate signing. In most cases, Aucor Property will consider sharing or absorbing this cost. This is part of what is agreed between the seller and auctioneer, at mandate signature. Importantly, the commission is paid over and above the mandate price, and the seller receives 100% of the bid price.'
            },
            {
                question: 'What are the default terms and conditions of the sale?',
                answer: 'Aucor Property has a robust and proven terms sheet that effectively covers the interests of all parties involved in the transaction. The standardised agreement can be tailored to accommodate the seller’s requirements through a consultative process between the seller and the Business Development representative. A full set of terms and conditions can be found on the Aucor Property website.'
            },
            {
                question: 'How does Aucor Property maximise the marketing reach for a property?',
                answer: 'Aucor Property uses a robust, hybrid marketing strategy to reach potential buyers. We tailor a range of marketing tools to create the right mix for each property, which may include but are not limited to: The Aucor Property website as a central point for all properties where information is available to prospective buyers; organic and paid social media campaigns on Facebook, LinkedIn and Instagram; targeted direct marketing to a database of 30 000+ subscribers; digital marketing campaigns with leading property portals; outdoor marketing using street pole advertising and billboards; and print media advertising in relevant publications where necessary.'
            }
        ]
    },
    {
        id: 'buyers',
        label: 'For Buyers',
        intro: 'Guidance for bidding, registration, and what happens after the hammer falls.',
        items: [
            {
                question: 'How do you register for an auction?',
                answer: 'Potential bidders can register for the auction either at the venue on the day, or through the pre-registration option available on the Aucor Property website. Please note that online registrations close the evening before the auction event. All eligible bidders will need to provide FICA documentation and pay a refundable fee of R50,000 when registering. For more information, contact the Aucor Property office on 011 033 6600.'
            },
            {
                question: 'Where do auctions take place?',
                answer: 'Our live, monthly auction events are held at the Houghton Golf Club in Johannesburg.'
            },
            {
                question: 'Can I bid if I cannot attend the auction in person?',
                answer: 'Yes. Potential buyers who are unable to attend the auction can still participate. Telephonic bidding can be facilitated by prior arrangement. All auctions are live streamed on Aucor Property’s website, YouTube channel, and Facebook page.'
            },
            {
                question: 'What happens if I’m the highest bidder after the fall of the hammer?',
                answer: 'After signing the Conditions of Sale Agreement, the highest bidder will need to submit their deposit and commission to the Aucor Property Trust Account. If the sale of property is not confirmed on the auction floor, the seller will then be given the option to accept or reject the bid.'
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
                            Clear answers for buyers and sellers, designed to remove friction and give you confidence at every step of the auction process.
                        </p>
                    </div>

                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest theme-text-muted transition-colors hover:text-accent"
                    >
                        Still need clarity?
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
