const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gulp = require('gulp');
const mergeMediaQueries = require('gulp-merge-media-queries');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

gulp.task('sass', function() {
	gulp.src('hi-roy.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(mergeMediaQueries())
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cleanCSS({
			compatibility: 'ie8'
		}))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(''))
});

gulp.task('compress', function() {
	gulp.src('hi-roy.js')
		.pipe(minify({
			mangle: false,
			ext:{
				min:'.min.js'
			}
		}))
		.pipe(gulp.dest(''))
});

gulp.task('watch',function() {
	gulp.watch(['hi-roy.scss'],['sass']);
	gulp.watch(['hi-roy.js'],['compress']);
});

gulp.task('default', ['sass','compress']);
