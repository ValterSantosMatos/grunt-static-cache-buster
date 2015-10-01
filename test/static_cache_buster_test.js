'use strict';

var grunt = require('grunt');

exports._static_cache_buster = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  default_options: function (test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/test/fixtures/file-to-bust.html');
    var expected = grunt.file.read('test/expected/file-to-bust.html');
    test.equal(actual, expected, 'the html should be busted.');

    var hashedFileExists =grunt.file.exists('tmp/test/fixtures/file-to-hash-79d310bfe9ba9930c28043700467788e.js');
    test.equal(true, hashedFileExists, 'the js file should be hashed.');
        
    test.done();
  },
};
