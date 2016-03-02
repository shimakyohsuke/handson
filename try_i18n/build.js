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
processFiles(SOURCE, TARGET, {
  title: 'Cool Homepage'
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
  var data = readAndReplaceFile(variables, sourceFile)
  mkdirp(path.dirname(targetFile))
  fs.writeFileSync(targetFile, data)
}

function readAndReplaceFile (variables, file) {
  var data = fs.readFileSync(file, 'utf8')
  return data.replace(TEMPLATE_PATTERN, fillPlaceholder.bind(null, variables))
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
    _templates[name] = readAndReplaceFile(variables, path.join(TEMPLATE, name))
  }
  return _templates[name]
}
