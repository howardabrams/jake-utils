var cp     = require('child_process');
var fs     = require('fs');
// var Sync   = require('sync');

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
