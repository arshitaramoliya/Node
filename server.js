const http = require('http');
const { fetchData } = require('./async-example');

const routes = {};

function register(method, path, handler) {
    routes[`${method.toUpperCase()}:${path}`] = handler;
}

function sendJSON(res, status, data) {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

// Route definitions
register('GET', '/', (req, res) => {
    sendJSON(res, 200, { message: 'Server is running', version: '1.0.0' });
});

register('GET', '/health', (req, res) => {
    sendJSON(res, 200, { status: 'ok', uptime: process.uptime() });
});

register('GET', '/data', async (req, res) => {
    try {
        const result = await fetchData(1);
        sendJSON(res, 200, result);
    } catch (err) {
        sendJSON(res, 500, { error: err.message });
    }
});

// Server
const server = http.createServer((req, res) => {
    const key = `${req.method}:${req.url}`;
    const handler = routes[key];
    if (handler) {
        handler(req, res);
    } else {
        sendJSON(res, 404, { error: 'Route not found' });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
