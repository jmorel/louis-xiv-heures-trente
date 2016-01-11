var gulp = require('gulp');
var http = require('http');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');

var autoprefixer = require('gulp-autoprefixer');

gulp.task('default', function() {
    console.log('Available actions:');
    console.log('* build');
    console.log('* watch');
});

gulp.task('watch', function() {
    gulp.watch('src/*', ['build']);
});

gulp.task('build', function() {
    gulp.src('src/style.css')
        .pipe(autoprefixer())
        .pipe(cssnano())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('build'));
    gulp.src('src/app.js')
        .pipe(gulp.dest('build'));
});
