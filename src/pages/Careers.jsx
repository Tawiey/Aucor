import ContentPageShell from '../components/ContentPageShell';

const sections = [
    {
        type: 'feature',
        eyebrow: 'Careers',
        title: 'Create a placeholder home for talent, culture, and future roles.',
        body: 'This route gives the brand a credible careers destination now, even before live vacancies or a fuller recruitment experience are added.'
    },
    {
        type: 'grid',
        items: [
            {
                eyebrow: 'Culture',
                title: 'Performance with polish',
                body: 'Future content can explain the team environment, standards of work, and the type of professionals the business wants to attract.'
            },
            {
                eyebrow: 'Openings',
                title: 'A stable route for future opportunities',
                body: 'This page can later host vacancy lists, role details, and application pathways without any IA changes.'
            }
        ]
    }
];

export default function Careers() {
    return (
        <ContentPageShell
            eyebrow="Careers"
            title="A future-facing page for roles, culture, and growth."
            intro="For now, the page is intentionally lean, but it creates the right place in the site structure for future recruitment content."
            sections={sections}
            cta={{
                eyebrow: 'Stay Connected',
                title: 'Use the contact page for general enquiries.',
                body: 'Until live career workflows are added, the contact page is the best route for high-level business or recruitment questions.',
                label: 'Go to Contact',
                to: '/contact'
            }}
        />
    );
}
