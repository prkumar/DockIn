var gulp     = require('gulp');
var reporter = require('gulp-codeclimate-reporter');
 
gulp.task('codeclimate', ['test:server'], function() {
  return gulp
    .src(['coverage/lcov.info'], { read: false })
    .pipe(reporter({ token: '0ad5a8a20f54533cde0460e45b51d417da57b12d6ba4e8b0f4bc9ea68da087cd' }))
  ;
});
