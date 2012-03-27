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
