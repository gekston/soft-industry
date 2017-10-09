var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    lost = require('lost');

var paths = {
  cssSource: 'source/style/',
  cssDestination: 'dist/css/'
};

gulp.task('styles', function() {
  return gulp.src(paths.cssSource + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss([
      lost(),
      autoprefixer()
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDestination));
});

gulp.watch(paths.cssSource + '**/*.scss', ['styles']);

gulp.task('default', ['styles']);
