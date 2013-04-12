var fs         = require('fs');
var path       = require('path');
var handlebars = require('handlebars');
var marked     = require("marked");

/**
 * Function: markdown
 *
 * Converts a markdown-formatted file into an HTML file using the
 * [marked parser](https://github.com/chjj/marked).
 *
 * Parameters:
 *
 * @param input    The markdown formatted file to read
 * @param output   The HTML file to write
 * @param options  An object of named parameters (optional).
 *                 See the `marked` project for details on this.
 */

function markdown( input, output, options ) {
    if (options) {
      marked.setOptions(options);
    }
    else {
      marked.setOptions({
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        langPrefix: 'language-',
        highlight: function(code, lang) {
          if (lang === 'js') {
            return highlighter.javascript(code);
          }
          return code;
        }
      });
    }
    
    var tmplFile = fs.readFileSync(__dirname + '/markdown-template.handlebars', 'utf8');
    var template = handlebars.compile(tmplFile);
    
    var data = fs.readFileSync(input, 'utf8');
    var model = {
        title: path.basename(input, '.md'),
        body : new handlebars.SafeString( marked(data) )
    };

    fs.writeFileSync(output, template(model) );
}
global['markdown'] = markdown;

