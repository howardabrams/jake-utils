var fs = require('fs'),
    read = fs.readFileSync,
    write = fs.writeFileSync,
    jake = require('jake');

/**
 * Replace patterns in text files.
 * Patterns can be a string or a regular expression.
 *
 * Example usage:
 *     var result = replace({
 *         replacements: [
 *             {pattern: '@@date',    replacement: '2013-02-18'},
 *             {pattern: '@@version', replacement: '1.4.0'}
 *         },
 *         src: [
 *          'main.js',
 *          'other/*.js'
 *         ]
 *     });
 *
 * @param {Object} params Object containing parameters:
 *                        {Object[]} replacements Array containing objects with
 *                                                parameters:
 *                                                {String | RegExp} pattern
 *                                                {String}          replacement
 *                        {String | String[]} src The filenames. Can contain
 *                                                patterns.
 * @return {Object} res   Result information. The object contains:
 *                        {String[]} src       List with the filenames on which
 *                                             the replacement is executed
 * @throws {Error}
 */
// TODO: change params of src such that we can also use regex expressions
function replace (params) {
    // do some checks on the provided parameters
    if (!(params instanceof Object)) {
        throw new Error('Object with parameters expected as first argument.');
    }
    if (!params.replacements) {
        throw new Error('Parameter "replacements" missing.');
    }
    if (!(params.replacements instanceof Array)) {
        throw new Error('Parameter "replacements" must be an array.');
    }
    if (!params.src) {
        throw new Error('Parameter "src" containing an array with filenames missing.');
    }

    var filelist = new jake.FileList();
    filelist.include(params.src);
    var filenames = filelist.toArray();

    filenames.forEach(function (filename) {
        var file = String(read(filename));
        params.replacements.forEach(function (replacement, index) {
            // check the replacement parameters
            if (!(replacement instanceof Object)) {
                throw new Error('Parameter "replacement" must be an object.');
            }
            if (!replacement.pattern) {
                throw new Error('Parameter "pattern" in missing replacement object ' +
                    '(index ' + index + ')');
            }
            if (!replacement.replacement) {
                throw new Error('Parameter "replacement" missing in replacement object ' +
                    '(index ' + index + ')');
            }

            file = file.replace(replacement.pattern, replacement.replacement);
        });
        write(filename, file);
    });

    return {
        src: filenames
    }
}

// exports
module.exports = exports = replace;
