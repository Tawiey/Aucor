import ContentPageShell from '../components/ContentPageShell';

const sections = [
    {
        type: 'feature',
        eyebrow: 'For Sellers',
        title: 'Explain the seller journey with more room and more confidence.',
        body: 'This page is intended to become the seller-facing counterpart to the buyer journey on the homepage. For now, it introduces the route and positions Aucor as a structured partner for bringing property to market.'
    },
    {
        type: 'grid',
        items: [
            {
                eyebrow: 'Preparation',
                title: 'Package the opportunity properly',
                body: 'Future content can cover campaign setup, documentation readiness, reserve thinking, and asset positioning.'
            },
            {
                eyebrow: 'Execution',
                title: 'Bring competitive tension to market',
                body: 'Future content can speak to audience reach, auction mechanics, buyer engagement, and transaction support.'
            }
        ]
    }
];

export default function Selling() {
    return (
        <ContentPageShell
            eyebrow="Selling a Property"
            title="A dedicated route for owners considering an auction-led sale."
            intro="This placeholder page keeps seller content out of the main navigation clutter while still giving it a proper, discoverable home."
            sections={sections}
            cta={{
                eyebrow: 'Seller Enquiry',
                title: 'Start a conversation about your asset.',
                body: 'Use the contact page as the next step for a seller-led enquiry until a dedicated seller form is introduced.',
                label: 'Contact Us',
                to: '/contact'
            }}
        />
    );
}
