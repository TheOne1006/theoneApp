'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
// var concat = require('gulp-concat');
// var minifyCss = require('gulp-minify-css');
var sh = require('shelljs');
var config = require('../common/constants')();

// var rename = require('gulp-rename');
var wiredep = require('gulp-wiredep');
var rev = require('gulp-rev');
var usemin = require('gulp-usemin');
// var clean = require('gulp-clean');
var runSequence = require('run-sequence');

// var ngConstant = require('gulp-ng-constant');

// 传参,暂时不需要
// var minimist = require('minimist');

/**
 * use in browser
 */
var browserSync = require('browser-sync');

gulp.task('watch', function() {
  runSequence (['watch-dev','watch-scss']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

/**
 * use in browser
 */
gulp.task('browser-sync', function() {

    browserSync.init({
        // 服务开启地址
        server: config.devDir,
        index: "index.html",
        directory: false,
        // Linux
        // browser: ["chromium-browser"]
        // Mac
        // browser: ["Google Chrome", "firefox"]
        browser: ["Google Chrome"]
    });

});

// wiredep html
gulp.task('bower', function () {
  return gulp.src(config.devDir+'index.html')
    .pipe(wiredep({
      optional: 'configuration',
      goes: 'here'
    }))
    .pipe(gulp.dest(config.devDir));
});

// 合并js , for build
gulp.task('usemin', function() {
  return gulp.src(config.devDir+'index.html')
    .pipe(usemin({
      css: [ rev() ],
      js: [ rev() ]
    }))
    .pipe(gulp.dest(config.dest));
});


gulp.task('serve', function(){

    return runSequence('cleanSassTarget','sass', 'bower','config-dev', 'watch','browser-sync');
});


gulp.task('build', function(){

    return runSequence(['cleanDest','cleanSassTarget'], 'copy2Dest','sass', 'bower','config-pro', 'usemin');

});
