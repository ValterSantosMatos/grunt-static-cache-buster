'use strict';

var grunt = require('grunt');

exports._static_cache_buster = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  default_options: function (test) {
    test.expect(3);

    var actual = grunt.file.read('tmp/test/fixtures/file-to-update-reference.html');
    var expected = grunt.file.read('test/expected/file-to-update-reference.html');
    test.equal(actual, expected, 'the html references should be updated.');

    var bustedFile1 =grunt.file.exists('tmp/test/fixtures/file-to-bust-79d310bfe9ba9930c28043700467788e.js');
    test.equal(true, bustedFile1, 'the js file should be busted.');
        
    var bustedFile2 =grunt.file.exists('tmp/test/fixtures/file-to-bust/file-to-bust-79d310bfe9ba9930c28043700467788e.js');
    test.equal(true, bustedFile2, 'the js file should be busted.');
    
    test.done();
  },
};
