/**
 * Created by xiaowei on 2017/6/24.
 */
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var merge = require('merge-stream');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();

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

gulp.task('images', function () {
  var pizza = gulp.src('views/images/*.*').pipe(imagemin({progressive: true})).pipe(gulp.dest('dist/images'));
  var other = gulp.src('img/*.*').pipe(imagemin({progressive: true})).pipe(gulp.dest('dist/images'));
  return merge(pizza, other);
});

gulp.task('scripts', function () {
  gulp.src(['views/js/*.js', 'js/*.js']).pipe(uglify()).pipe(gulp.dest('dist/js'));
});

gulp.task('css', function () {
  gulp.src(['views/css/*.css', 'css/*.css']).pipe(cleanCSS({compatibility: 'ie8'})).pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['images', 'scripts', 'css']);