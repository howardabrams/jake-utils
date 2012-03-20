The `jake-utils` is a collection of useful functions for my Jakefiles.

**Note:** I do not expect any one else to find it as useful. It does a
lot of un-orthodox things like creating global functions and attempting
to make everything run synchronously.

Usage
-----

In your `Jakefile`, simply add the following code near the top:

    require('jake-utils');

You will then have a number of functions you an use.


Mocha Tests
-----------

My favorite test harness is [Mocha][1], but using it with [log4js][2]
means that your TAP results get wonky.

You can now do something like:

    mochaTests({
        directory: "test",
        files    : /test\-.*\.js/,
        coverage : true,
        reporter : 'tap',
        output   : 'test/results.tap'
    });

This restores the `console.log()` before running any of the tests.

Display Messages
----------------

You can have obnoxious headers around your tasks, to make it stand out
more when you are looking at builds on Jenkins.

    task('api', function() {
        start("Generating the Internal Documentation");
    
        // ...
        
        end("View documents in '%s'", apidest);
    });
