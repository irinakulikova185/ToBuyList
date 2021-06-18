"use strict";

const gulp = require("gulp");
const browsersync = require("browser-sync");
const sass        = require('gulp-sass');
const rename = require("gulp-rename");
const autoprefixer = require('gulp-autoprefixer');
const { parallel } = require("gulp");


const dist = "./dist/";
// const dist = "C:/OpenServer/domains/Test";



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
  return gulp.src("src/style.scss")
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(rename({suffix: '.min', prefix: ''}))
      .pipe(autoprefixer())
      .pipe(gulp.dest(dist + "/css"))
      .pipe(browsersync.stream());
} 

exports.copyHtml = copyHtml;
// exports.buildJs = buildJs;
// exports.copyAssets = copyAssets;
exports.watch = watch;
exports.styles = styles;
exports.copyJS = copyJS;
// exports.buildProdJs = buildProdJs;

// exports.build = parallel(copyHtml, copyAssets, buildJs);
exports.default = parallel(copyHtml, styles, copyJS, watch );


// function buildJs() {
//   return gulp.src("./src/js/main.js")
//                   .pipe(webpack({
//                       mode: 'development',
//                       output: {
//                           filename: 'script.js'
//                       },
//                       watch: false,
//                       devtool: "source-map",
//                       module: {
//                           rules: [
//                             {
//                               test: /\.m?js$/,
//                               exclude: /(node_modules|bower_components)/,
//                               use: {
//                                 loader: 'babel-loader',
//                                 options: {
//                                   presets: [['@babel/preset-env', {
//                                       debug: true,
//                                       corejs: 3,
//                                       useBuiltIns: "usage"
//                                   }]]
//                                 }
//                               }
//                             }
//                           ]
//                         }
//                   }))
//                   .pipe(gulp.dest(dist))
//                   .on("end", browsersync.reload);
// }

// function copyAssets() {
//   return gulp.src("./src/assets/**/*.*")
//                   .pipe(gulp.dest(dist + "/assets"))
//                   .on("end", browsersync.reload);
// }

function watch() {
  browsersync.init({
    		server: "./dist/",
    		port: 4000,
    		notify: true
        });
        
        gulp.watch("./src/index.html", gulp.parallel("copyHtml"));
        gulp.watch("./src/style.scss", gulp.parallel("styles"));
        gulp.watch("./src/script.js", gulp.parallel("copyJS"))
        // gulp.watch("./src/js/**/*.js", gulp.parallel("buildJs"));
}

// function buildProdJs() {
//   return gulp.src("./src/js/main.js")
//                   .pipe(webpack({
//                       mode: 'production',
//                       output: {
//                           filename: 'script.js'
//                       },
//                       module: {
//                           rules: [
//                             {
//                               test: /\.m?js$/,
//                               exclude: /(node_modules|bower_components)/,
//                               use: {
//                                 loader: 'babel-loader',
//                                 options: {
//                                   presets: [['@babel/preset-env', {
//                                       corejs: 3,
//                                       useBuiltIns: "usage"
//                                   }]]
//                                 }
//                               }
//                             }
//                           ]
//                         }
//                   }))
//                   .pipe(gulp.dest(dist));
// }
