const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const minify = require("gulp-minify");
const rename = require("gulp-rename");

gulp.task("css", function(done) {
  gulp
    .src("hi-roy.css")
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(cleanCSS())
    .pipe(
      rename({
        suffix: ".min"
      })
    )
    .pipe(gulp.dest("./"))
    .on("end", done);
});

gulp.task("js", function(done) {
  gulp
    .src("hi-roy.js")
    .pipe(
      minify({
        mangle: false,
        ext: {
          min: ".min.js"
        }
      })
    )
    .pipe(gulp.dest("./"))
    .on("end", done);
});

gulp.task("default", gulp.series("css", "js"));

gulp.task(
  "watch",
  gulp.series("default", function(done) {
    gulp.watch(["hi-roy.css"], gulp.series("css"));
    gulp.watch(["hi-roy.js"], gulp.series("js"));
    return done();
  })
);
