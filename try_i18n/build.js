#!/usr/bin/env node

var fs = require('fs')
var path = require('path')

var ROOT = '.'
var SOURCE = path.join(ROOT, 'src')
var BUILD = path.join(ROOT, 'build')
var TARGET = path.join(ROOT, 'build')
var TEMPLATE = path.join(ROOT, 'template')
var TEMPLATE_PATTERN = /\{\{([^}]+)\}\}/ig

// テンプレートを Cacheする変数
var _templates

// ビルドフォルダーを消す
rmrf(BUILD)

// ソースファイルをプロゼスしてターゲットフォルダーに書き出す
processFiles(SOURCE, path.join(TARGET, 'ja'), {
  title: 'クール ホームページ',
  lang: 'ja',
  otherLang: 'en',
  otherLangName: 'English',
  index: {
    title: 'Ｆｒｏｎｔｅｎｄ  Ｃｏｎｆｅｒｅｎｃｅ  ２０１６にようこぞ!',
    content: '今日は国際化を学びましょう。営業やエンタテインメントは海外とシェアしますように。私たちのスキルは関西のために大切です。'
  },
  product: {
    title: '発表ようの商品!',
    content: '何かを買わないといけません。買わないとどこからお金が入るの？'
  }
})
processFiles(SOURCE, path.join(TARGET, 'en'), {
  title: 'Cool Homepage',
  lang: 'en',
  otherLang: 'ja',
  otherLangName: '日本語',
  index: {
    title: 'Welcome to the Frontend Conference 2016!',
    content: 'Today we will study internationalization to bring commerce and entertainment from and to Osaka. Our skill is important for making Kansai better.'
  },
  product: {
    title: 'Product for the conference!',
    content: 'Because you will need to buy something, else it isn\'t gonna pay for itself.'
  }
})

function processFiles (source, target, variables) {
  _templates = {}
  find(source)
    .forEach(
      (file) => processFile(source, target, variables, file)
    )
}

function processFile (source, target, variables, fileName) {
  var sourceFile = path.join(source, fileName)
  var targetFile = path.join(target, fileName)
  var data = readAndReplaceFile(variables, sourceFile, fileName)
  mkdirp(path.dirname(targetFile))
  fs.writeFileSync(targetFile, data)
}

function readAndReplaceFile (variables, file, relative) {
  var data = fs.readFileSync(file, 'utf8')
  return data.replace(TEMPLATE_PATTERN,
    fillPlaceholder.bind(null, Object.assign({
      file: relative,
      path: relative.substr(0, relative.length - path.extname(relative).length)
    }, variables))
  )
}

function find (folder) {
  return fs
    .readdirSync(folder)
    .filter(
      // . ファイルを無視する
      (fileName) => fileName.charAt(0) !== '.'
    )
    .reduce(
      (files, fileName) => {
        var pth = path.join(folder, fileName)
        var stat = fs.statSync(pth)
        if (stat.isDirectory()) {
          files = files.concat(
            find(pth)
              .map((child) => path.join(fileName, child))
          )
        } else if (stat.isFile()) {
          files.push(fileName)
        }
        return files
      }
      , [])
}

function mkdirp (folder) {
  // フォルダーがあるように確認する
  return folder
    .split(path.sep)
    .reduce(
      (parent, current) => {
        current = path.join(parent, current)
        if (!fs.existsSync(current)) {
          fs.mkdirSync(current)
        }
        return current
      }
      , '')
}

function rmrf (folder) {
  try {
    fs
      .readdirSync(folder)
      .forEach(
        (fileName) => {
          var pth = path.join(folder, fileName)
          var stat = fs.statSync(pth)
          if (stat.isDirectory()) {
            rmrf(pth)
          } else if (stat.isFile()) {
            fs.unlinkSync(pth)
          }
        }
      )
    fs.rmdirSync(folder)
  } catch (e) {}
}

function fillPlaceholder (variables, full, name) {
  // hoge.huga のディープルックアップをやります。
  var parts = name.split('.')
  var current = variables
  while (current && parts.length > 0) {
    current = current[parts.shift()]
  }
  return current ||
    getTemplate(variables, name + '.html') // なければテンプレートフォルダー
}

function getTemplate (variables, name) {
  if (!_templates[name]) {
    _templates[name] = readAndReplaceFile(variables, path.join(TEMPLATE, name), name)
  }
  return _templates[name]
}

function readLangCSV (file, languages) {
  var result = {}
  readCSV(file).forEach((line) => {
    languages.forEach((lang) => {
      var tree = [lang].concat((line.id || '').split('.'))
      var parent = result
      for (var i = 0; i < tree.length - 1; i++) {
        var parentKey = tree[i]
        if (!parent[parentKey]) parent[parentKey] = {}

        parent = parent[parentKey]
      }
      parent[tree[tree.length - 1]] = line[lang]
    })
  })
  return result
}

function readCSV (file) {
  var csvParse

  try {
    csvParse = require('csv-parse/lib/sync')
  } catch (e) {
    throw new Error('`npm init y; npm i csv-parse` を読んでください。')
  }
  return csvParse(fs.readFileSync(path.join(ROOT, file), 'utf8'), {
    skip_empty_lines: true,
    columns: true
  })
}
