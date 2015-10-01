# grunt-static-cache-buster

> Cache busts files and updates their references

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-static-cache-buster --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-static-cache-buster');
```

## The "static_cache_buster" task

### Overview
In your project's Gruntfile, add a section named `static_cache_buster` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  static_cache_buster: {
    src: 'tmp/**/**.js',
    options: {
        filesToBust: [
            'tmp/test/fixtures/file-to-bust.html',
        ],
    }
  },
})
```

### Options

#### filesToBust
Type: `Array`
Default value: `[]`

An array containing the files that will be scan to bust the static files.

### Usage Examples

#### Basic usage
In this example, the source files will be hashed by calculating the md5 and appendig it to the name like: 'file-to-hash.js' into 'file-to-hash-79d310bfe9ba9930c28043700467788e.js'. 

```js
grunt.initConfig({
  static_cache_buster: {
    src: 'file-to-hash.js'
})
```

#### With filesToBust Option
In this example, the sources files will be hashed and the files to bust scanned to bust the previous hashed files. 
```html
    <!-- Turn this -->
    <script type="text/javascript" src="/file-to-hash.js"></script>
    <!-- Into this -->
    <script type="text/javascript" src="/file-to-hash-79d310bfe9ba9930c28043700467788e.js"></script>
```

```js
grunt.initConfig({
  static_cache_buster: {
    src: '**/*.js',
    options: {
        filesToBust: [
            '**/*.html',
        ],
    }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
**v0.0.1** - 2015-10-01
* Publish the busting task.

## License
Copyright (c) 2015 valter santos matos. Licensed under the MIT license.

## Credits
This plugin was inspired by [grunt-cache-busting](https://github.com/PaulTondeur/grunt-cache-busting)