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

`node build.js` を呼ぶと簡単なビルドが動いています。ビルドで `src` や `template` のフォルダーに入っているファイルを使って `build` フォルダーにウエブサイトを書き出しています。

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
Google などはサイトは自分で探して選べることは不可能ではありません。Google が間違えないように [`lang`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)のプロパティーを html タグにつけましょう。その言語うは [ISO 639](https://ja.wikipedia.org/wiki/ISO_639-1%E3%82%B3%E3%83%BC%E3%83%89%E4%B8%80%E8%A6%A7) のコードで書いてください。

## 
