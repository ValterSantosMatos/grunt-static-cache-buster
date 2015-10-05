/*
 * grunt static cache buster
 * 
 *
 * Copyright (c) 2015 valter santos matos
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    grunt.registerMultiTask('static_cache_buster', 'cache busts static files', function () {

        var path = require('path');
        var fs = require('fs');
        var crypto = require('crypto');

        grunt.log.writeln('Starting static_cache_buster task.');
                
        // List with the files that were be bust.
        var bustedFiles = new Array();
        this.filesSrc.forEach(function (file) {
            // Reads and calculates the file md5 hash.
            var content = grunt.file.read(file);
            var hash = crypto.createHash('md5').update(content).digest('hex');
            var extension = path.extname(file);

            // Stores the file name with and without an hash.
            var fileNameWithHash;
            var fileNameWithoutHash;

            // Check if the file is already hashed.
            if (file.indexOf(hash) === -1) {
                // File name is missing its hash.
                fileNameWithoutHash = path.basename(file, extension);
                
                // Position is always bigger than 0 since the extendion must exist in a file name.
                var position = path.basename(file).lastIndexOf(extension);
                fileNameWithHash = path.basename(file).substring(0, position) + '-' + hash + extension;

                position = file.lastIndexOf(extension);
                var filePathWithHash = file.substring(0, position) + '-' + hash + extension;
                
                // Renames the file.
                fs.rename(file, filePathWithHash);
            } else {
                // File is already busted.
                fileNameWithHash = path.basename(file);
                fileNameWithoutHash = fileNameWithHash.substring(0, fileNameWithHash.indexOf(hash) - 1);
            }

            // Add the file information to the bustedFiles array.
            bustedFiles.push({
                fileNameWithHash: fileNameWithHash,
                extension: extension,
                fileNameWithoutHash: fileNameWithoutHash
            });
            grunt.log.writeln('File "' + fileNameWithoutHash + '" busted to ' + fileNameWithHash + '.');
        });

        // If there is files to be busted.
        var filesToBust = this.options().filesToUpdateReferences;
        if (filesToBust && filesToBust.length > 0 && bustedFiles.length > 0) {
            // Cycle the files to be busted.
            filesToBust.forEach(function (file) {
                // Reads the file.
                var content = grunt.file.read(file);
                var hasToReWriteFile = false;

                bustedFiles.forEach(function (bustedFile) {
                    // Escapes the regex strings so it does not treat any of its characters as special characters.
                    // http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex
                    var escapedFileName = bustedFile.fileNameWithoutHash.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                    var escapeFileExtension = bustedFile.extension.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                    var regex = RegExp(escapedFileName + '(|(\\S{33}))' + escapeFileExtension, 'g');

                    if (regex.test(content)) {
                        content = content.replace(regex, bustedFile.fileNameWithHash);
                        hasToReWriteFile = true;
                    }
                });

                if (hasToReWriteFile) {
                    // Rewrites the hash file.
                    fs.writeFileSync(file, content, 'utf-8');
                    grunt.log.writeln('Updating "' + file + ' file.');
                }
            });
        };

        grunt.log.writeln('Finished static_cache_buster task.');
    });
};
