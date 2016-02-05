# Try Jade ハンズオン

Jade は Node.js 製のテンプレートエンジンです。

Hamlなどに見られるような、インデントで要素の階層を表す構文で初めての人にはとっつきにくい面もアリますが、
多様な機能など、静的サイト制作を強力に支援する機能があります。

Jade 公式サイト 

http://jade-lang.com/

HTMLからjadeの記法を得るには、オンラインのJade Converterが便利です。

http://html2jade.org/

## HTMLの作成

基本的なHTMLの生成

````
doctype html
html(lang='en')
  head
    title Jade
    script(type='text/javascript').
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

gulpでのコンパイルタスクの記述は`gulpfile.js`を参考にしてください。

[Wintersmith](http://wintersmith.io/)や[Hexo](https://hexo.io/)などのNode.js製の静的サイトジェネレータでもJadeのコンパイルに対応しているものも多いです。

## その他のテンプレートエンジン

Jadeの記法が特殊で取り扱いしづらいという場合には、  
同じくNode.js製のテンプレートエンジンとしてメジャーな EJS という選択肢もあります。

http://ejs.co/