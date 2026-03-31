import ContentPageShell from '../components/ContentPageShell';

const sections = [
    {
        type: 'feature',
        eyebrow: 'Company',
        title: 'Aucor positioned around trust, pace, and competitive discovery.',
        body: 'This placeholder page gives the brand a proper “About Us” destination in the new IA. It can later expand into the full company story, business model, and market positioning narrative.'
    },
    {
        type: 'grid',
        items: [
            {
                eyebrow: 'Positioning',
                title: 'Built for high-conviction transactions',
                body: 'The company story here should ultimately connect credibility, property experience, and the strength of the auction-led sales mechanism.'
            },
            {
                eyebrow: 'Approach',
                title: 'Clarity over clutter',
                body: 'The tone should remain calm, premium, and deliberate, mirroring the site’s visual language and buyer-facing confidence.'
            }
        ]
    }
];

export default function About() {
    return (
        <ContentPageShell
            eyebrow="About Us"
            title="An about page that gives the brand more room to speak with confidence."
            intro="This page is intentionally lean for the first pass, but it establishes the route and content framing needed for a fuller company story."
            sections={sections}
            cta={{
                eyebrow: 'Explore More',
                title: 'Meet the broader team behind the platform.',
                body: 'Use the team page to extend the story from company positioning into people and capability.',
                label: 'View Team',
                to: '/team'
            }}
        />
    );
}
