/**
 * Include the functions from the 'shelljs' project in the global space.
 * See details at... https://github.com/arturadib/shelljs
 */
require('shelljs/global');

var util   = require('util');
var tty    = require('tty');
var cp     = require('child_process');
var fs     = require('fs');
var path   = require('path');
// var Sync   = require('sync');
var color = require('ansi-color').set;

require('./mocha');
require('./jscoverage');
require('./lint');

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
        msg = util.format(msg, arguments[i]);
    }
    var line = "-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-";
    if ( tty.isatty(process.stdin) ) {
        echo (color(line, "blue"));
        echo (color(msg,  "blue"));
        echo (color(line, "blue"));
    }
    else {
        echo (line);
        echo (msg);
        echo (line);
    }
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
            msg = util.format(msg, arguments[i]);
        }
        if ( tty.isatty(process.stdin) ) {
            echo ( color(msg, 'bold') );
        }
        else {
            echo (msg);
        }
    }
    echo ("");
}
global['end'] = end;



/**
 * Executes a shell command line, and allows `%s` substitutions.
 * 
 * This is a synchronous `exec` command, but the function takes
 * multiple parameters that are substituted into the string, for
 * instance:
 * 
 *     exec2("ls %s > %s", '*.js', 'output.txt');
 *     
 * @param execcmd The command string to execute.
 */
function exec2(execcmd) {
    for( var i = 1; i < arguments.length; i++ ) {
        execcmd = util.format(execcmd, arguments[i]);
    }
    echo(execcmd);
    exec(execcmd);
}

/**
 * Executes a command asynchronously to an output file.
 * 
 * **Note:** If the `output` isn't given, the output from the command
 * is sent to the console.
 * 
 * @param {String} command The executable file to run
 * @param {Array} args the arguments to pass to the executable
 * @param {String} output The file to write the stdout results
 * @param {Function} callback Called when the process completes
 */
function cmd(command, args, output, callback) {
    // console.log("$ %s %s", command, args.join(" "));
    
    var child = null;
    var buf = '';
    try {
        var opts = {
                env: process.env
        };
        child = cp.spawn(command, args, opts);
        
        child.stdout.setEncoding('utf8');
        child.stderr.setEncoding('utf8');
    }
    catch (err) {
        console.warn(err);
        exit(1);
    }
    
    child.stdout.on('data', function (data) {
        buf += data;
    });
    
    child.stderr.on('data', function (data) {
        console.warn(data);
    });
    
    child.on('exit', function (code, signal) {
        if (output) {
            fs.writeFileSync(output, buf, 'utf8');
        }
        else {
            console.log(buf);
        }
        
        if (callback) {
            callback(buf);
        }
    });
}
global['cmd'] = cmd;

/**
 * Similar to `cmd` but runs blocks until complete.
 * 
 * Using the `Sync` module. **Currently, this doesn't block.**
 *
 * @param {String} command The executable file to run
 * @param {Array} args the arguments to pass to the executable
 * @param {String} output The file to write the stdout results
 */
function cmdSync(command, args, output) {
    
    var cmdstr = command + ' ' + args.join(" ");
    console.log(cmdstr);
    
    // Sync(function(){
        var opts = {
                env: process.env
        };
        cp.exec(null, cmdstr, opts, function(error, stdout, stderr) {
            if (output) {
                fs.writeFileSync(output, stdout);
            }
            else {
                console.log(stdout);
            }
            console.warn(stderr);

            if (error !== null) {
              console.warn('Error: ' + error);
              exit(error.code);
            }
        });
    // });
}
global['cmdSync'] = cmdSync;
