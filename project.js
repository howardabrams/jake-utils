/**
 * Functions for getting information out of the project's `package.json` file.
 */

/**
 * General helper functions that return information about the project and
 * modules currently running.
 */

var   util = require('util');
var   path = require('path');
var     fs = require('fs');

global['project'] = {
       'directory': getProjectDir(),
       'package': getPackage()
};

/**
 * Returns the Module object of the module that calls this function.
 * 
 * For instance, if `catfoo.js` called this function:
 * 
 *     var proj = require('ce-js-utils').info.getProject();
 * 
 * Then `proj.id` would return:
 * 
 *     /Users/howard/Work/cp-gateway/resources/catfoo.js
 *
 * @returns {Object} the module object of the calling script 
 */

function getProject(mod) {
    if (!mod) {
        return getProject(module);
    }
    if (/jake-utils/.test(mod.id)) {
        if ( mod.parent.parent ) {
            return getProject(mod.parent);
        }
    }
    return mod;
}
exports.getProject = getProject;

/**
 * Returns the project's top-level directory.
 * 
 * For instance, if `catfoo.js` in the `cp-blah` project called this function:
 * 
 *     var dir = require('ce-js-utils').info.getProjectDir();
 * 
 * Then `dir` may return:
 * 
 *     /Users/howard/Work/cp-blah
 *
 * How it works is starting with the calling script and walking up the
 * directory tree until it encounters a `package.json` file.
 * 
 * @returns {String} the name of the directory in this project
 * @param {String} directory (Optional) the name of the directory to search
 */

function getProjectDir(directory) {
    if ( directory ) {
        var pp = path.join(directory, 'package.json');
        // console.log("Analyzing", pp);
        if ( path.existsSync(pp) ) {
            return directory;
        }
        else {
            return getProjectDir( path.dirname(directory) );
        }
    }
    else {
        // console.log("Starting off with", path.dirname(module.parent.id) );
        return getProjectDir( getProject().id );
    }
}
exports.getProjectDir = getProjectDir;

/**
 * Returns an object containing the `package.json` information.
 * @returns {Object} of the package information
 */

function getPackage() {
    var package = path.join(getProjectDir(), 'package.json');
    var body = fs.readFileSync(package, 'utf8');
    return JSON.parse(body);
}
exports.getPackage = getPackage;
