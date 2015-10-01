/*
 * grunt static cache buster
 * 
 *
 * Copyright (c) 2015 valter santos matos
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    // load all npm grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },
    
        // Before generating any new files, copies the fixtures files to the tmp folder.
        copy: {
            tests: {
                files: [
                    {
                        expand: true,
                        src: 'test/fixtures/*',
                        dest: 'tmp/',
                    }
                ]
            }
        },

        // Configuration to be run (and then tested).
        static_cache_buster: {
            test: {
                src: 'tmp/**/**.js',
                options: {
                    filesToUpdateReferences: [
                        'tmp/test/fixtures/file-to-update-reference.html',
                    ],
                }
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'copy', 'static_cache_buster', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
