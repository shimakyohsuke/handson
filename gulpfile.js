var gulp = require("gulp");
var sass = require("gulp-sass");
var browser = require("browser-sync");// ← browserという名前をつけてbrowser-syncを読み込み

gulp.task("sass", function() {
    gulp.src("assets/scss/*scss")
        .pipe(sass())
        .pipe(gulp.dest("public/css"))
        .pipe(browser.reload({stream:true}));
});

gulp.task("server", function() {	// ← serverというタスクをつくります宣言。
    browser({
        server: {	// ← 表示に使用するサーバを立てます
            baseDir: "public"	// ← publicというディレクトリ以下を表示します
        }
    });
});

gulp.task("browser-sync",['server'], function() {	// ← sass-watchというタスクをbrowser-syncというタスクに変更し、実行する前にかならずserverタスクを実行します。
    gulp.watch("assets/scss/*scss",["sass"]);
});
