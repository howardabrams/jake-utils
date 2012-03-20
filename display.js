var tty    = require('tty');
var util   = require('util');
var color = require('ansi-color').set;

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
    if ( tty.isatty(process.stdout.fd) ) {
        process.stdout.write (      color(line, "blue") + "\n");
        process.stdout.write (" " + color(msg,  "blue") + "\n");
        process.stdout.write (      color(line, "blue") + "\n\n");
    }
    else {
        process.stdout.write ("# " + line + "\n");
        process.stdout.write ("#  " + msg + "\n");
        process.stdout.write ("# " + line + "\n\n");
    }
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
        if ( tty.isatty(process.stdout.fd) ) {
            process.stdout.write ( color(msg, 'bold') + "\n");
        }
        else {
            process.stdout.write (msg + "\n");
        }
    }
    process.stdout.write ("\n");
}
global['end'] = end;


