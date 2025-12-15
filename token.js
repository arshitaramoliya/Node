const crypto = require('crypto');

/**
 * Lightweight token utility — similar to how JWT works
 * encode: base64(header).base64(payload).hmac_signature
 */
const SECRET = process.env.TOKEN_SECRET || 'dev-secret-change-in-production';

function base64Encode(obj) {
    return Buffer.from(JSON.stringify(obj)).toString('base64url');
}

function base64Decode(str) {
    return JSON.parse(Buffer.from(str, 'base64url').toString('utf8'));
}

function sign(payload, expiresInSec = 3600) {
    const header = { alg: 'sha256', typ: 'token' };
    const data = { ...payload, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + expiresInSec };
    const content = `${base64Encode(header)}.${base64Encode(data)}`;
    const sig = crypto.createHmac('sha256', SECRET).update(content).digest('base64url');
    return `${content}.${sig}`;
}

function verify(token) {
    const parts = token.split('.');
    if (parts.length !== 3) throw new Error('Invalid token format');
    const [encodedHeader, encodedPayload, sig] = parts;
    const content = `${encodedHeader}.${encodedPayload}`;
    const expected = crypto.createHmac('sha256', SECRET).update(content).digest('base64url');
    if (sig !== expected) throw new Error('Invalid signature');
    const payload = base64Decode(encodedPayload);
    if (payload.exp < Math.floor(Date.now() / 1000)) throw new Error('Token expired');
    return payload;
}

// Usage
const token = sign({ userId: 42, role: 'admin' }, 60);
console.log('Token:', token);
console.log('Verified:', verify(token));

module.exports = { sign, verify };
