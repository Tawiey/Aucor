import ContentPageShell from '../components/ContentPageShell';

const sections = [
    {
        type: 'feature',
        eyebrow: 'Our Team',
        title: 'A placeholder home for the people behind the auction experience.',
        body: 'This route gives the IA a dedicated team destination without overcommitting to profile density yet. It can later expand into leadership, specialist roles, and regional expertise.'
    },
    {
        type: 'grid',
        items: [
            {
                eyebrow: 'Leadership',
                title: 'Strategic and commercial oversight',
                body: 'Use this slot later for executive leadership, directors, and senior auction specialists.'
            },
            {
                eyebrow: 'Specialists',
                title: 'Sector and transaction support',
                body: 'Use this slot later for brokers, campaign managers, operations, and client-facing specialists.'
            }
        ]
    }
];

export default function Team() {
    return (
        <ContentPageShell
            eyebrow="Team"
            title="The people behind the platform, campaigns, and buyer confidence."
            intro="For now, this page acts as a clean placeholder that validates the information architecture and creates a stable route for future team content."
            sections={sections}
            cta={{
                eyebrow: 'Need Help',
                title: 'Reach out to the team directly.',
                body: 'The contact page is the best next step for general enquiries, registration support, and campaign-related questions.',
                label: 'Contact Aucor',
                to: '/contact'
            }}
        />
    );
}
