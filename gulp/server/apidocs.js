var gulp = require('gulp'),
    apidoc = require('gulp-apidoc');
 
gulp.task('apidoc', function(done){
          apidoc({
            src: "server/routes/",
            dest: "build/",
            debug: true,
            includeFilters: [ ".*\\.js$" ]
          },done);
});
