var fs         = require('fs');
var path       = require('path');
var handlebars = require('handlebars');
var ghm        = require("github-flavored-markdown");

/**
 * Reads the `markdown-header.html`
 * Function: markdown
 *
 *    TODO Describe this function.
 *
 * Parameters:
 *
 *   options - An object of named parameters.
 *
 * Options:
 *
 *   success - Called if the function was successful
 *   error   - Called if the function failed
 *
 * Returns:
 *
 *   void
 *
 * @param input
 * @param output
 * @param options
 */
function markdown( input, output, options ) {
    // console.log(handlebars);
    
    var tmplFile = fs.readFileSync(__dirname + '/markdown-template.html', 'utf8');
    var template = handlebars.compile(tmplFile);
    
    var data = fs.readFileSync(input, 'utf8');
    var model = {
        title: path.basename(input, '.md'),
        body : new handlebars.SafeString( ghm.parse(data, options) )
    };

    fs.writeFileSync(output, template(model) );
}
global['markdown'] = markdown;

