/**
 * Nebula Brewery — Number Formatting
 * Handles the display of large numbers per GDD Section 14.2.
 */

const SUFFIXES = [
    { value: 1e100, suffix: 'Gg' },  // Googol
    { value: 1e33, suffix: 'Dc' },   // Decillion
    { value: 1e30, suffix: 'No' },   // Nonillion
    { value: 1e27, suffix: 'Oc' },   // Octillion
    { value: 1e24, suffix: 'Sp' },   // Septillion
    { value: 1e21, suffix: 'Sx' },   // Sextillion
    { value: 1e18, suffix: 'Qi' },   // Quintillion
    { value: 1e15, suffix: 'Qa' },   // Quadrillion
    { value: 1e12, suffix: 'T' },    // Trillion
    { value: 1e9, suffix: 'B' },     // Billion
    { value: 1e6, suffix: 'M' },     // Million
    { value: 1e3, suffix: 'K' },     // Thousand
];

/**
 * Format a number for display (e.g., 1.5K, 2.3M, 100B)
 */
export function formatNumber(n) {
    if (n < 0) return '-' + formatNumber(-n);
    if (n < 1000) return Math.floor(n).toString();

    for (const { value, suffix } of SUFFIXES) {
        if (n >= value) {
            const display = n / value;
            if (display >= 100) return Math.floor(display) + suffix;
            if (display >= 10) return display.toFixed(1).replace(/\.0$/, '') + suffix;
            return display.toFixed(2).replace(/\.?0+$/, '') + suffix;
        }
    }

    return Math.floor(n).toString();
}

/**
 * Format a number with full commas (for milestone displays)
 */
export function formatExact(n) {
    return Math.floor(n).toLocaleString('en-US');
}

/**
 * Format a rate (per-second display) with appropriate precision
 */
export function formatRate(n) {
    if (n === 0) return '0';
    if (n < 0.1) return n.toFixed(2);
    if (n < 1) return n.toFixed(1);
    if (n < 1000) return n.toFixed(1).replace(/\.0$/, '');
    return formatNumber(n);
}
