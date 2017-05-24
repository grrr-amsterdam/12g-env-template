#!/usr/bin/env node
/**
 * @author David Spreekmeester <david@grrr.nl>
 */
var fs = require('fs');

var template = module.exports = {
    /**
     * Create a .env.template from the .env file
     */
    srcPath: '.env',
    dstPath: '.env.template',

    exists: function() {
        return fs.existsSync(this.dstPath)
    },

    create: function(srcPath = null, dstPath = null) {
        if (srcPath) this.srcPath = srcPath
        if (dstPath) this.dstPath = dstPath

        var writeLine = function(element) {
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
        };

        var write = function(data) {
            data.toString().split('\n').forEach(writeLine)
        };

        fs.readFile(this.srcPath, 'utf8', function (err, data) {
            if (err) throw err;

            if (template.exists()) {
                fs.truncate(template.dstPath, 0, (err) => {
                    write(data)
                    return
                })
            }

            write(data)
        });

        return true;
    }
};
