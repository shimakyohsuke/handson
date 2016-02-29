var gulp = require("gulp");
var sass = require("gulp-sass");
var browser = require("browser-sync");
var jade = require('gulp-jade');
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var pngquant = require("imagemin-pngquant");
var changed  = require('gulp-changed');

gulp.task("sass", function() {
    gulp.src("./assets/scss/*scss")
        .pipe(sass())
        .pipe(gulp.dest("./public/css"))
        .pipe(browser.reload({stream:true}));
});

gulp.task('jade', function () {
    gulp.src('./assets/tmpl/*jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('./public'))
        .pipe(browser.reload({stream:true}));
});

gulp.task("js", function() {
    gulp.src("./assets/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./public/js"))
        .pipe(browser.reload({stream:true}));
});


gulp.task("image", function() {
    gulp.src("./assets/images/*.{png,jpg,gif}")
        .pipe(changed("./public/images"))
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest("./public/images"))
        .pipe(browser.reload({stream:true}));
});



gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./public"
        }
    });
});

gulp.task("default",['server'], function() {
    gulp.watch("assets/scss/*scss",["sass"]);
    gulp.watch("assets/tmpl/*jade",["jade"]);
    gulp.watch("assets/js/*js",["js"]);
    gulp.watch("assets/images/*.{png,jpg,gif}",["image"]);
});
