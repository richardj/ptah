'use strict';

var gulp = require('gulp');
var fs = require('fs');
//var replace = require('gulp-replace');
var replace = require('replace');
var rename = require('gulp-rename');
var prompt = require('prompt');
var confirm = require('gulp-confirm');
var zip = require('gulp-zip');

var moduleName = 'default';

gulp.task('writeFile', function() {
  return gulp.src(['src/manifest'])
	/*
  .pipe(prompt.prompt({
    type: 'input',
    name: 'task',
    message: 'What is the module name?'
  }, function(response) {
    var moduleName = response.task;
    console.log(moduleName); 
  }))
	*/
	.pipe(confirm({
		question: 'What is the name of the module? ',
		proceed: function(answer) {
			console.log(answer);
			if (answer != '') {
					
				moduleName = answer;
				return true;
			}
			else {
				return false;
			}
		}
	}))
  .pipe(replace('{MODULE_NAME}', moduleName))
	.pipe(rename(Date.now() + '_manifest.txt'))
	//.pipe(zip(Date.now() + '_manifest.zip'))
  //.pipe(gulp.dest('dist'));
  .pipe(gulp.dest('dist'));
});


gulp.task('userInput', function() {
	prompt.start();

  return prompt.get(['moduleName'], function (err, result) {
    if (err) { return onErr(err); }
		moduleName = result.moduleName;
		return moduleName;	
  });

  function onErr(err) {
    console.log(err);
    return 1;
  }
});

gulp.task('test', function() {
		//prompt.start();

		return prompt.get(['moduleName'], function (err, result) {
			if (err) { return onErr(err); }
			moduleName = result.moduleName;

			replace({
					regex: "{MODULE_NAME}",
					replacement: moduleName,
					paths: ['src/manifest'],
					recursive: true,
					silent: true,
			});
		});

		function onErr(err) {
			console.log(err);
			return 1;
		}
});

gulp.task('default', ['userInput']); 
