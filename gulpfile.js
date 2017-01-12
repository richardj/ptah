'use strict';

var gulp = require('gulp');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var prompt = require('prompt');
var zip = require('gulp-zip');
var runSequence = require('run-sequence');

// set the moduleName to default
var moduleName = 'default';

gulp.task('build', function(callback) {
  runSequence('userInput', [
    'writeFile'
  ], callback);
});

gulp.task('userInput', function(callback) {
	prompt.start();

  prompt.get(['moduleName'], function (err, result) {
    if (err) { return onErr(err); }
		moduleName = result.moduleName;
    callback();
  });

  function onErr(err) {
    console.log(err);
    return 1;
  }
});

gulp.task('writeFile', function() {
  return gulp.src(['src/manifest'])
  .pipe(replace('{MODULE_NAME}', moduleName))
	.pipe(rename(Date.now() + '_manifest.txt'))
	.pipe(zip(moduleName + '.zip'))
  .pipe(gulp.dest('dist'));
});


gulp.task('default', ['build']); 
