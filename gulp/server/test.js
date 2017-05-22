var gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul'),
    exit = require('gulp-exit'),
    nightwatch = require('gulp-nightwatch');

gulp.task('test:server:pre-test', function () {
  return gulp.src(['server/**/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force `require` to return covered files
    .pipe(istanbul.hookRequire());
});

/*gulp.task('test:e2e', function() {
  return gulp
    .src('server/test/e2e.js')
    .pipe(nightwatch({
      configFile: 'nightwatch.json'
    }));
});*/

/* This will run our mocha tests */
gulp.task('test:server', ['test:server:pre-test'], function(){
   return gulp.src('./server/test/*.js', {read: false})
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 90%
    //.pipe(istanbul.enforceThresholds({ thresholds: { global: 85 } }))
    .pipe(exit());
});
