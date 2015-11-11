var gulp = require('gulp');

var gulpSequence = require('gulp-sequence');


/************************************ CLEANERS ************************************/

gulp.task('cleaning docs', function(cb) {
  var del = require('del');
  del(['docs'], cb);
});

/********************************* BUILD JS FILES *********************************/
gulp.task('compiling scripts', function () {
  var ngAnnotate = require('gulp-ng-annotate');
  var concat = require('gulp-concat-util');
  var jshint = require('gulp-jshint');

  return gulp.src('src/**/*.js')
    .pipe(ngAnnotate())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(concat('paging.js'))
    .pipe(concat.header('(function(window, angular, undefined) {\n  \'use strict\';\n\n'))
    .pipe(concat.footer('\n})(window, window.angular);\n'))
    .pipe(gulp.dest('dist/'));
});

gulp.task('compiling minified scripts', function () {
  var ngAnnotate = require('gulp-ng-annotate');
  var concat = require('gulp-concat-util');
  var jshint = require('gulp-jshint');
  var uglify = require('gulp-uglify');

  return gulp.src('src/**/*.js')
    .pipe(ngAnnotate())
    .pipe(jshint('.jshintrc'))
    .pipe(concat('paging.min.js'))
    .pipe(concat.header('(function(window, angular, undefined) {\n  \'use strict\';\n\n'))
    .pipe(concat.footer('\n})(window, window.angular);\n'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});


/**************************** FRONT END DOCUMENTATION *****************************/
gulp.task('compiling documentation', [], function () {
  var jportodocs = require('gulp-jportodocs');

  var options = {
    html5Mode: false,
    title: 'Paging',
    startPage: '/dist'
  };

  return jportodocs.sections({
    core: {
      glob: ['src/**/*.js'],
      title: 'joseporto.paging'
    }
  }).pipe(jportodocs.process(options)).pipe(gulp.dest('docs'));
});

/****************************** INTERNAL SEQUENCES *******************************/
gulp.task('dist', gulpSequence(['build sequence']));

/******************************** MAIN SEQEUNCE **********************************/
gulp.task('build sequence', gulpSequence(
  [
    'compiling scripts',
		'compiling minified scripts'
  ], [
    'compiling documentation'
  ]
));

/******************************* EXPOSED SEQUENCES *******************************/
gulp.task('default', ['cleaning docs'], function () {
  gulp.start('dist');
});
