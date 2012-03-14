/**
 * Include the functions from the 'shelljs' project in the global space.
 * See details at... https://github.com/arturadib/shelljs
 */
require('shelljs/global');

var color = require('ansi-color').set;

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
function files() {
    return keysToArray ( ls(arguments) );
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
function filesAll(glob) {
    return keysToArray ( ls('-R', arguments) );
}
global['allFiles'] = files;

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

/**
 * Displays a message in a formatted way.
 * 
 * Call this at the beginning of a command with a short description
 * of a task. It takes the standard `%s` type parameters.
 *
 * @param {String} msg The message to display 
 */
function start(msg) {
    for( var i = 1; i < arguments.length; i++ ) {
        msg = utils.format(msg, arguments[i]);
    }

    echo (color("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-", "blue"));
    echo (color(msg, "blue"));
    echo (color("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-", "blue"));
    echo ("");
}
global['start'] = start;


/**
 * Displays a conclusion message in a formatted way.
 * 
 * Call this at the _end_ of a task with a short summary (optional)
 * It takes the standard `%s` type parameters.
 *
 * @param {String} msg The message to display 
 */

function end(msg) {
    if (msg) {
        for( var i = 1; i < arguments.length; i++ ) {
            msg = utils.format(msg, arguments[i]);
        }
        echo ( color(msg, 'bold') );
    }
    echo ("");
}
global['end'] = end;


/**
 * Executes a command synchronously and also allows pipes.
 *
 * @param {String} execcmd A string containing the details to exec. Can take %s arguments.
 */
function cmd(execcmd) {
    for( var i = 1; i < arguments.length; i++ ) {
        execcmd = utils.format(execcmd, arguments[i]);
    }
    echo(execcmd);
 
    var results = null;
    try {
        while (!results) {
            cpexec(execcmd, function(code, stdout, stderr) {
                if (code !== 0) {
                    results = stderr;
                    echo(stdout);
                    echo(stderr);
                    exit(code);
                }
            });
        }
    }
    catch (err) {
        if (err.errno !== 'EMFILE') {
            console.warn(err);
        }
    }
}
global['cmd'] = cmd;