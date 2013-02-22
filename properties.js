/**
 * Utility functions to get properties like a formatted date and application
 * version.
 *
 */
var fs = require('fs'),
    read = fs.readFileSync,
    dateable = require('dateable');

/**
 * Returns today's date as a formatted string.
 * Default format is 'YYYY-MM-DD', for example '2013-02-18'
 * @param {String} [format]
 * @return {String} today
 */
function today (format) {
    var date = new Date();
    return dateable.format(date, format || 'YYYY-MM-DD');
}

/**
 * Read the version number from the package.json file.
 * If not found, an error is thrown
 * @return {String} version
 * @throws {Error}
 */
function version() {
    var v = pkg().version;
    if (!v) {
        throw new Error('No version found in package.json');
    }
    return v;
}

/**
 * Read the package.json file.
 * If not found, an error is thrown
 * @return {Object} package
 * @throws {Error}
 */
function pkg() {
    return JSON.parse(read('./package.json'));
}

// exports
module.exports = exports = {
    today: today,
    version: version,
    pkg: pkg
};
