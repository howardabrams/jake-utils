/**
 * Include the functions from the 'shelljs' project in the global space.
 * See details at... https://github.com/arturadib/shelljs
 */
var fs = require('fs');

require('shelljs/global');

require('./display');
require('./files');
require('./mocha');
require('./jscoverage');
require('./lint');
require('./cmd');
require('./markdown');
require('./project');

global['minify'] = require('./minify');
global['concat'] = require('./concat');
global['replace'] = require('./replace');
global['read'] = fs.readFileSync;
global['write'] = fs.writeFileSync;

// property methods
var properties = require('./properties');
for (var name in properties) {
    if (properties.hasOwnProperty(name)) {
        global[name] = properties[name];
    }
}
