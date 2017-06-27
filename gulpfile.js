/**
 * Created by xiaowei on 2017/6/24.
 */
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
var jpegtran = require('imagemin-jpegtran');
var pngquant = require('imagemin-pngquant');
var clean = require('gulp-clean');

var config = {
  baseDir: './',
  watchFiles: ['*.html', 'views/**/*.*', 'js/*.js', 'css/*.css']
};

gulp.task('serve', function () {
  browserSync.init({
    files: config.watchFiles,
    server: {
      baseDir: config.baseDir
    },
    minify: false
  });
});

gulp.task('clean', function () {
  return gulp.src('dist/**/*.*', {read: false}).pipe(clean());
});

gulp.task('images', function () {
  var pizzaJpg = gulp.src('views/images/*.jpg').pipe(imagemin({
    use:[jpegtran()]
  })).pipe(gulp.dest('dist/images'));
  var pizzaPng = gulp.src('views/images/*.png').pipe(imagemin({
    quality: '65-80',
    speed: 4,
    use:[pngquant()]
  })).pipe(gulp.dest('dist/images'));
  var otherJpg = gulp.src('img/*.jpg').pipe(imagemin({
    use:[jpegtran()]
  })).pipe(gulp.dest('dist/images'));
  var otherPng = gulp.src('img/*.png').pipe(imagemin({
    quality: '65-80',
    speed: 4,
    use:[pngquant()]
  })).pipe(gulp.dest('dist/images'));
  return merge(pizzaJpg, pizzaPng, otherJpg, otherPng);
});

gulp.task('scripts', function () {
  gulp.src(['views/js/*.js', 'js/*.js']).pipe(uglify()).pipe(gulp.dest('dist/js'));
});

gulp.task('css', function () {
  gulp.src(['views/css/*.css', 'css/*.css']).pipe(cleanCSS({compatibility: 'ie8'})).pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['clean', 'images', 'scripts', 'css']);