/**
 * Debounce — delays execution until after wait ms of inactivity
 * Common use: search input, window resize, form auto-save
 */
function debounce(fn, wait = 300) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), wait);
    };
}

/**
 * Throttle — ensures fn runs at most once per interval
 * Common use: scroll events, API polling
 */
function throttle(fn, interval = 300) {
    let lastRun = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastRun >= interval) {
            lastRun = now;
            fn.apply(this, args);
        }
    };
}

module.exports = { debounce, throttle };
