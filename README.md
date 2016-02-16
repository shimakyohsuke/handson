# Try Jade ハンズオン

## Jade とは

- Jade は Node.js 製のテンプレートエンジンです。
- [Haml](http://haml.info/) などに見られるような、インデントで要素の階層を表す構文で初めての人にはとっつきにくい面もアリますが、多様な機能など、静的サイト制作を強力に支援する機能があります。

Jade 公式サイト  
<http://jade-lang.com/>

## HTML がこんな風に書けます。

基本的な HTML の生成

```
doctype html
html(lang='en')
  head
    title Jade
    script.
      foo = true;
      bar = function () {};
      if (foo) {
        bar(1 + 5)
      }
  body
    h1 Jade - node template engine
    #container.col
      p You are amazing
      p
        | Jade is a terse and simple
        | templating language with a
        | strong focus on performance
        | and powerful features.
```

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Jade</title>
    <script>
      foo = true;
      bar = function () {};
      if (foo) {
          bar(1 + 5)
      }
    </script>
  </head>
  <body>
    <h1>Jade - node template engine
    </h1>
    <div id="container" class="col">
      <p>You are amazing
      </p>
      <p>
        Jade is a terse and simple
        templating language with a
        strong focus on performance
        and powerful features.
      </p>
    </div>
  </body>
</html>
```

## やってみよう

このリポジトリをクローン（もしくは ZIP ファイルを DL）

```
$ git clone hogehoge && cd $_
```

パッケージのインストール

```
$ npm install
```

```
$ cd jade/
```

```
$ touch index.jade
```

テキストエディターで、index.jade を編集

```
//- index.jade
doctype html
html(lang='en')
  head
    title Try Jade
  body
    h1 Hello Jade !!
```

Jade ファイルを HTML ファイルにコンパイル

**Gulp の使い方はこの後◯時からハンズオンがあります。**

```
$ gulp jade
```

もしくは、

```
$ npm run jade
```

`./public/` ディレクトリに HTML ファイルがありますか？？

----

もしつまずいたら Jade のコードをオンラインで変換できる、  
オンラインの Jade Converter が便利です。

<http://html2jade.org/>

<http://html2jade.vida.io/>

<http://html2jade.herokuapp.com/>


## 強力な機能

### 外部ファイルの取り込み

<http://jade-lang.com/reference/includes/>

```
//- index.jade
doctype html
html
  //- ここで head.jade を呼び出し
  include ./includes/head.jade
  body
    h1 My Site
    p Welcome to my super lame site.
    //- ここで foot.jade を呼び出し
    include ./includes/foot.jade
```

```
//- includes/head.jade
head
  title My Site
  script(src='/javascripts/jquery.js')
  script(src='/javascripts/app.js')
```

```
//- includes/foot.jade
#footer
  p Copyright (c) foobar
```

コンパイル後の HTML

```
<!doctype html>
<html>
  <head>
    <title>My Site</title>
    <script src='/javascripts/jquery.js'></script>
    <script src='/javascripts/app.js'></script>
  </head>
  <body>
    <h1>My Site</h1>
    <p>Welcome to my super lame site.</p>
    <div id="footer">
      <p>Copyright (c) foobar</p>
    </div>
  </body>
</html>
```

### テンプレートの継承

<http://jade-lang.com/reference/extends/>

```
//- layout.jade
doctype html
html
  head
    //- block と書いておくと要素を挿入できる
    block title
      //- 上書き用の title が設定されていなければこちらが表示されます。
      title Default title
  body
    //- block と書いておくと要素を挿入できる
    block content
```

```
//- index.jade
extends ./layout.jade

//- layout.jade の title を上書きしてます。
block title
  title Article Title

//- layout.jade の body に追加
block content
  h1 My Article
```

コンパイル後の HTML

```
<!doctype html>
<html>
  <head>
    <!-- 上書きされたタイトルが出力される。 -->
    <title>Article Title</title>
  </head>
  <body>
    <h1>My Article</h1>
  </body>
</html>
```

## コンパイル

gulp でのコンパイルタスクの記述は `gulpfile.js` を参考にしてください。

**Gulp の使い方はこの後◯時からハンズオンがあります。**

## Jade を使って簡単な静的サイトなブログが作れる

[Wintersmith](http://wintersmith.io/) や [Hexo](https://hexo.io/) などの Node.js 製の静的サイトジェネレータでも Jade のコンパイルに対応しているものも多いです。

## その他のテンプレートエンジン

Jade の記法が特殊で取り扱いしづらいという場合には、同じく Node.js 製のテンプレートエンジンとしてメジャーな EJS という選択肢もあります。

EJS  
<http://ejs.co/>

----

**Let's Try Jade**
