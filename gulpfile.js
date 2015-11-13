var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var serve = require('./core/tasks/serve');
var sass = require('./core/tasks/sass');
var bundle = require('./core/tasks/bundle');
var iconFont = require('./core/tasks/icon-font');
var templates = require('./core/tasks/templates');
var copy = require('./core/tasks/copy');

var paths = require('./core/tasks/paths');

gulp.task('sass', sass);
gulp.task('copy:images', copy.images);
gulp.task('copy:js', copy.js);
gulp.task('bundle', bundle);
gulp.task('icon-font', iconFont);
gulp.task('templates:clean', templates.clean);
gulp.task('templates:compile', ['templates:clean'], templates.compile);
gulp.task('jade-reload', ['templates:compile'], reload);

gulp.task('watch', function () {
  watch(paths.content.scss.all, function () {
    gulp.start('sass');
  });

  watch(paths.content.scss.colorsDefinition, function () {
    gulp.start('jade-reload');
  });

  watch([
    paths.content.templates.all,
    paths.content.templates.data
  ], function () {
    gulp.start('jade-reload');
  });
});

gulp.task('copy', ['copy:images', 'copy:js']);
gulp.task('compile-all', ['icon-font', 'bundle', 'sass', 'templates:compile', 'copy']);
gulp.task('build', ['compile-all'], function () {
  console.log('Build finished. Compiled files can be found in the dist/ directory.');
  process.exit(0);
});
gulp.task('serve', ['compile-all', 'watch'], serve);
gulp.task('default', ['serve']);
