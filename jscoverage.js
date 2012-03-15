var util = require('util');
var path = require('path');

/**
 * Create a JavaScript code coverage-able libraries using `node-jscoverage`.
 *
 * 
 * ### Options:
 *
 *  - `src`- list of directories containing JavaScript source files.
 *  - `dest`- A directory for the destination of the converted files.
 *
 * @param {String, Array} src List of script files to convert
 * @param {String} dest Directory where the converted files will be stored
 */
function jscoverage ( src, dest ) {
    if ( src.dest ) {
        dest = src.dest;
    }
    if ( src.src ) {
        src = src.src;
    }
    
    if ( exists(dest) ) {
        rm ('-rf', dest);
    }
    mkdir(dest);

    if ( util.isArray(src) ) {
        for (s in src) {
            var d = path.join(dest, src[s]);
            mkdir(d);
            cmd("node-jscoverage", [ src[s], d ]);
        }
    }
    else {
        cmd("node-jscoverage", src, dest );
    }    
    
    // TODO I really would like to call the jscoverage from JavaScript,
    // e.g.   cover.processDir(src, dest);
}
global['jscoverage'] = jscoverage;
