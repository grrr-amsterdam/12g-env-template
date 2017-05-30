#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
var fs = require('fs-extra');

var template = module.exports = {
    /**
     * Create a .env.template from the .env file
     */
    srcPath: '.env',
    dstPath: '.env.template',

    exists: function() {
        return fs.existsSync(template.dstPath)
    },

    /**
     * Creates a template from a .env file.
     * @param string srcPath The path to the .env file
     * @param string dstPath The path to the .env.template file
     * @return Promise <bool> A Promise with the success state.
     */
    create: function(srcPath = null, dstPath = null) {
        return new Promise(function(resolve, reject) {
            if (srcPath) template.srcPath = srcPath
            if (dstPath) template.dstPath = dstPath

            if (!fs.existsSync(template.srcPath)) {
                var msg = 'Can\'t find the source file at '
                    + srcPath
                return reject(msg)
            }

            fs.readFile(template.srcPath, 'utf8')
            .then(data => {
                if (template.exists()) {
                    fs.unlinkSync(template.dstPath)
                }

                template._write(data)
                return resolve(true)

            })
            .catch(err => {
                return reject(err)
            })
        })
    },

    _writeLine: function(element) {
        var split = element.split('=')
        if (
            split[0] == "" || 
            typeof split[0] == "undefined"
        ) {
            fs.appendFileSync(
                template.dstPath, "\n"
            )
            return
        } 

        var emptied = split[0]
        split[1] ? emptied += "=" : true
        emptied += "\n"

        fs.appendFileSync(
            template.dstPath, emptied
        )
    },

    _write: function(data) {
        data.toString().split('\n').forEach(template._writeLine)
    },

};
