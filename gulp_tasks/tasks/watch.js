'use strict';

var gulp = require('gulp');
var config = require('../common/constants')();
/**
 * use in browser
 */
var browserSync = require('browser-sync'),
    reload      = browserSync.reload;


/**
 * 检测 开发目录/app 的信息并执行reload
 */
gulp.task('watch-dev', function() {
  gulp.watch([
    config.devDir+'js/**/*.js',
    config.devDir+'js/*.js',
    config.devDir+'*.html',
    config.devDir+'templates/*.html',
    config.devDir+'css/*.css'
    ])
    .on('change', reload);
});


/**
 * 检测执行 sass
 */
gulp.task('watch-scss', function () {
   return gulp.watch(config.devDir+'scss/*.scss', ['sass']);
});
