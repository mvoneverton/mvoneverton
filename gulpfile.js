'use strict';
 
var gulp = require('gulp');
var webserver = require('gulp-webserver');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var hbsfy = require('hbsfy');
var rimraf = require('rimraf');
var browserify = require('browserify');
 

/****************************************
  JS
*****************************************/

var bundler = browserify({
  entries: ['./src/index.js'],
  debug: true
});

bundler.on('log', gutil.log); // output build logs to terminal
bundler.transform(hbsfy);

gulp.task('clean', function (cb) {
  rimraf('./public/scripts', cb);
});

gulp.task('build', ['clean'], function () {
  return bundler.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./public/scripts'));
});

/*****************************************
Server
*****************************************/

// gulp.task('webserver', function() {
//   gulp.src('app')
//     .pipe(webserver({
//       fallback: "index.html",
//       livereload: true,
//       directoryListing: true,
//       open: true
//     }));
// });

/****************************************
watch
*****************************************/

gulp.task('watch', function () {
  // gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch(['!./scripts/bundle.js', './src/**/*'], ['build']);
});

/****************************************
  default
 *****************************************/

gulp.task('default', ['watch', 'build'])