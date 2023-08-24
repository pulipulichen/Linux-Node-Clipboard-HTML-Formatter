// import clipboard from 'clipboardy';

// const text = clipboard.readSync()
// console.log(text)

let filePath = process.argv[2]
let outputFilePath = process.argv[3]
//console.log(filePath)

import fs from 'fs'
import cheerio from 'cheerio'

if (!filePath || !fs.existsSync(filePath)) {
  process.exit(1)
}

let fileContent = fs.readFileSync(filePath, 'utf8')
//console.log(fileContent)
// fileContent = fileContent.replace(/\b(?!>)\b\n\b(?!<)/g, ' ')
let lines = fileContent.split('\n')
let output = ''
for (let i = 0; i < lines.length; i++) {
  let line = lines[i]
  if (i === 0) {
    output = lines[i]
    continue
  }

  if (output.endsWith('>') && line.startsWith('<') ) {
    output = output + '\n' + line
  }
  else {
    output = output + ' ' + line
  }
}
fileContent = output

let newLineList = ['><div', '><br', '><p', '><h', '><ul', '><li', '><ol']
newLineList.forEach(search => {
  fileContent = fileContent.split(search).join(search[0] + '\n' + search.slice(1))
})

let $ = cheerio.load(fileContent)

fileContent = $('body').text().trim()


fs.writeFileSync(outputFilePath, fileContent , 'utf8')