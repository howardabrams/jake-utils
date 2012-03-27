// For most Jakefiles, you'll have the following:
//     require('jake-utils');
// For us, we need to bootstrap ourselves:
require('./index');

desc("Generate the README.html file from the Markdown original");
task('readme', function() {
    start("Rendering the 'README' document");
    
    var output = "README.html";
    markdown('README.md', output);

    end("open '%s'", output);
});
