var util = require('util');


/**
 * Runs Mocha tests.
 *
 * This function either takes individual, ordered parameters, or it expects
 * the first parameter to be an object containing _named parameters_. These
 * are described in the **Options** section below.
 * 
 * ### Options:
 *
 *  - `files`- Either a glob expression or an array of files.
 *  - `test`- A regular expression to limit what tests are run.
 *  - `coverage`- Boolean. If true, will use code coverage libraries. Defaults to `false`.
 *  - `reporter`- The reporting output to use. Defaults to `spec`.
 *      - `spec` - Good output for command line usage
 *      - `tap` - Report used by Jenkins
 *      - `html-cov` - Report showing the code coverage
 *  - `output` - Optional file that specifies the file to contain the output results.
 *
 * @param {String, Array} files  List of test script files
 * @param {Boolean} coverage If true, will use code coverage libraries. Defaults to `false`.
 * @param {String} reporter The reporting output to use. Defaults to `spec`.
 * @param {String} output specifies the file to contain the output results (Optional).
 */
function mochaTests ( files, test, coverage, reporter, output ) {
    var args = [ "--ui",  "tdd" ];
    
    // If the `files` parameter was an object, then assign
    // the named parameter to the positional parameter, test.
    if ( files.test ) {
        test = files.test;
    }
    if (test) {
        args.push("--grep");
        args.push(test);
    }

    if ( files.coverage ) {
        coverage = files.coverage;
        process.env.COVLIB = "true";
    }
    if ( files.reporter ) {
        reporter = files.reporter;
    }
    if (! reporter) {
        reporter = "spec";
    }
    args.push("--reporter");
    args.push(reporter);
    
    if ( files.output ) {
        output = files.output;
    }
    
    if ( files.directory ) {
        files = findFiles( files.directory, files.files );
    }
    else if ( files.files ) {
        // Now that we re-assigned all of the named parameters
        // we can do the `files` property last and overwrite the
        // `files` object to just the String or Array of files.
        files = files.files;
    }
    
    // Let's convert the files that were given into a single
    // string with each file separated by a space:
    if (! util.isArray(files)) {
        files = findFiles( files );
    }
    for ( file in files ) {
        args.push(files[file]);
    }
    
    cmd("mocha", args, output);
    
    // TODO Use the synchronous version of the cmd to make things wait.
    // cmdSync("mocha", args, output);
}
global['mochaTests'] = mochaTests;
