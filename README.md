# Try SCSS ハンズオン

SCSSはCSSに変数や入れ子の構文を導入するための、AltCSS言語です。

コンパイルの手間が厄介という方もいますが、gulpなどのコンパイル支援を使用すれば簡単に制作環境を構築できます。
複雑なCSSを管理しやすく整えてくれるSCSS記法に是非挑戦してみましょう!!

SCSS 公式ドキュメント 

http://sass-lang.com/guide

## SCSSの文法

### 変数の利用

### 入れ子構文

### import

### mixin

## コンパイル

単一ファイルのリアルタイムでのコンパイルは[CodePen](http://codepen.io/pen/)でも試すことが出来ます。

gulpでのコンパイルタスクの記述は`gulpfile.js`を参考にしてください。

[Wintersmith](http://wintersmith.io/)や[Hexo](https://hexo.io/)などのNode.js製の静的サイトジェネレータでもJadeのコンパイルに対応しているものも多いです。

## その他のテンプレートエンジン

Jadeの記法が特殊で取り扱いしづらいという場合には、  
同じくNode.js製のテンプレートエンジンとしてメジャーな EJS という選択肢もあります。

http://ejs.co/