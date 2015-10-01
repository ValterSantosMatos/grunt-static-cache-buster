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
                
        // List with the files that were hashed. It will be used in the cache busting process.
        var hashedFiles = new Array();
        // Hashes the files passed in the files src.
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
                fileNameWithHash = path.basename(file).replace(extension, '-' + hash + extension);
                var filePathWithHash = file.replace(extension, '-' + hash + extension);
                
                // Renames the file.
                fs.rename(file, filePathWithHash);
            } else {
                // File is already hashed.
                fileNameWithHash = path.basename(file);
                fileNameWithoutHash = fileNameWithHash.substring(0, fileNameWithHash.indexOf(hash) - 1);
            }

            // Add the file information to the hashedFiles array.
            hashedFiles.push({
                fileNameWithHash: fileNameWithHash,
                extension: extension,
                fileNameWithoutHash: fileNameWithoutHash
            });
            grunt.log.writeln('File "' + fileNameWithoutHash + '" hashed to ' + fileNameWithHash + '.');
        });

        // If there is files to be busted.
        var filesToBust = this.options().filesToBust;
        if (filesToBust && filesToBust.length > 0 && hashedFiles.length > 0) {
            // Cycle the files to be busted.
            filesToBust.forEach(function (file) {
                // Reads the file.
                var content = grunt.file.read(file);
                var hasToReWriteFile = false;

                hashedFiles.forEach(function (fileHashed) {
                    // Cycle the hashed files and replaces the old file names with the new ones.
                    // Regex: '|' is a OR, '\S' one or more non-whitespace characters, '{33}' string length is 33
                    // which is the length of the md5 hash length plus the dash in the name, the 'g' flag replaces 
                    // all occurences.
                    var regex = RegExp('/' + fileHashed.fileNameWithoutHash + '(|(\\S{33}))' + fileHashed.extension,
                        'g');
                    if (regex.test(content)) {
                        content = content.replace(regex, '/' + fileHashed.fileNameWithHash);
                        hasToReWriteFile = true;
                    }
                });

                if (hasToReWriteFile) {
                    // Rewrites the hash file.
                    fs.writeFileSync(file, content, 'utf-8');
                    grunt.log.writeln('Busting "' + file + ' file.');
                }
            });
        };

        grunt.log.writeln('Finished static_cache_buster task.');
    });
};
