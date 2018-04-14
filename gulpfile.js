var gulp = require('gulp');
var clean = require('gulp-clean'); //清除目录
var runSequence = require('run-sequence'); //同步
var minifyCss = require('gulp-minify-css'); //css压缩
var uglify = require('gulp-uglify'); //js压缩
var assetRev = require('gulp-asset-rev'); //添加版本号

//清除目录
gulp.task('clean', function () {
  return gulp.src('dist/*', {
    read: false
  })
    .pipe(clean())
});

//css压缩
gulp.task('minifyCss', function () {
  gulp.src(['*/**/*.css', '!node_modules/**'])
    .pipe(minifyCss())
    .pipe(gulp.dest('dist'))
});

//js压缩
gulp.task('uglify', function () {
  gulp.src(['*/**/*.js', '!node_modules/**'])
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
});
//复制html页面
gulp.task('copyHtml', function () {
  return gulp.src(['*/**/*.html', '!node_modules/**', '*.html'])
    .pipe(gulp.dest('dist'))
});
//复制图片
gulp.task('copyImages', ['copyHtml'], function () {
  gulp.src(['images/*', '!node_modules/**'])
    .pipe(gulp.dest('dist/images'))
});
//给html外部链接添加版本号
//前提是目标文件夹有该文件，否则不添加该文件的版本号
gulp.task('assetRev', function () {
  gulp.src('dist/**/*.html')
    .pipe(assetRev())
    .pipe(gulp.dest('dist'))
});
//执行
gulp.task('default', function (db) {
  //同步进行
  runSequence(
    'clean', ['copyImages'], 'assetRev',
    db
  );
});