# Try i18n ハンズオン
ウエブサイトは日本語をしゃべらない方または日本に住んでいない方と対応できたら
売り上げが上がるまたはリーチを増やすことはできます。

残念ながら国際化のテーマは結構広いですので、このハンズオンは翻訳だけをフォーカスしています。

## 国際化と i18n のつながり
ハンズオンを始まる間に国際化や`i18n`の言葉の説明が要ります。

> 1970年代か1980年代かにDECで作られた用法といわれる

[i18n](https://ja.wikipedia.org/wiki/%E5%9B%BD%E9%9A%9B%E5%8C%96%E3%81%A8%E5%9C%B0%E5%9F%9F%E5%8C%96#i18n) "internationalisation"と"localisation"は微妙です。軽く説明すると i18n は国際の方はコンテンツに手を入れることです。l10n は場所、通貨などを対応するコンテンツです。

英語と日本語のウエッブサイトは **i18n** と考えていいです。

[USD](https://ja.wikipedia.org/wiki/%E3%82%A2%E3%83%A1%E3%83%AA%E3%82%AB%E5%90%88%E8%A1%86%E5%9B%BD%E3%83%89%E3%83%AB)や[GBP](https://ja.wikipedia.org/wiki/%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%B0%E3%83%BB%E3%83%9D%E3%83%B3%E3%83%89)や[AUD](https://ja.wikipedia.org/wiki/%E3%82%AA%E3%83%BC%E3%82%B9%E3%83%88%E3%83%A9%E3%83%AA%E3%82%A2%E3%83%BB%E3%83%89%E3%83%AB)で買い物できるサイトは **l10n** として考えていいと思います。

残念ながら違いがぼけていますのであんまり重要じゃないと思います。

## はじめに
ハンズオンのために[Node.js](https://nodejs.org/)が必要となります。

そうしてサンプルファイルを[ダウンロード](https://github.com/kfug/handson/archive/i18n.zip)するか、git経由でcloneしてきます。

````
$ git clone https://github.com/kfug/handson
````

ハンズオンを始める前に、

```
$ cd [ハンズオンの資料のディレクトリ]/try_i18n
```

とコマンドを使用し、`try_i18n` ディレクトリに入りましょう。

### ハンズオンの使い方
`try_i18n`のフォルダーに `build.js` というファイルが入っています。`build.js`はフレームワークとライブラリーなしで動いています。ハンズオン中は `build.js` をじるのが必要となります。

`node build.js` を呼ぶと **すごく簡単** なビルドが動いています。ビルドで `src` や `template` のフォルダーに入っているファイルを使って `build` フォルダーにウエブサイトを書き出しています。

例えば: ソースフォルダーに入っている `index.html` は　`{{head}}` のプレースホルダーがあります。ビルド中には `{{head}}` が `fillPlaceHolder` の関数で `template/head.html` にリプレースされています。その上は `template/head.html` に ``{{title}}``というプレースホルダーが入っています。`build.js` の `VARIABLES` 変数に `title` というプロパティーが入っていますので　テンプレートの代わりにそれを使っています。

_メモ：全ての JavaScript コードは [standard](https://github.com/feross/standard) フォーマッティングにフォマットしています。_

## 二つ目のバーション
翻訳のコストを減らすために同じサイトストラクチャーを使って二つのサイトを書き出すがはじめてのタスクです。

そのために `build.js` のファイルを書き換えましょう。今のビルドコードの

```JavaScript
processFiles(SOURCE, TARGET, {
  title: 'Cool Homepage'
})
```

をこれにかきかえましょう

```JavaScript
processFiles(SOURCE, path.join(TARGET, 'ja'), {
  title: 'クール ホームページ'
})
processFiles(SOURCE, path.join(TARGET, 'en'), {
  title: 'Cool Homepage'
})
```

そうすると `build` フォルダーには二つのサイトがビルドの後に入っています。

## 文字化け
今のテンプレートは文字コードが付いていません。普通は PHP などが [HTTP の ContentType ヘッダー](http://www.websec-room.com/2013/03/02/359)を送ってきています。ただいま開発中はフィアルをサーバにアップしないので HTML の中に [charset](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-charset) のスペックが必要となります。

`template/header.html` に `<meta charset="utf-8">` を第１行目につけてください。

_メモ： meta の html タグの順番は大事です。Charset のタグは絶対に第一のタイトルタグにしてください。_

## 言語のコードを追加
Google などはサイトは自分で探して選べることは不可能ではありません。Google が間違えないように [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)のプロパティーを html タグにつけましょう。その言語うは [ISO 639](https://ja.wikipedia.org/wiki/ISO_639-1%E3%82%B3%E3%83%BC%E3%83%89%E4%B8%80%E8%A6%A7) のコードにしてください。

`<html>` を　`<html lang="...">`　に頑張ってください。

## alternateタグを追加
SEOのために alternate リンクをページにつけるのが優先が高いです。Google の[三つの方法](https://support.google.com/webmasters/answer/189077?hl=ja)の中では htmlタグが試すためには簡単な方法です。alternateのタグはそれぞれの逆の言語のHTMLファイルをつながらないといけません。

例： `en/index.html` は `ja/index.html` にリンクして `ja/index.html` は `en/index.html` をリンクしないといけません。

ヒント： `build.js` は `{{path}}` to `{{file}}` の変数を用意しています。

## 言語のメニュー
今のウエブサイトを公開して Google で検索したらちゃんとそれぞれのサイトを見つかるはずです。ただ、一応サイトのリンクは別の方法でもシェアできますのでその場合はユーザーが自分の言語を選ぶのが必要になります。

言語メニューは普通のメニューと同じく `<nav>` にしましょう。リンクは alternate のリンクと同じくにして。

```html
<nav>
  <a href="...">...</a>
</nav>
```

それができたら面白いことがわかりやすいです。

## 言語の名前
`en` と `ja` は技術者にはわかりやすいと思いますが普通は人間が言語の名前が好きです。

英語のサイトに(A) `English` と `Japanese` に選ぶか(B) `English` と `日本語` 選ぶ方法があります。(A) バーションは間違えています。日本語の方は `Japanese` が読めない日本人がいないかもしれません。知らない言語の名前は [ISO 639 の一覧](https://ja.wikipedia.org/wiki/ISO_639-1%E3%82%B3%E3%83%BC%E3%83%89%E4%B8%80%E8%A6%A7)に調べんた方がいいです。

だから `build.js` に `en` のリンクのために新しいプロパティー `otherLangName` は `English` と `ja` のリンクは `日本語` に追加しましょう。そうして `template/nav.html` は

```html
<a href="">{{otherLangName}}</a>`
```

は使うようにしましょう。

## 残りのコンテンツを翻訳
今まではテキストが相変わらず英語です。それを日本語にしましょう。まずは `src/index.html` と `src/product.html` のテキストを `build.js` にコピーしましょう。

```JavaScript
processFiles(SOURCE, path.join(TARGET, 'ja'), {
  title: 'クール ホームページ',
  lang: 'ja',
  otherLang: 'en',
  otherLangName: 'English',
  index: {
    title: '...',
    content: '...'
  },
  product: {
    title: '...',
    content: '...'
  }
})
```

それができてから `src/index.html` や `src/product.html` のテキストを新しいプレスホルダーに書き換えましょう。

```html
<h1>{{index.title}}</h1>
...
```

日本語のコンテンツは

| ID              | 日本語                                             |
|-----------------|---------------------------------------------------|
| index.title     | Ｆｒｏｎｔｅｎｄ  Ｃｏｎｆｅｒｅｎｃｅ  ２０１６にようこぞ! |
| index.content   | 今日は国際化を学びましょう。営業やエンタテインメントは海外とシェアしますように。私たちのスキルは関西のために大切です。|
| product.title   | 発表ようの商品!                                     |
| product.content | 何かを買わないといけません。買わないとどこからお金が入るの？ |

## 残りの Nav を翻訳
次のはすぐできると思います。コンテンツと同じくようにリンクの HTML タグを書き換えてください。

```
<a href="...">{{link.head}}</a>
```
 
| ID           | 日本語 |
|--------------|-------|
| link.home    | ホーム |
| link.product | 商品  |

## めんどくさい Google 翻訳バー
Google Chromeを使っている方は絶対にGoogleの自動翻訳システムを見たことあるでしょう。

[![https://gyazo.com/8941842cd6bf8345f8904eba25ecb4ad](https://i.gyazo.com/8941842cd6bf8345f8904eba25ecb4ad.gif)](https://gyazo.com/8941842cd6bf8345f8904eba25ecb4ad)

ただ一つの html タグを head に追加したらそれを減らされます。以下のタグを `template/head.html` に追加してください。

```html
<meta name="google" content="notranslate" />
```

[![https://gyazo.com/6a976b0fcde6cb67f40ee1fd01d2bbc7](https://i.gyazo.com/6a976b0fcde6cb67f40ee1fd01d2bbc7.gif)](https://gyazo.com/6a976b0fcde6cb67f40ee1fd01d2bbc7)

## CSS の他言語
以前にも書いてありますがたまに言語によってスタイルシートを書き換えた方がいいです。スタイルシートは大きくなったらそれぞれの言語に分けた方がいいと思いますが例のCSSは小さくて一つのシートでは問題ないです。

以前は HTML タグに `lang`のプロパティーを追加したから英語と日本語のサイトのフォントサイズが変わりました。

[![https://gyazo.com/0ad691fa108c96bd254a8c396d4da22c](https://i.gyazo.com/0ad691fa108c96bd254a8c396d4da22c.gif)](https://gyazo.com/0ad691fa108c96bd254a8c396d4da22c)

だからフォントサイズ合わせましょう。

```CSS
html {
  font-size: 14px;
  line-height: 1.5em;
}
```

そうして例のために日本版を

```CSS
html[lang=ja] {
  -ms-writing-mode: tb-rl;
  writing-mode: vertical-rl;
}
```

にすると日本版は横になっています。バンザーイ！
[![https://gyazo.com/7bfdc525f57a046a6671c0a03ac73bc9](https://i.gyazo.com/7bfdc525f57a046a6671c0a03ac73bc9.png)](https://gyazo.com/7bfdc525f57a046a6671c0a03ac73bc9)

## ルートのサイト
今までのサイトは `/en/` または `/ja` を使わないとアクセスできません。それをこれから改善しましょう。`/` サイトに特別のページを用意しましょう。まずは `build.js` に新しいステップをつけましょう。

```
processFiles(path.join(ROOT, 'global'), TARGET, {})
```

この業をつけると `global` フォルダーをルートに書き出してきます。`global` というフォルダーはまだないので作ってください。そうして `global` に `index.html` を作りましょう。

```html
<html>
  <body>
    <a href="en">English</a>
    <a href="ja">日本語</a>
  </body>
</html>
```


## 自動リダイレクト

## JSONの代わりにCSV

## Googleのテーブるシェア

## Facebook 用の OGP タグ


