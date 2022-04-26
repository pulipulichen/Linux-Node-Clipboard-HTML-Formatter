// import clipboard from 'clipboardy';

// const text = clipboard.readSync()
// console.log(text)

let filePath = process.argv[2]
//console.log(filePath)

import fs from 'fs'
import cheerio from 'cheerio'

if (!filePath || !fs.existsSync(filePath)) {
  process.exit(1)
}

let fileContent = fs.readFileSync(filePath, 'utf8')
//console.log(fileContent)
let $ = cheerio.load(fileContent)
$('[style]').removeAttr('style')
$('[rel]').removeAttr('rel')
$('[class]').removeAttr('class')
$('[title]').removeAttr('title')
$('[alt]').removeAttr('alt')

$('span').filter(function () {
  return this.innerText !== ''
}).remove()

$('*').each(function () {
  let ele = $(this)
  console.log(ele.prop('tagName'))
  if (!ele.prop('tagName')) {
    return false
  }

  if (ele.children().length === 1) {
    let child = ele.children().eq(0)

    if (ele.prop('tagName') === child.prop('tagName') && 
      ele.text() === child.text()) {
        ele.html(child.html())
    }
  }
})

while ($('body').children().length === 1) {
  $('body').html($('body').children().eq(0).html())
}

fileContent = $('body').html().trim()

//console.log(fileContent)

fs.writeFileSync(filePath, fileContent , 'utf8')