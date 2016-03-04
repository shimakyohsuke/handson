# Try i18n ハンズオン
日本語を読めない方または日本に住んでいない方と対応ができたとしたら、ウェブサイトで
売り上げを上げたり、リーチを広げることができます。

国際化のテーマは広いので、このハンズオンは翻訳だけにフォーカスをします。

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

ハンズオンの間は一つ一つのステップの後に幾つか `node build.js` を読んでください。`build` の中ファイルはそのままにブラウザーに見てください。チェンジがすぐ見たい場合は `slr` 見たいなウエッブサーバを使ってもいいと思います。(インストールは `npm i slr -g`、動かすは `slr build`)

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

`template/header.html` に `<meta charset="utf-8" />` を第１行目につけてください。

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
  <head>
    <meta charset="utf8" />
    <link rel="stylesheet" href="en/css/style.css" />
  </head>
  <body>
    <a href="en/index.html">English</a>
    <a href="ja/index.html">日本語</a>
  </body>
</html>
```

## ルートへのバックリンク
ルートサイトがあるんですが SEO のために `en` と `ja` のサイトにルートへのリンクをつけましょう（詳しくは [Googleのサイト](https://support.google.com/webmasters/answer/189077?hl=ja)に)。バックリンクは `x-default` の link ヘッダータグです。

```html
<link rel="alternate" href="../" hreflang="x-default" />
```

そのリンクは `template/head.html` につけましょう。

## 自動リダイレクト
基本的に [http の Accept-Language](https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation#The_Accept-Language_header) のヘッダーはリダイレクトのために使えますがユーザーはそれをあんまり喜んでいません。MDN にも書いてあります。

> Site-designers must not be over-zealous by using language detection via this header as it can lead to a poor user experience:
> - They should always provide a way to overcome the server-chosen language, e.g., by providing small links near the top of the page. Most user-agents provide a default value for the Accept-Language: header, adapted to the user interface language and end users often do not modify it, either by not knowing how, or by not being able to do it, as in an Internet café for instance.
> - Once a user has overridden the server-chosen language, a site should no longer use language detection and should stick with the explicitly-chosen language.. In other words, only entry pages of a site should select the proper language using this header.

日本語に翻訳:

> ユーザーエキスペリエンスがが悪くならないようにサイトデザイナは自動言語検出を使いすぎない方がいいです：
> - どの時でもサーバが選んだ言語を返す方法を用意した方がいいです。例えば：ページの上の方に言語リンクの一覧をつける。普段はユーザーが Accept-Language ヘッダーのディフォルト設定を使っています。理由はその設定があるのを知らないか設定の返事許可がないかからです。
> - 一応ユーザーがサーバの選んだを変えたら自動システムをやめた方がいいです。別の説明にするとリダイレクトはエントリーページだけに使った方がいいです。

その通りに以下のスクリプトが用意してあります。


```JavaScript
autoDetect()

function autoDetect () {
  if (!localStorage) {
    return // 保存できない場合はリダイレクトしない
  }

  if (localStorage.getItem('firstRedirect')) {
    return // 以前リダイレクトしたから今回はリダイレクトしない
  }

  // 今回のリダイレクトを保存する
  localStorage.setItem('firstRedirect', true)

  // ブラウザーの言語
  var lang = getBrowserLanguage()

  // 言語を
  lang = lang.toLowerCase()
  lang = (lang === 'ja' || lang == 'ja_jp') ? 'ja' : 'en'

  document.location.assign(lang + '/index.html')
}

// クロスブラウザーの言語調べるスクリプト
function getBrowserLanguage () {
  var nav = navigator
  return (nav.languages && nav.languages[0])
    || nav.userLanguage
    || nav.language
    || 'en-US' 
}
```

そのスクリプトを `global/index.html` に追加してください。

```html
<script type="text/javascript">
  ...
</script>
```

## JSON の代わりに CSV
今までは `build.js` のデータはただの JavaScript オブジェクトです翻訳者にそれを渡すのが難しです。CSV データに書き換えるとこれからのプロゼスが簡単になります。

CSV を Node で使うために [`csv-parse`](https://www.npmjs.com/package/csv-parse) パッケージを `try_i18n` のフォルダーにインストールしないといけません。

```
$ npm init -y; npm i csv-parse
```

そうしてデータを `lang.csv` に書き換えましょう。

```csv
id,en,ja
title,"Cool Homepage","クール ホームページ"
lang,en,ja
otherLang,ja,en
otherLangName,日本語,English
index.title,"Welcome to the Frontend Conference 2016!","Ｆｒｏｎｔｅｎｄ  Ｃｏｎｆｅｒｅｎｃｅ  ２０１６にようこぞ!"
index.content,"Today we will study internationalization to bring commerce and entertainment from and to Osaka. Our skill is important for making Kansai better.","今日は国際化を学びましょう。営業やエンタテインメントは海外とシェアしますように。私たちのスキルは関西のために大切です。"
product.title,"Product for the conference!","発表ようの商品!"
product.content,"Because you will need to buy something, else it isn't gonna pay for itself.","何かを買わないといけません。買わないとどこからお金が入るの？"
link.home,"Home","ホーム"
link.product,"Product","商品"
```

`build.js` のCSV用の変数 `readLangCSV` は用意してあります。

```JavaScript
var ALL_VARIABLES = readLangCSV('lang.csv', ['en', 'ja'])
```

結果このようなオブジェクトになります。

```JavaScript
{ en:
   { title: 'Cool Homepage',
     ... } },
  ja:
   { title: 'クール ホームページ',
     ... } }
```

そうして `ALL_VARIABLES` の変数を `processFiles` に書き換えてください。

```JavaScript
processFiles(SOURCE, path.join(TARGET, 'en'), ALL_VARIABLES.en)
processFiles(SOURCE, path.join(TARGET, 'ja'), ALL_VARIABLES.ja)
```

## CSV を Google で管理する
CSV ファイルを GIT またはメールで管理するのワークフローは翻訳者には不便なことがあります。
[Google Spreadsheets](https://docs.google.com/spreadsheets/)を使うと幾つかのいいことがあります。`lang.csv` のデータを新しいシートにインポートして下さい。

[![https://gyazo.com/62f95eadf9a5b79022b4bf29f91400cd](https://i.gyazo.com/62f95eadf9a5b79022b4bf29f91400cd.gif)](https://gyazo.com/62f95eadf9a5b79022b4bf29f91400cd)
[![https://gyazo.com/a6a1dfc733c19bf54444791521335b4d](https://i.gyazo.com/a6a1dfc733c19bf54444791521335b4d.gif)](https://gyazo.com/a6a1dfc733c19bf54444791521335b4d)

スプレッドシートを作った時に翻訳者とシェアする。

[![https://gyazo.com/25306952e76253617e679f13c357ea16](https://i.gyazo.com/25306952e76253617e679f13c357ea16.gif)](https://gyazo.com/25306952e76253617e679f13c357ea16)

そうしてノティフィケーション設定をつけましょう。

[![https://gyazo.com/b6d1ac27c49920e3497ca7dc7a2c2653](https://i.gyazo.com/b6d1ac27c49920e3497ca7dc7a2c2653.gif)](https://gyazo.com/b6d1ac27c49920e3497ca7dc7a2c2653)

そうすると翻訳者または別のチームメンバーはなんかのチェンジですぐメールでノティフィケーションが入ります。変わった時にすぐに CSV エキスパートしたらすぐサイトをアップデートできます。

[![https://gyazo.com/12029c546e04d7525452a828ace036e8](https://i.gyazo.com/12029c546e04d7525452a828ace036e8.gif)](https://gyazo.com/12029c546e04d7525452a828ace036e8)

## Facebook 用の OG タグ
Google だけではなくて Facebook も国際化のルールがあります。まずは FB は全ての ISO 639 の
言語を[対応していません](https://developers.facebook.com/docs/internationalization#locales)。[言語の XML](http://www.facebook.com/translations/FacebookLocales.xml)をチェックすると `en` の代わりに `en_US` とかを使わないといけません。 `ja` は `ja_JP` になります。

すれがわかっているから `og:language` のタグをつけましょう。`lang.csv`　に `fbLang` をつけるのを忘れないでください。

```html
<meta property="og:locale" content="{{fbLang}}" />
```

_残念ながら Facebook の言語サッポートはサーバソフトなしでは対応できません。実は別の[言語を対応したいばい](https://developers.facebook.com/docs/internationalization#locales) は `?fb_locale=ja_JP` または `?fb_locale=en_US` のリクエストでそれぞれのバーションを出さないといけません。今のときはURLパッターンを `http://site.com/product.html?fb_locale=en_US` にするのが役に立つと思います。_

## Facebook の Like ボタン
[`og`](http://ogp.me/)タグがサイトについてからはサイトもシェアしたいですよね。そのまま [Facebook のシェアスクリプト](https://developers.facebook.com/docs/plugins/like-button)を使って Like ボタンをつけたら `en_GB` のUIがでってきます。

```html
<div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="standard" data-action="like" data-show-faces="true" data-share="true"></div>
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.5&appId=<app_id>";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>
```

ちゃんと言語が出るように頑張りたかったらスクリプト `en_GB` の部分の代わりに以前に用意した `{{fbLang}}` を使って `template/footer.html` に追加してください。

_メモ：`build`フォルダーの中のファイルをそのままにブラウザーで開いたら Facebook のボタんが出てきません。ウエブスペースにあげたら動くようになります。ローカルでサイトをテストしたい場合はパソこんにサーバを立ち上げてください。私は開発するためによく [`slr`]()を使います。_

## 最後の言葉
**お疲れ様です！** この小さなサイトで一応翻訳ワークフローができましたと思います。それ以上は色々の細工がありますがこのワークフローを使うと一応自分のウエブサイトを翻訳できると思います。

### 翻訳サービスについて
「はい！サイトを翻訳したい！」と思うようになったらたぶん次の質問は「翻訳者どこで見つける？」となります。基本的に最近みつのオプションがあります。自分で翻訳するより専門者を使った方がと思います。

- **オンライン翻訳サービス**:一般的に最近から翻訳用の[クラウドソーシングサービス](https://ja.wikipedia.org/wiki/%E3%82%AF%E3%83%A9%E3%82%A6%E3%83%89%E3%82%BD%E3%83%BC%E3%82%B7%E3%83%B3%E3%82%B0)があります。[gengo](https://gengo.com/ja/)はその中一番人気なサービスです。
- **サイト翻訳サービス**: 
ウエブサイトだけを翻訳するためのサービスも幾つかがあります。[localizejs](https://localizejs.com/ja/)は最近きになっています。
- **翻訳オフィス**:
テキスト翻訳のために以前のサービスが足りるかもしれません。ただ翻訳のはコンテンツだけではなく意味の翻訳のが大事だと思います。安心できるように本人を少なくともチェックするためにいると役に立っています。特に専門テキスト(契約など）は普通サービスが対応しなくてオフィスが必要になります。それぞれの言語のネーティブスピーカーがいいと思います。私は [Inscribe Language Consulting](http://www.inscribe-consulting.jp/) を使います。

### ツールリスト
今回使ったツールは全て軽くてあんまりフィーチャーがありません。もっといいサイトをもっとや吐く国際化に頑張ると思ったら以下のリンクリストを見に行ってくだっさい。

- 時間: [Moment.js](http://momentjs.com/docs/#/i18n/)
- JS一般的: [i18n.next](http://i18next.com/), [Localeplanet](http://www.localeplanet.com/api/index.html) 
- Grunt: [grunt-static-i18n](https://www.npmjs.com/package/grunt-static-i18n), [grunt-i18n](https://www.npmjs.com/package/grunt-i18n), [grunt-i18n-gspreadsheet](https://www.npmjs.com/package/grunt-i18n-gspreadsheet), [...](https://www.npmjs.com/search?q=grunt+i18n)
- Gulp: [gulp-i18n](https://www.npmjs.com/package/gulp-i18n), [gulp-i18n-gspreadsheet](https://www.npmjs.com/package/gulp-i18n-gspreadsheet), [gulp-i18n-localize](https://www.npmjs.com/package/gulp-i18n-localize), [...](https://www.npmjs.com/search?q=gulp+i18n)
- 翻訳 API: [gengo](https://gengo.com/ja/developers/), [localizejs](https://help.localizejs.com/docs/installation)
- 国の旗: [flag-icon-css](http://lipis.github.io/flag-icon-css/), [FAMFAMFAM Flag Icons](http://tkrotoff.github.io/famfamfam_flags/), [243 country icons](http://365icon.com/icon-styles/ethnic/classic2/)
