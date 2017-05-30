var gulp = require('gulp');

var connect = require('gulp-connect');

/* Serve our angular code. This will not use
 * Our actual backend. The serve will purely serve
 * the angular files.
 */
gulp.task('serve:frontend', ['build:dev'], function () {
  return connect.server({
    root: './dist/',
    port: 8080
  });
});

/* Rebuild client side and serve with simple server (not our backend)
* When any files change */
gulp.task('frontend',['serve:frontend'], function() {
  gulp.watch('./client/bower_components', ['copy:bower-components', 'bower']);
  gulp.watch(['./client/index.html', './client/app/**/*'], ['concat:js', 'copy:views', 'bower']);
  gulp.watch('./client/assets/**', ['copy:assets']);
  gulp.watch('./client/js/**',['copy:js']);
  gulp.watch('./client/css/**',['copy:css']);
  gulp.watch('./client/assets/views/*.html',['copy:views']);
});


/* Rebuild client side when any files change */
gulp.task('frontend:combined', ['build:dev'], function() {
  gulp.watch('./client/bower_components', ['copy:bower-components', 'bower']);
  gulp.watch(['./client/index.html', './client/app/**/*'], ['concat:js', 'copy:views', 'bower']);
  gulp.watch('./client/assets/**', ['copy:assets']);
  gulp.watch('./client/js/*.js', ['copy:js']);
  gulp.watch('./client/css/*.css', ['copy:css']);
  gulp.watch('./client/img/**', ['copy:images']);
  gulp.watch('./client/assets/views/*.html',['copy:views']);


});
