# Try Jade ハンズオン

Jade は Node.js 製のテンプレートエンジンです。

Haml などに見られるような、インデントで要素の階層を表す構文で初めての人にはとっつきにくい面もアリますが、
多様な機能など、静的サイト制作を強力に支援する機能があります。

Jade 公式サイト

http://jade-lang.com/

HTML から Jade の記法を得るには、オンラインの Jade Converterが便利です。

http://html2jade.org/

## HTML の作成

基本的な HTML の生成

````
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
````

## 外部ファイルの取り込み

## テンプレートの継承

## コンパイル

gulp でのコンパイルタスクの記述は `gulpfile.js` を参考にしてください。

[Wintersmith](http://wintersmith.io/)や[Hexo](https://hexo.io/)などの Node.js 製の静的サイトジェネレータでも Jade のコンパイルに対応しているものも多いです。

## その他のテンプレートエンジン

Jade の記法が特殊で取り扱いしづらいという場合には、  
同じく Node.js 製のテンプレートエンジンとしてメジャーな EJS という選択肢もあります。

http://ejs.co/
