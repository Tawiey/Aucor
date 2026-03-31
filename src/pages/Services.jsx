import ContentPageShell from '../components/ContentPageShell';

const sections = [
    {
        type: 'feature',
        eyebrow: 'Service Focus',
        title: 'Auction-led property services for buyers, sellers, and institutions.',
        body: 'This page introduces Aucor’s service offer at a higher level, covering campaign strategy, asset positioning, buyer engagement, and transaction support. The copy is intentionally broad so it can be expanded later with specific service lines and sector depth.'
    },
    {
        type: 'grid',
        items: [
            {
                eyebrow: 'For Sellers',
                title: 'Campaign planning and market positioning',
                body: 'Position assets clearly, package the opportunity properly, and bring the right audience into a competitive sale environment.'
            },
            {
                eyebrow: 'For Buyers',
                title: 'Curated access and guided participation',
                body: 'Create a cleaner path into auctions with clearer information, structured timelines, and a stronger sense of confidence before bidding.'
            }
        ]
    }
];

export default function Services() {
    return (
        <ContentPageShell
            eyebrow="Services"
            title="Structured services around high-conviction property transactions."
            intro="The intent of this page is to give the navigation a proper services destination while staying aligned with the site’s premium, restrained presentation style."
            sections={sections}
            cta={{
                eyebrow: 'Need Guidance',
                title: 'See how the auction process works end-to-end.',
                body: 'The process section on the homepage gives a concise overview of how Aucor positions, markets, and closes opportunities.',
                label: 'View Process',
                to: '/#process'
            }}
        />
    );
}
