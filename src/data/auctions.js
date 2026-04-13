import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    format
} from 'date-fns';
import { allProperties } from './properties';

export const auctionCountdownUnits = [
    { key: 'days', label: 'Days', shortLabel: 'D' },
    { key: 'hours', label: 'Hours', shortLabel: 'H' },
    { key: 'minutes', label: 'Minutes', shortLabel: 'M' },
    { key: 'seconds', label: 'Seconds', shortLabel: 'S' }
];

export const upcomingAuctions = [
    {
        id: 'AUC-APR-2026',
        slug: 'prime-commercial-showcase',
        title: 'Prime Commercial Showcase',
        summary: 'A tightly curated Johannesburg auction bringing commercial, residential, and industrial opportunities together in one high-conviction event.',
        description: 'Join Aucor for a flagship live event built around serious buyer participation, sharper competitive tension, and a cleaner way to discover assets already positioned for auction. This session combines standout commercial inventory with residential and industrial opportunities curated for high-intent bidders.',
        category: 'Commercial, residential, and industrial',
        city: 'Johannesburg',
        venue: 'The Houghton Golf Club',
        location: 'The Houghton Golf Club, Johannesburg',
        directionsHref: '#',
        dateTime: '2026-04-14T11:00:00+02:00',
        heroImage: '/istrfry-marcus-VLjIWo_Kmao-unsplash.jpg',
        registrationLabel: 'Pre-register to bid',
        registrationSummary: 'Pre-registration closes the evening before the event. FICA documentation and the refundable bidder deposit are required.',
        propertyIds: ['P5846', 'P5841', 'P5809', 'P5808'],
        magazine: {
            href: 'https://www.aucorproperty.co.za/auction-magazine',
            status: 'coming_soon',
            unavailableMessage: 'The auction magazine becomes available closer to the event.'
        }
    },
    {
        id: 'AUC-MAY-2026',
        slug: 'investment-portfolio-session-may-2026',
        title: 'Investment Portfolio Session',
        summary: 'A May auction focused on stabilized income assets and value-add commercial opportunities suited to portfolio buyers.',
        description: 'This event is designed for investors tracking yield, tenant covenant quality, and repositioning upside. The lineup balances resilient neighbourhood retail, office repositioning angles, and multi-let assets with strong operational fundamentals.',
        category: 'Income-led commercial opportunities',
        city: 'Johannesburg',
        venue: 'The Houghton Golf Club',
        location: 'The Houghton Golf Club, Johannesburg',
        directionsHref: '#',
        dateTime: '2026-05-12T11:00:00+02:00',
        heroImage: '/property-images/syed-ayan-malik-DI3MlpRdYeE-unsplash.jpg',
        registrationLabel: 'Pre-register to bid',
        registrationSummary: 'Submit bidder registration before the event to access the full pack, confirmations, and bidding protocols in advance.',
        propertyIds: ['P5912', 'P5913'],
        magazine: {
            href: '#',
            status: 'coming_soon',
            unavailableMessage: 'The auction magazine becomes available closer to the event.'
        }
    },
    {
        id: 'AUC-JUN-2026',
        slug: 'winter-industrial-release-june-2026',
        title: 'Winter Industrial Release',
        summary: 'A June session centered on logistics, warehousing, and distribution stock for operators and investors seeking industrial depth.',
        description: 'The June event leans into industrial fundamentals, pairing scale, logistics access, and occupational utility with the pricing momentum that a live auction environment can unlock.',
        category: 'Industrial and logistics assets',
        city: 'Johannesburg',
        venue: 'The Houghton Golf Club',
        location: 'The Houghton Golf Club, Johannesburg',
        directionsHref: '#',
        dateTime: '2026-06-09T11:00:00+02:00',
        heroImage: '/property-images/dj-steiner-DLpgvZWOnuU-unsplash.jpg',
        registrationLabel: 'Pre-register to bid',
        registrationSummary: 'Secure your bidder profile early to receive final property schedules, event instructions, and pre-auction updates.',
        propertyIds: ['P5914', 'P5915'],
        magazine: {
            href: '#',
            status: 'coming_soon',
            unavailableMessage: 'The auction magazine becomes available closer to the event.'
        }
    },
    {
        id: 'AUC-JUL-2026',
        slug: 'midyear-mixed-use-july-2026',
        title: 'Midyear Mixed-Use Session',
        summary: 'A July event combining mixed-use and urban repositioning opportunities for buyers looking for adaptive reuse potential.',
        description: 'July brings a more design-led auction mix, featuring assets with repositioning potential, stronger placemaking narratives, and distinctive mixed-use upside.',
        category: 'Mixed-use and urban repositioning',
        city: 'Johannesburg',
        venue: 'The Houghton Golf Club',
        location: 'The Houghton Golf Club, Johannesburg',
        directionsHref: '#',
        dateTime: '2026-07-14T11:00:00+02:00',
        heroImage: '/property-images/wrs-tm-pl-TCkIri6lxEo-unsplash.jpg',
        registrationLabel: 'Pre-register to bid',
        registrationSummary: 'Register in advance for bidder verification, event logistics, and access to supporting information packs.',
        propertyIds: ['P5916'],
        magazine: {
            href: '#',
            status: 'coming_soon',
            unavailableMessage: 'The auction magazine becomes available closer to the event.'
        }
    },
    {
        id: 'AUC-AUG-2026',
        slug: 'late-winter-asset-release-august-2026',
        title: 'Late Winter Asset Release',
        summary: 'An August event built around scalable commercial stock and clean operational real estate for decisive bidders.',
        description: 'August closes out the winter cycle with a focused set of commercial and industrial opportunities prepared for buyers who want clear transaction momentum before spring.',
        category: 'Commercial and industrial stock',
        city: 'Johannesburg',
        venue: 'The Houghton Golf Club',
        location: 'The Houghton Golf Club, Johannesburg',
        directionsHref: '#',
        dateTime: '2026-08-12T11:00:00+02:00',
        heroImage: '/property-images/syed-ayan-malik-DI3MlpRdYeE-unsplash.jpg',
        registrationLabel: 'Pre-register to bid',
        registrationSummary: 'Complete bidder registration ahead of time to streamline check-in and gain early visibility on the event pack.',
        propertyIds: ['P5917'],
        magazine: {
            href: '#',
            status: 'coming_soon',
            unavailableMessage: 'The auction magazine becomes available closer to the event.'
        }
    }
];

export function getAuctionRoute(slug) {
    return `/auctions/${slug}`;
}

export function getAuctionBySlug(slug) {
    return upcomingAuctions.find((auction) => auction.slug === slug);
}

export function getNextAuction() {
    const now = new Date();
    return upcomingAuctions.find((auction) => getAuctionDate(auction.dateTime) >= now) ?? upcomingAuctions[0];
}

export function getAuctionDate(dateTime) {
    return new Date(dateTime);
}

export function formatAuctionDateShort(dateTime) {
    return format(getAuctionDate(dateTime), 'dd MMM yyyy');
}

export function formatAuctionDateLong(dateTime) {
    return format(getAuctionDate(dateTime), 'd MMMM yyyy');
}

export function formatAuctionMonth(dateTime) {
    return format(getAuctionDate(dateTime), 'MMMM');
}

export function formatAuctionDay(dateTime) {
    return format(getAuctionDate(dateTime), 'dd');
}

export function formatAuctionTimeShort(dateTime) {
    return format(getAuctionDate(dateTime), 'hh:mm a');
}

export function formatAuctionTimeLong(dateTime) {
    return `${format(getAuctionDate(dateTime), 'HH')}h${format(getAuctionDate(dateTime), 'mm')} SAST`;
}

export function formatAuctionCountdownNumber(num) {
    return num.toString().padStart(2, '0');
}

export function calculateAuctionTimeLeft(dateTime) {
    const targetDate = getAuctionDate(dateTime);
    const now = new Date();

    if (now >= targetDate) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: differenceInDays(targetDate, now),
        hours: differenceInHours(targetDate, now) % 24,
        minutes: differenceInMinutes(targetDate, now) % 60,
        seconds: differenceInSeconds(targetDate, now) % 60
    };
}

export function getAuctionProperties(auction) {
    if (!auction) {
        return [];
    }

    return auction.propertyIds
        .map((propertyId) => allProperties.find((property) => property.id === propertyId))
        .filter(Boolean);
}

export function getAuctionPropertyCountLabel(auction) {
    return `${auction.propertyIds.length} ${auction.propertyIds.length === 1 ? 'Property' : 'Properties'}`;
}
