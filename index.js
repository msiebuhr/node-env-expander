/* Recursively fill out specified values with environment variables.
 *
 * $FOO=bar + { "foo": "ENV:$FOO" } -> { "foo": "bar" }
 */

function expander(obj, options) {
    options.env = options.env || process.env;

    // Iterate over arrays
    if (Array.isArray(obj)) {
        return obj.map(function (val) { return expander(val, options); });
    }

    // Iterate over object
    if (typeof obj === 'object' && obj !== null) {
        Object.keys(obj).forEach(function (key) {
            obj[key] = expander(obj[key], options);
        });

        return obj;
    }

    // A STRING!?
    if (typeof obj === 'string') {
        // Not correct prefix?
        if (obj.substr(0, 5) !== 'ENV:$') { return obj; }

        // Get name and test existence
        var name = obj.substr(5);
        if (!(name in options.env)) {
            throw new Error('ENV VAR "' + name + '" not found.');
        }
        return options.env[name];
    }

    return obj;
};

module.exports.expander = expander;
