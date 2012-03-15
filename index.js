/**
 * Include the functions from the 'shelljs' project in the global space.
 * See details at... https://github.com/arturadib/shelljs
 */
require('shelljs/global');

require('./display');
require('./files');
require('./mocha');
require('./jscoverage');
require('./lint');
require('./cmd');
