// Package dependencies
var gulp = require("gulp"),
    cleanCSS = require("gulp-clean-css"),
    concat = require("gulp-concat"),
    autoprefixer = require("gulp-autoprefixer"),
    plumber = require("gulp-plumber"),
    rename = require("gulp-rename"),
    sass = require("gulp-sass")(require("sass"), { allowEmpty: true }), // Specify "sass" as the compiler with allowEmpty option
    sequence = require("gulp-sequence"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require("gulp-uglify"),
    watch = require("gulp-watch");

// Configuration file to keep your code DRY
var cfg = require("./gulpconfig.json"),
    paths = cfg.paths,
    browserlist = cfg.browserlist;

// Run:
// gulp sassTask
// Compiles SCSS files into CSS
function sassTask() {
    return gulp
        .src(paths.sass + "/*.scss")
        .pipe(
            plumber({
                errorHandler: function (err) {
                    console.log(err);
                    this.emit("end");
                },
            })
        )
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass({ errLogToConsole: true }))
        .pipe(autoprefixer(browserlist.autoprefixer))
        .pipe(sourcemaps.write(undefined, { sourceRoot: null }))
        .pipe(gulp.dest(paths.css));
}

// Run:
// gulp minifycss
// Minifies compiled CSS
function minifyCSS() {
    return gulp
        .src(paths.css + "/site.css")
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(cleanCSS({ compatibility: "*" }))
        .pipe(
            plumber({
                errorHandler: function (err) {
                    console.log(err);
                    this.emit("end");
                },
            })
        )
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(paths.css));
}

// Run:
// gulp minifyeditorCSS
// Minifies compiled CSS
function minifyEditorCSS() {
    return gulp
        .src(paths.css + "/site-editor.css", { allowEmpty: true })
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(cleanCSS({ compatibility: "*" }))
        .pipe(
            plumber({
                errorHandler: function (err) {
                    console.log(err);
                    this.emit("end");
                },
            })
        )
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest(paths.css));
}

// Run:
// gulp scripts
// Uglifies and concatenates all JS files into one
function scripts() {
    return gulp
        .src([paths.js + "/scripts.js"], { allowEmpty: true })
        .pipe(concat("scripts.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js));
}

// Run:
// gulp watch
// Starts watcher. Watcher runs gulp sass task and scripts task in parallel on changes
function watchFiles() {
    gulp.watch(paths.sass + "/**/*.scss", gulp.series(sassTask, minifyCSS, minifyEditorCSS));
    gulp.watch([paths.js + "/**/*.js"], scripts);
}
exports.watch = watchFiles;

// Run:
// gulp
// Starts watcher (default task)
//exports.default = gulp.series(gulp.parallel(sassTask, minifyCSS, minifyEditorCSS), gulp.parallel(scripts, watchFiles));

// Register your functions as Gulp tasks
gulp.task("sassTask", sassTask);
gulp.task("minifyCSS", minifyCSS);
gulp.task("minifyEditorCSS", minifyEditorCSS);
gulp.task("scripts", scripts);
gulp.task("watchFiles", watchFiles);

// Define a default task that runs the desired functions in series or parallel
gulp.task("default", gulp.series(gulp.parallel(sassTask, minifyCSS, minifyEditorCSS), gulp.parallel(scripts, watchFiles)));
