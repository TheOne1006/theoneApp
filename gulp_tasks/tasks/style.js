'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../common/constants')();


gulp.task('sass', function(done) {
  gulp.src(config.devDir+'scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(config.dest+'css/'))
    // .pipe(minifyCss({
    //   keepSpecialComments: 0
    // }))
    // .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(config.devDir+'css/'))
    .on('end', done);
});
