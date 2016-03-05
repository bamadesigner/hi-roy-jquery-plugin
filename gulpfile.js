var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify');
var watch = require('gulp-watch');

gulp.task('sass', function() {
	gulp.src('styles.scss')
		.pipe(sass({outputStyle:'compressed'}))
		.pipe(gulp.dest(''));
});

gulp.task('compress', function() {
	gulp.src('hi-roy.js')
		.pipe(minify())
		.pipe(gulp.dest(''))
});

gulp.task('default', ['sass','compress'], function() {
	gulp.watch(['styles.scss'],['sass']);
	gulp.watch(['hi-roy.js'],['compress']);
});