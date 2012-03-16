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
        echo (color(line, "blue"));
        echo (color(msg,  "blue"));
        echo (color(line, "blue"));
    }
    else {
        echo ("# " + line);
        echo ("# " + msg);
        echo ("# " + line);
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
        if ( tty.isatty(process.stdout.fd) ) {
            echo ( color(msg, 'bold') );
        }
        else {
            echo (msg);
        }
    }
    echo ("");
}
global['end'] = end;


