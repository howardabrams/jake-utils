The `jake-utils` is a collection of useful functions for using [Jake][3].

**Note:** I do not expect any one else to find it as useful. It does a
lot of un-orthodox things like creating global functions and attempting
to make everything run synchronously.

  [3]: https://github.com/isaacs/node-jake
  
Usage
-----

In your `Jakefile`, simply add the following code near the top:

    require('jake-utils');

You will then have a number of functions you an use.


Mocha Tests
-----------

My favorite test harness is [Mocha][1]. 

You can now do something like:

    mochaTests({
        directory: "test",
        files    : /test\-.*\.js/,
        coverage : true,
        reporter : 'tap',
        output   : 'test/results.tap'
    });

This restores the `console.log()` before running any of the tests.

**Note:** Using Mocha with [log4js][2] means that your TAP results get wonky
when all `console.log()` calls get interspersed with the TAP code.

 [1]: https://github.com/visionmedia/mocha
 [2]: http://log4js.berlios.de/
 
 
Display Messages
----------------

You can have obnoxious headers around your tasks, to make it stand out
more when you are looking at builds on Jenkins.

    task('api', function() {
        start("Generating the Internal Documentation");
    
        // ...
        
        end("View documents in '%s'", apidest);
    });


Lint Analysis using JSHint
--------------------------

We have a nice wrapper around the [JSHint][4] utility for analyzing all
the files found in the directories specified. For example:

    desc("Lints all of the script files in the source directories");
    task('lint', function(){
        start("Analyzing the Script Files");
    
        var codelib    = [ 'services' , 'routes', 'resources' ];
        lint( codelib );
    
        end();
    });
    
  [4]: https://github.com/jshint/node-jshint/


Concatenate files
--------------------------

The method `concat` is available to concatenate multiple files into one.
The method resolves patterns in filenames, and has options to add a header,
separators, and a footer to the concatenated file. Example:

    desc("Concatenates all source files into library");
    task('concat', function(){
        start("Concatenating the source files");

        var result = concat({
            src: [
                './src/main.js',
                './src/extra.js',
                './src/functions/**',
            ],
            dest: './lib/mylibrary.js',           // optional
            header: '// license information...',  // optional
            separator: '\n',                      // optional
            footer: '// the end...'               // optional
        });

        // returned result is an object containing:
        //     {String} code   The concatenated data
        //     {String} src    The list with resolved filenames

        end();
    });


Minify using uglify-js
--------------------------

The method `minify` is available to minify a source file using [uglify-js][5].
The method accepts one source file, or an array with multiple source files, and
resolves patterns in the filenames. Example:

    desc("Minify the library");
    task('minify', function(){
        start("Minifying library");

        var result = minify({
            src:  './lib/mylibrary.js',
            dest: './lib/mylibrary.min.js',       // optional
            options: {},                          // uglify-js options. optional
            header: '// license information...',  // optional
            separator: '\n',                      // optional
            footer: '// the end...'               // optional
        });

        // returned result is an object containing:
        //     {String} code   The concatenated data
        //     {String} src    The list with resolved filenames

        end();
    });

  [5]: https://github.com/mishoo/UglifyJS2


Replace patterns in files
--------------------------

The method `replace` can be used to replace patterns in files, for example to
fill in today's date or the version number of the package. The patterns can
be a string or a regular expression. The list with source files can contain
patterns. Example:

    desc("Replace version and date in source files");
    task('replace', function(){
        start("Replace version and date in source files");

        var result = replace({
            replacements: [
                {pattern: '@@date',    replacement: today()},
                {pattern: '@@version', replacement: version()}
            },
            src: [
             'main.js',
             'other/*.js'
            ]
        });

        // returned result is an object containing:
        //     {String} src    The list with resolved filenames

        end();
    });

  [5]: https://github.com/mishoo/UglifyJS2


Utility functions
--------------------------

Other utility methods are:

    var p = pkg();              // package.json contents
    var v = version();          // version number from package.json
    var d = today();            // formatted date of today
    var data = read(filename);  // read data (fs.readFileSync)
    write(filename, data);      // write data (fs.writeFileSync)
