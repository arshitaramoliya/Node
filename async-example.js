// Async module — Promise-based utilities

const fetchData = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id > 0) {
                resolve({ id, name: `Item ${id}`, timestamp: new Date().toISOString() });
            } else {
                reject(new Error("Invalid ID — must be greater than 0"));
            }
        }, 500);
    });
};

const fetchMultiple = async (ids) => {
    try {
        const results = await Promise.all(ids.map(fetchData));
        return results;
    } catch (err) {
        console.error("Fetch error:", err.message);
    }
};

module.exports = { fetchData, fetchMultiple };
