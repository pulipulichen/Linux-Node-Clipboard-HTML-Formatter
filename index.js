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
$('[lang]').removeAttr('lang')
$('[dir]').removeAttr('dir')
$('[aria-level]').removeAttr('aria-level')
$('[role]').removeAttr('role')

$('span').filter(function () {
  //console.log(this.innerText, $(this).text(), $(this).html())
  //return (this.innerText === '' || !this.innerText)

  return ($(this).text() === '')
}).remove()
$('*').each(function () {
  let ele = $(this)
  
  if (!ele.prop('tagName')) {
    return false
  }

  if (ele.children().length === 1) {
    let child = ele.children().eq(0)

    console.log(ele.prop('tagName'))
    console.log((ele.text() === child.text()), ele.text(), child.text())
    
    if (ele.text() === child.text()) {
        ele.html(child.html())
    }
  }
})

let allowTagNames = [
  'ul',
  'ol'
]
while ($('body').children().length === 1) {
  let child = $('body').children().eq(0)
  let tagName = child.prop('tagName')
  if (tagName) {
    tagName = tagName.toLowerCase()
  }
  if (!tagName || allowTagNames.indexOf(tagName) > -1) {
    break
  }
  $('body').html($('body').children().eq(0).html())
}
fileContent = '<span>' + $('body').html().trim() + '</span>'

//console.log(fileContent)

fs.writeFileSync(filePath, fileContent , 'utf8')