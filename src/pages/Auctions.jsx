import ContentPageShell from '../components/ContentPageShell';

const sections = [
    {
        type: 'feature',
        eyebrow: 'Upcoming Calendar',
        title: 'Track upcoming auction moments in one place.',
        body: 'This page acts as the broader auction index, giving buyers and sellers a clear overview of live campaigns, upcoming sessions, and recently concluded opportunities. It is intentionally lightweight for now, but structured so richer listings and filters can be dropped in without changing the page direction.'
    },
    {
        type: 'grid',
        items: [
            {
                eyebrow: 'Upcoming',
                title: 'Prime Commercial Showcase',
                body: 'A flagship auction slot focused on high-yield commercial inventory, timed for serious buyer participation and tighter campaign visibility.'
            },
            {
                eyebrow: 'Past Auctions',
                title: 'Recently concluded events',
                body: 'Closed auction rounds will sit alongside headline outcomes so visitors can understand the depth, pace, and quality of completed transactions.'
            }
        ]
    }
];

export default function Auctions() {
    return (
        <ContentPageShell
            eyebrow="Auction Directory"
            title="Auction opportunities, organized for faster discovery."
            intro="Use this section as the dedicated auction overview for the site. It gives Aucor a clear destination for the full auction list while keeping the homepage focused on the lead event and featured properties."
            sections={sections}
            cta={{
                eyebrow: 'Next Step',
                title: 'Explore the live property catalogue.',
                body: 'Browse the curated property mix currently being positioned for auction discovery and buyer registration.',
                label: 'View Properties',
                to: '/properties'
            }}
        />
    );
}
