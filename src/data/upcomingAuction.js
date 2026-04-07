import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds, format } from 'date-fns';

export const TARGET_DATE = new Date('2026-04-14T11:00:00+02:00');
export const AUCTION_TITLE = 'Prime Commercial Showcase';
export const AUCTION_LOCATION = 'The Houghton Golf Club, Johannesburg';
export const AUCTION_DIRECTIONS = '#';
export const AUCTION_PROPERTY_COUNT = '27 Properties';
export const AUCTION_DATE_SHORT = format(TARGET_DATE, 'dd MMM yyyy');
export const AUCTION_DATE_LONG = format(TARGET_DATE, 'd MMMM yyyy');
export const AUCTION_TIME = '11:00 AM';
export const AUCTION_TIME_LONG = '11h00 SAST';

export const countdownUnits = [
    { key: 'days', label: 'Days', shortLabel: 'D' },
    { key: 'hours', label: 'Hours', shortLabel: 'H' },
    { key: 'minutes', label: 'Minutes', shortLabel: 'M' },
    { key: 'seconds', label: 'Seconds', shortLabel: 'S' }
];

export function calculateTimeLeft() {
    const now = new Date();

    if (now >= TARGET_DATE) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
        days: differenceInDays(TARGET_DATE, now),
        hours: differenceInHours(TARGET_DATE, now) % 24,
        minutes: differenceInMinutes(TARGET_DATE, now) % 60,
        seconds: differenceInSeconds(TARGET_DATE, now) % 60
    };
}

export function formatCountdownNumber(num) {
    return num.toString().padStart(2, '0');
}
