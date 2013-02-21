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
function getToday (format) {
    var date = new Date();
    return dateable.format(date, format || 'YYYY-MM-DD');
}

/**
 * Read the version number from the package.json file.
 * If not found, an error is thrown
 * @return {String} version
 * @throws {Error}
 */
function getVersion() {
    var version = getPackage().version;
    if (!version) {
        throw new Error('No version found in package.json');
    }
    return version;
}

/**
 * Read the package.json file.
 * If not found, an error is thrown
 * @return {Object} package
 * @throws {Error}
 */
function getPackage() {
    return JSON.parse(read('./package.json'));
}

// exports
module.exports = exports = {
    getToday: getToday,
    getVersion: getVersion,
    getPackage: getPackage
};
