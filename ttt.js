var fs = require('fs')
var translate = require('./index.js')
fs.readFile('./article.md', 'utf8', function(err, data) {
  let array = data.split('\n')
  let quoteFlag = false
  let translated = array.map(val => {
    if (val.trim().startsWith('```')) {
      quoteFlag = !quoteFlag
    }
    if (quoteFlag || !val) return val
    else return translate(val, { to: 'zh-CN' })
  })
  console.log(translated)
  Promise.all(translated)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.error(err)
    })
})
