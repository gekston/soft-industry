var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    spritesmith = require('gulp.spritesmith'),
    cssnano = require('gulp-cssnano'),
    lost = require('lost');

var paths = {
  cssSource: 'source/style/',
  cssDestination: 'dist/css/'
};

gulp.task('sprite', function () {
  var spriteData = gulp.src('./source/img/sprite/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: '_sprite.scss',
    imgPath: '../image/sprite.png',
    padding: 5
  }));
  spriteData.img.pipe(gulp.dest('./dist/image/')); // путь, куда сохраняем картинку
  spriteData.css.pipe(gulp.dest('./source/style/')); // путь, куда сохраняем стили
});

gulp.task('styles', function() {
  return gulp.src(paths.cssSource + '**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss([
      lost(),
      autoprefixer()
    ]))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDestination));
});

gulp.watch(paths.cssSource + '**/*.scss', ['styles']);

gulp.task('default', ['styles']);
