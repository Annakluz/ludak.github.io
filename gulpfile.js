const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const ghPages = require("gulp-gh-pages");

const paths = {
    js: "./src/assets/js/*.js",
    scss: "./src/assets/scss/*.scss",
    html: "src/*.html",
}


gulp.task("prepareHtml", () => {
    gulp.src(paths.html)
        .pipe(gulp.dest("dist/"))
});

gulp.task("prepareCss", () => {
    gulp.src(paths.scss)
        .pipe(sass({
                outputStyle: "compressed"
            })
            .on('error', sass.logError))
        .pipe(gulp.dest("dist/assets/css"))
});

gulp.task("prepareJs", () => {
    gulp.src(paths.js)
        .pipe(uglify())
        .pipe(gulp.dest("dist/assets/js"))
});

gulp.task("serve", ()=>{
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch(paths.js, ["js-w"]);
    gulp.watch(paths.scss, ["sass-w"]);
    gulp.watch(paths.html, ["html-w"]);
    
});


gulp.task("js-w", ["prepareJs"], ()=>{
    browserSync.reload();
});

gulp.task("sass-w", ["prepareCss"], ()=>{
    browserSync.reload();
});

gulp.task("html-w", ["prepareHtml"], ()=>{
    browserSync.reload();
})