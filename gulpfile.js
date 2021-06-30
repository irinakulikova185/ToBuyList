"use strict";

const gulp = require("gulp");
const browsersync = require("browser-sync");
const sass        = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const { parallel } = require("gulp");


const dist = "./dist/";

function copyHtml() {
  return gulp.src("./src/index.html")
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
}
function copyJS() {
  return gulp.src("./src/script.js")
                .pipe(gulp.dest(dist))
                .on("end", browsersync.reload);
}

function styles() {
  return gulp.src("src/scss/style.scss")
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename({suffix: '.min', prefix: ''}))
      .pipe(autoprefixer())
      .pipe(gulp.dest(dist + "/css"))
      .pipe(browsersync.stream());
} 

function watch() {
  browsersync.init({
    		server: "./dist/",
    		port: 4000,
    		notify: true
        });
        
        gulp.watch("./src/index.html", gulp.parallel("copyHtml"));
        gulp.watch("./src/scss/*.scss", gulp.parallel("styles"));
        gulp.watch("./src/script.js", gulp.parallel("copyJS"));
     
}


exports.copyHtml = copyHtml;
exports.watch = watch;
exports.styles = styles;
exports.copyJS = copyJS;
exports.default = parallel(copyHtml, styles, copyJS, watch );


