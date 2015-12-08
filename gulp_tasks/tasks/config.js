'use strict';

var gulp = require('gulp');
var config = require('../common/constants')();

var rename = require('gulp-rename');
var ngConstant = require('gulp-ng-constant');


gulp.task('config-dev', function () {
  gulp.src('env_config/dev.json')
    .pipe(ngConstant({name: 'theOneIo'}))
    .pipe(rename('config.js'))
    .pipe(gulp.dest(config.devDir+'js/'));
});

gulp.task('config-pro', function () {
  gulp.src('env_config/pro.json')
    .pipe(ngConstant({name: 'theOneIo'}))
    .pipe(rename('config.js'))
    .pipe(gulp.dest(config.dest+'js/'));
});

