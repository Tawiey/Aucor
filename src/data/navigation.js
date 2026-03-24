export const primaryNavItems = [
    { label: 'Properties', to: '/properties', type: 'route' },
    { label: 'Auctions', to: '/auctions', type: 'route' },
    { label: 'Process', to: '#process', type: 'hash' },
    { label: 'Services', to: '/services', type: 'route' },
    { label: 'Contact', to: '/contact', type: 'route' }
];

export const moreNavItems = [
    { label: 'FAQ', to: '#faqs', type: 'hash' },
    { label: 'About Us', to: '/about', type: 'route' },
    { label: 'Our Team', to: '/team', type: 'route' },
    { label: 'Selling a Property', to: '/selling', type: 'route' },
    { label: 'Careers', to: '/careers', type: 'route' }
];

export const footerNavGroups = [
    {
        title: 'Explore',
        links: [
            primaryNavItems[0],
            primaryNavItems[1],
            primaryNavItems[3],
            primaryNavItems[4]
        ]
    },
    {
        title: 'Company',
        links: moreNavItems
    },
    {
        title: 'Social Media',
        links: [
            { label: 'Facebook', href: '#', type: 'external' },
            { label: 'LinkedIn', href: '#', type: 'external' },
            { label: 'Instagram', href: '#', type: 'external' },
            { label: 'YouTube', href: '#', type: 'external' }
        ]
    }
];
