'use strict';

var gulp = require('gulp');
var config = require('../common/constants')();
var clean = require('gulp-clean');


// 清空 dest
gulp.task('cleanDest', function () {
  return gulp.src(config.dest, {read: false})
    .pipe(clean());
});

// scss 生成的目录
gulp.task('cleanSassTarget', function () {
  return gulp.src(config.dev+'css/', {read: false})
    .pipe(clean());
});
