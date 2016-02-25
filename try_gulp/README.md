# Try gulp ハンズオン

gulp は Node.js 製のタスクランナーツールです。

Web制作の現場で発生するコンパイルや画像圧縮などの処理を、
簡単に実行したり、1つにまとめて処理したりする事が出来ます。

gulp 公式サイト 

[http://gulpjs.com/]()

## はじめに

サンプルファイルを[ダウンロード](https://github.com/kfug/handson/archive/gulp.zip)するか、git経由でcloneしてきます。

````
$ git clone https://github.com/kfug/handson -b gulp
````

ハンズオンを始める前に、

```
$ cd [ハンズオンの資料のディレクトリ]/try_gulp
```

とコマンドを使用し、```try_gulp```ディレクトリに入りましょう。

## Sassのコンパイルを試してみよう

### Sassを、ふつうに使ってみる
まずは、普通にSassを試してみましょう。


#### Sassのダウンロード

Sassをインストールしていない、使ったことのない場合は、

```
$ sudo gem install sass
```
でSassをインストールしましょう。

#### Sassのコンパイルの仕方
SassをCSSにコンパイルしてみます。

Sassファイルは```assets/scss```に入っています。SassはこのままではHTMLから読み込むことはできません。SassからCSSに変換（コンパイル）する必要があります。

CSSを吐き出すディレクトリ```public/css```をあらかじめ作っておきましょう。

```
$ sass assets/scss/common.scss:public/css/common.css
```
とコマンドを打つと、```assets/scss/common.scss```に書かれたSassファイルが変換されて```public/css/common.css```にCSSが吐き出されます。

ただ、このコマンドを毎回打つのも面倒です。そして、他のもの（Jade→HTMLや、Javascript/画像の圧縮...等）も同じようにコマンドで動きます。すべてを都度コマンドで動かすのはちょっと大変です。

### gulpを使って、Sassをコンパイルしてみる
ここで、gulpを使ってみます。

gulpはNode.js製のツールなので、npmという管理ツールのコマンドで用意していきましょう。


#### gulp用のsassコンパイラのダウンロード

```
$ npm install --save gulp-sass
```

こうすることで、```gulp-sass```というgulp用のsassコンパイラ（こういうNode.jsで使うツールのことをパッケージといいいます）がダウンロードされます。（本体は```node_modules```の中に入ります。これは触ってはいけません。）

#### gulpファイルの用意

 ``gulpfile.js``を、いつも使っているエディタで開きます。

```
var gulp = require("gulp");
var sass = require("gulp-sass");	// ← gulp-sassをsassという名前をつけて読み込み。

gulp.task("sass", function() {	// ← sassと名前をつけたタスクを作ります宣言
    gulp.src("assets/scss/*scss")	// ← このディレクトリにいる拡張子が「scss」のファイルが対象
        .pipe(sass())	// ← 読み込んだsassを使う
        .pipe(gulp.dest("public/css"));	// ← このディレクトリに吐き出す
});
```

```gulpfile.js```の中身を上記のようにしてください。
（```//``` の後ろはコメントです。なくても大丈夫です。）

さて、動くか試してみましょう。

```assets/scss/common.scss```のファイルを開いて、ファイルを書き換えてみてください。

```
$ gulp sass
```
とコマンドを打ち、先ほど```sass```と名前をつけたタスクを実行します。

```public/css/common.css```を見てみましょう。書き換えたものが反映されていれば、正しくコンパイルされています。

このように、```gulpfile.js```に設定を最初に書き込んでおくので、実行するコマンドはとても短くて済むのがよいところです。

## watchして処理を自動化

先ほど、ファイルを変更 → コマンドを打つ、の順番でコンパイルしましたが、ファイルを変えるたびにコマンドを打つのはちょっと面倒です。
ファイルが変わったのを検知して、自動でコンパイルが実行されるようにしましょう。

```sass```タスクの下に、下記を記載してください。

```
gulp.task("sass-watch", ["sass"], function(){	// ← sass-watchという名前をつけたタスクをつくります宣言。開始前にsassタスクを実行する、というオプションつきです。
	gulp.watch("assets/scss/*scss",["sass"]);	// ← のディレクトリにいる拡張子が「scss」のファイルが変更されたらsassタスクを実行。
})
```

用意ができたら、

```
$ gulp sass-watch
```

とコマンドを打って、さきほど宣言したタスクを実行してみましょう。

今度はタスクが終わらずにずっとターミナルが動きっぱなしになります。

それでは、```assets/scss/common.scss```に変更を加えてみましょう。

ターミナルが動いて、sassタスクが走ったら正解です。```public/css/common.css```に変更が反映されていると思います。

## Browser Syncの導入

今度は、ブラウザで変更を確認できるようにしましょう。

一度、```sass-watch```を止めるために```cmd + c```でターミナルを止めましょう。

今度は```browser-sync```というパッケージをダウンロードする必要があります。

```
$ npm install --save browser-sync
```

ダウンロードができたら、gulpfile.jsを編集します。

```
var gulp = require("gulp");
var sass = require("gulp-sass");
var browser = require("browser-sync");// ← browserという名前をつけてbrowser-syncを読み込み

gulp.task("sass", function() {
    gulp.src("assets/scss/*scss")
        .pipe(sass())
        .pipe(gulp.dest("public/css"))
        .pipe(browser.reload({stream:true}));	// ← browserのreloadという機能を呼び出します
});

gulp.task("server", function() {	// ← serverというタスクをつくります宣言。
    browser({	// ← browserを呼び出します
        server: {	// ← 表示に使用するサーバを立てます
            baseDir: "public"	// ← publicというディレクトリ以下を表示します
        }
    });
});

gulp.task("browser-sync",['server'], function() {	// ← sass-watchというタスクをbrowser-syncというタスクに変更し、実行する前にかならずserverタスクを実行します。
    gulp.watch("assets/scss/*scss",["sass"]);
});

```
上記のように変更することで、変更した内容がブラウザ上でも自動で確認できるようになります。

では、実行してみましょう。

```
$ gulp browser-sync
```

ブラウザが立ち上がり、``` public/index.html```が表示されたと思います。

それでは、```assets/scss/common.scss```に変更を加えてみましょう。変更されたら、ブラウザですぐに反映されているのが確認できると思います。

ここで、gulpのタスクの名前をちょっと変えてみます。

```
gulp.task("browser-sync",['server'], function() {
......
```

上記の行を、

```
gulp.task("default",['server'], function() {
......
```

と変更しましょう。```default```は予約されているタスク名で、

```
$ gulp default
```
としなくても

```
$ gulp
```
と打つだけで実行できるようになります。普段使うタスクには、この```default```という名前を使うと便利です。



## Jadeのコンパイル

## JSの圧縮

## エラーがでても止まらないように

## 画像の圧縮とかも出来ます

## 処理が重くて時間のかかるときには…