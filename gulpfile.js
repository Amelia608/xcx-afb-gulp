/*
 * @Descripttion: 
 * @version: 
 * @Author: chenying
 * @Date: 2020-04-29 17:07:23
 * @LastEditors: chenying
 * @LastEditTime: 2020-04-29 18:31:36
 */
const gulp = require('gulp');
const del = require('del');
const gulpRename = require('gulp-rename');
const plumber = require('gulp-plumber');
const gulpScss = require('gulp-sass');
const px2rpx = require('gulp-px2rpx');
const gulpCleanCss = require('gulp-clean-css');
const gulpImagemin = require('gulp-imagemin');
const uglifyes = require('uglify-es');
const gulpUglify = require('gulp-uglify/composer')(uglifyes, console);
const jsonMinify = require('gulp-json-minify');


gulp.task('clean-dist', cb => del(['dist'], cb));

gulp.task('dev-img', () => {
  return gulp.src(['src/**/*.{jpg,png,jpeg,gif,svg}'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('dev-js', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(plumber())
    .pipe(gulp.dest('dist/'));
});

gulp.task('dev-json', () => {
  return gulp.src(['src/**/*.json'])
    .pipe(plumber())
    .pipe(gulp.dest('dist/'));
});

gulp.task('dev-axml', () => {
  return gulp.src(['src/**/*.axml'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('dev-acss', () => {
  return gulp.src(['src/**/*.scss', '!src/sass-utils/**/*.scss'])
    .pipe(plumber())
    .pipe(gulpScss({
      outputStyle: 'expanded',
    }))
    .pipe(gulpRename((path) => {
      path.extname = '.acss';
    }))
    .pipe(px2rpx({
      screenWidth: 375, // 设计稿屏幕, 默认750
      wxappScreenWidth: 750, // 微信小程序屏幕, 默认750
      remPrecision: 6, // 小数精度, 默认6
    }))
    .pipe(gulp.dest('dist'));
});
gulp.task('watch', () => {
  gulp.watch('src/**/*.{jpg,png,jpeg,gif,svg}', ['dev-img']);
  gulp.watch('src/**/*.js', ['dev-js']);
  gulp.watch('src/**/*.json', ['dev-json']);
  gulp.watch('src/**/*.scss', ['dev-acss']);
  gulp.watch('src/**/*.axml', ['dev-axml']);
});

gulp.task('dev', [/*'clean-dist'*/], () => {
  gulp.start('dev-img', 'dev-js', 'dev-json', 'dev-axml', 'dev-acss', 'watch');
});

// gulp.task('build', ['clean-dist'], () => {
//   gulp.start('min-img', 'min-js', 'min-json', 'min-axml', 'min-acss');
// });
