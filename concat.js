var fs = require('fs'),
    read = fs.readFileSync,
    write = fs.writeFileSync,
    jake = require('jake');

/**
 * Concatenate a list with files into one file
 *
 * Example:
 *     var result = concat({
 *         src: [
 *             './src/main.js',
 *             './src/extra.js',
 *             './src/functions/**',
 *         ],
 *         dest: './lib/mylibrary.js',           // optional
 *         header: '// license information...',  // optional
 *         separator: '\n',                      // optional
 *         footer: '// the end...'               // optional
 *     });
 *
 * @param {Object} params  Object containing:
 *                         {String[]} src       A list with source files to be
 *                                              Included. Can contain patterns.
 *                         {String} [dest]      The target file. Optional
 *                         {String} [separator] Text to be inserted between the
 *                                              files. Optional.
 *                         {String} [header]    Text to be added on top.
 *                                              Optional.
 *                         {String} [footer]    Text to be added at the bottom.
 *                                              Optional.
 * @return {Object} res    Result information. The object contains:
 *                         {String[]} src       List with the filenames of the
 *                                              files which are concatenated
 *                         {String} code        The contents of the concatenated
 *                                              file
 */
function concat (params) {
    // do some checks on the provided parameters
    if (!(params instanceof Object)) {
        throw new Error('Object with parameters expected as first argument.');
    }
    if (!params.src) {
        throw new Error('Parameter "src" containing an array with filenames missing.');
    }

    var code = '';
    var separator = String(params.separator) || '';

    // header
    if (params.header) {
        code += String(params.header) + separator;
    }

    // files
    var filelist = new jake.FileList();
    filelist.include(params.src);
    var filenames = filelist.toArray();
    filenames.map(function(filename) {
        code += read(filename) + separator;
    });

    // footer
    if (params.footer) {
        code += String(params.footer);
    }

    // write output
    if (params.dest) {
        // write file
        write(params.dest, code);
    }

    return {
        src: filenames,
        code: code
    };
}

// exports
module.exports = exports = concat;
