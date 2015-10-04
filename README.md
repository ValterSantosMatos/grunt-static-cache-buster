# grunt-static-cache-buster

> Cache busts static files and updates their references

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
        filesToUpdateReferences: [
            'tmp/test/fixtures/file-to-bust.html',
        ],
    }
  },
})
```

### Options

#### filesToUpdateReferences
Type: `Array`
Default value: `[]`

An array containing the files whose references will be updated.
```html
    <!-- Turn this -->
    <script type="text/javascript" src="file-to-bust.js"></script>
    <!-- Into this -->
    <script type="text/javascript" src="file-to-bust-79d310bfe9ba9930c28043700467788e.js"></script>
```

### Usage Examples

#### Basic usage
In this example, the source files will be busted by calculating the md5 and appendig it to the name like: 'file-to-bust.js' into 'file-to-bust-79d310bfe9ba9930c28043700467788e.js'. 

```js
grunt.initConfig({
  static_cache_buster: {
    src: 'file-to-bust.js'
})
```

#### With filesToUpdateReferences Option
In this example, the sources files will be busted and the refences will be updated.

```js
grunt.initConfig({
  static_cache_buster: {
    src: '**/*.js',
    options: {
        filesToUpdateReferences: [
            '**/*.html',
        ],
    }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
**v0.0.11** - 2015-10-04
* Reviewed the regex to update the files references.

**v0.0.1** - 2015-10-01
* Publish the busting task.

## License
Copyright (c) 2015 valter santos matos. Licensed under the MIT license.

## Credits
This plugin was inspired by [grunt-cache-busting](https://github.com/PaulTondeur/grunt-cache-busting)