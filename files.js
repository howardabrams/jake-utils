var path   = require('path');
var fs     = require('fs');
var util   = require('util');

/**
 * Gathers up a list of files and returns them in an array.
 * 
 * This allows you to emulate a shell glob pattern:
 * 
 *     var tests = allFiles( 'test/test-*.js' ).join(" ");
 * 
 * @param {String} files A collection of glob patterns for files
 * @returns {Array} list of files 
 */

function files(fileglob) {
    return keysToArray ( ls(fileglob) );
}
global['files'] = files;

/**
 * Gathers up a list of files from directories (and sub-directories)
 * and returns them in an array.
 * 
 * This allows you to emulate a shell glob pattern:
 * 
 *     var tests = allFiles( 'test/test-*.js' ).join(" ");
 * 
 * @param {String} files A collection of glob patterns for files
 * @returns {Array} list of files 
 */

function filesAll(fileglob) {
    return keysToArray ( ls('-R', fileglob) );
}
global['allFiles'] = files;


/**
 * Beginning with a directory, this searches it for all files that match
 * a particular pattern.
 * 
 * @param {String} The name of a directory, e.g. `test`
 * @param {RegeExp} A regular expression to match against the files.
 */

function findFiles(directory, pattern) {
    // Make sure current directory is an actual directory:    
    if (directory) {
        var stat = fs.statSync(directory);
        if (! util.isRegExp(pattern)) {
            pattern = new RegExp(pattern);
        }
        if (stat.isDirectory()) {
            return findFiles2(directory, pattern);
        }
    }
    throw new Error("Not a directory: " + directory);
}

function findFiles2(directory, pattern) {
    var results = [];
    var filenames = fs.readdirSync(directory);
    for ( f in filenames ) {
        var file = filenames[f];
        var fullname = path.join(directory, file);

        if (fs.statSync(fullname).isDirectory()) {
            results = results.concat( findFiles2(fullname, pattern) );
        } 
        else {
            if ( pattern.test(file) ) {
                results.push(fullname);
            }
        }
    }
    return results;
}
global['findFiles'] = findFiles;



/**
 * Creates an array from the keys (property names) of an object.
 * 
 * This function is useful for converting the results of an `ls`
 * into a string of files, for instance:
 * 
 *     files = keysToArray ( ls( 'test/test-*.js') ).join(' ');
 *     
 * @param {Object} obj An object that contains one or more property names.
 * @returns {Array} An array made of the keys of the object.
 */
function keysToArray(obj) {
    var results = [];
    for (key in obj) {
        results.push(key);
    }
    return results;
}

