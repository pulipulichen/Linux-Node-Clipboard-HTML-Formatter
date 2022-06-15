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

fileContent = $('body').text().trim()


fs.writeFileSync(filePath, fileContent , 'utf8')