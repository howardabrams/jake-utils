var fs = require('fs'),
    write = fs.writeFileSync,
    jake = require('jake'),
    uglify = require('uglify-js');

/**
 * Minify files using uglify-js.
 *
 * Example:
 *     var result = minify({
 *         src:  [
 *             './lib/mylibrary.js'
 *         ],
 *         dest: './lib/mylibrary.min.js',
 *         header: '// license information...'
 *     });
 *
 * @param {Object} params  Object containing:
 *                         {String | String[]} src  One source file or an array
 *                                                  with source files to be
 *                                                  minified. The file names
 *                                                  can contain patterns.
 *                         {String} [dest]      The target file. Optional
 *                         {Object} [options]   uglify-js options.
 *                         {String} [header]    Text to be added on top.
 *                                              Optional.
 *                         {String} [separator] Text to be inserted between
 *                                              header, contents and footer.
 *                                              Optional.
 *                         {String} [footer]    Text to be added at the bottom.
 *                                              Optional.
 * @return {Object} res    Result information. The object contains:
 *                         {String[]} src       List with the filenames of the
 *                                              files which are minified
 *                         {String} code        The contents of the concatenated
 *                                              file.
 */
function minify (params) {
    // do some checks on the provided parameters
    if (!(params instanceof Object)) {
        throw new Error('Object with parameters expected as first argument.');
    }
    if (!params.src) {
        throw new Error('Parameter "src" containing an array with filenames missing.');
    }
    if (params.options) {
        if (!(params.options instanceof Object)) {
            throw new Error('Parameter "options" must be an object.');
        }
    }

    var code = '';
    var separator = String(params.separator) || '';
    var options = params.options || {};

    // header
    if (params.header) {
        code += String(params.header) + separator;
    }

    // src
    var filelist = new jake.FileList();
    filelist.include(params.src);
    var filenames = filelist.toArray();
    var minified = uglify.minify(filenames, options);
    code += minified.code;

    // footer
    if (params.footer) {
        code += separator + String(params.footer);
    }

    // write output
    if (params.dest) {
        write(params.dest, code);
    }

    return {
        src: filenames,
        code: code
    };
}

// exports
module.exports = exports = minify;
