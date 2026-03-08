/**
 * Simple in-memory rate limiter
 * Usage: call rateLimit(clientId) — returns true if allowed, false if throttled
 */

const requests = new Map();

function rateLimit(clientId, maxRequests = 10, windowMs = 60000) {
    const now = Date.now();
    const entry = requests.get(clientId) || { count: 0, resetAt: now + windowMs };

    if (now > entry.resetAt) {
        // Window expired — reset
        entry.count = 1;
        entry.resetAt = now + windowMs;
    } else {
        entry.count++;
    }

    requests.set(clientId, entry);

    if (entry.count > maxRequests) {
        console.log(`[RateLimit] ${clientId} throttled — ${entry.count} requests in window`);
        return false;
    }

    return true;
}

module.exports = rateLimit;
