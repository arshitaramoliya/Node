// Reusable input validation utilities — middleware-style pattern

const validate = {
    isString: (val) => typeof val === 'string' && val.trim().length > 0,
    isPositiveNumber: (val) => typeof val === 'number' && val > 0,
    isEmail: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),

    // Returns { valid: bool, errors: [] }
    check: function (rules, data) {
        const errors = [];
        for (const [field, rule] of Object.entries(rules)) {
            if (!rule(data[field])) {
                errors.push(`Invalid field: ${field}`);
            }
        }
        return { valid: errors.length === 0, errors };
    }
};

// Example usage
const result = validate.check(
    { name: validate.isString, age: validate.isPositiveNumber, email: validate.isEmail },
    { name: "Arshita", age: 25, email: "arshita@example.com" }
);

console.log(result); // { valid: true, errors: [] }

module.exports = validate;
