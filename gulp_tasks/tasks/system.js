'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var sh = require('shelljs');
var config = require('../common/constants')();

var rename = require('gulp-rename');
var wiredep = require('gulp-wiredep');
var rev = require('gulp-rev');
var usemin = require('gulp-usemin');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');




/**
 * use in browser
 */
var browserSync = require('browser-sync'),
    reload      = browserSync.reload;

// 传参
var minimist = require('minimist');

var envOptions = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'dev' }
};

var options = minimist(process.argv.slice(2), envOptions);


gulp.task('sass', function(done) {
  gulp.src(config.devDir+'css/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest(config.dest+'css/'))
    // .pipe(minifyCss({
    //   keepSpecialComments: 0
    // }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(config.dest+'css/'))
    .pipe(gulp.dest(config.devDir+'css/'))
    .on('end', done);
});

gulp.task('watch', function() {

  // sass 变化
  gulp.watch(config.devDir+'css/*.scss', ['sass']);


  if(options.env === 'dev') {

    gulp.watch([
      config.devDir+'*.html',
      config.devDir+'js/*.js',
      config.devDir+'templates/*.html',
      config.devDir+'css/*.css'
      ])
      .on('change', reload);
  }else{
    // 生产环境下 同步到 dest
    // index.html change
    gulp.watch([config.devDir+'*.html']).on('change',function  () {
      return runSequence('usemin', 'browser-reload');
    });
    // img
    gulp.watch([config.devDir+'img/*.*']).on('change',function  () {
       return runSequence('copy-image', 'browser-reload');
    });
    // js
    gulp.watch([config.devDir+'js/*.js']).on('change',function  () {
       return runSequence('copy-js', 'browser-reload');
    });
    gulp.watch([config.devDir+'templates/*.html']).on('change',function  () {
       return runSequence('copy-templates', 'browser-reload');
    });
  }

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


// 清空 dest
gulp.task('cleanDest', function () {
  return gulp.src(config.dest, {read: false})
    .pipe(clean());
});

/**
 * use in browser
 */
gulp.task('browser-sync', function() {

    // 默认 dest
    var serverPath = config.dest;
    if(options.env === 'dev') {
      serverPath = config.devDir;
    }

    browserSync.init({
        // 服务开启地址
        server: serverPath,
        index: "index.html",
        directory: false,
        // Linux
        // browser: ["chromium-browser"]
        // Mac
        // browser: ["Google Chrome", "firefox"]
        browser: ["Google Chrome"]
    });

});

// reload
gulp.task('browser-reload', function(){
  reload();
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

// 复制文件 - 图片
gulp.task('copy-image', function () {
   return gulp.src(config.devDir+'img/*')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.dest+'img/'));
});
gulp.task('copy-templates', function () {
   return gulp.src(config.devDir+'templates/*')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.dest+'templates/'));
});
gulp.task('copy-js', function () {
   return gulp.src(config.devDir+'js/*')
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.dest+'js/'));
});

gulp.task('copy-font',function () {
  return gulp.src(config.devDir+'lib/ionic/fonts/*')
       .pipe(rename({dirname: ''}))
       .pipe(gulp.dest(config.dest+'lib/ionic/fonts/'));
});

// 复制文件
gulp.task('copy2Dest', function(){
  return runSequence(['copy-image', 'copy-templates', 'copy-js', 'copy-font']);
});


// 合并js
gulp.task('usemin', function() {
  return gulp.src(config.devDir+'index.html')
    .pipe(usemin({
      js: [ rev ]
    }))
    .pipe(gulp.dest(config.dest));
});


gulp.task('serve', function(){

  if(options.env === 'dev'){
    return runSequence('sass', 'bower', 'watch','browser-sync');
  }else{
    return runSequence('cleanDest', 'copy2Dest','sass', 'bower', 'usemin', 'watch','browser-sync');
  }
});


gulp.task('build', function(){
    options.env = 'pro';
    return runSequence('cleanDest', 'copy2Dest','sass', 'bower', 'usemin');

});
