'use strict';

var gulp = require('gulp');
var config = require('../common/constants')();
var rename = require('gulp-rename');
var runSequence = require('run-sequence');


// 复制文件 - 图片
gulp.task('copy-image', function () {
   return gulp.src(config.devDir+'img/*')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.dest+'img/'));
});

// 复制模板
gulp.task('copy-templates', function () {
   return gulp.src(config.devDir+'templates/*')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.dest+'templates/'));
});

// 复制js ??
gulp.task('copy-js', function () {

   gulp.src([config.devDir+'js/*.js'])
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.dest+'js/'));

    gulp.src([config.devDir+'js/controllers/*.js'])
         .pipe(rename({dirname: ''}))
         .pipe(gulp.dest(config.dest+'js/controllers/'));

    gulp.src([config.devDir+'js/directives/*.js'])
         .pipe(rename({dirname: ''}))
         .pipe(gulp.dest(config.dest+'js/directives/'));

    gulp.src([config.devDir+'js/services/*.js'])
         .pipe(rename({dirname: ''}))
         .pipe(gulp.dest(config.dest+'js/services/'));

    gulp.src([config.devDir+'js/filters/*.js'])
         .pipe(rename({dirname: ''}))
         .pipe(gulp.dest(config.dest+'js/filters/'));
});

// 复制字体
gulp.task('copy-font',function () {
  return gulp.src(config.devDir+'lib/ionic/fonts/*')
       .pipe(rename({dirname: ''}))
       .pipe(gulp.dest(config.dest+'lib/ionic/fonts/'));
});

// 复制文件
gulp.task('copy2Dest', function(){
  return runSequence(['copy-image', 'copy-templates', 'copy-js', 'copy-font']);
});
