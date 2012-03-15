var hint   = require('jshint/lib/hint');

/**
 * Runs all JavaScript files located in the `code` directory through
 * the JavaScript Hint project (http://www.jshint.com).
 *
 * @param {Array}  code    A list of directories containing JavaScript files
 * @param {Object} options Options passed directly to the JSHint engine
 */
function lint ( code, options ) {
    if ( !options ) {
        options = {};
    }
    if ( !options.node ) {
        options.node = true;
    }
    hint.hint( code, options );
}
global['lint'] = lint;
