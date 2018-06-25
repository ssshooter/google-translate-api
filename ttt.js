
; (async () => {
  var fs = require('fs')
  var translate = require('./index.js')
  let data = fs.readFileSync('./article.md', 'utf8')
  let array = data.split('\n')
  let isCode = false
  // let translated = array.map(async val => {
  //   // if (val.trim().startsWith('```')) {
  //   //   isCode = !isCode
  //   // }
  //   // if (isCode || !val) return val
  //   // else 
  //   let result = await translate(val, { to: 'zh-CN' })
  //   return result

  // })
  // excape start with
  let translated = []
  let translated4compare = []

  for (let i = 0; i < array.length; i++) {
    let current = array[i]
    if (current.trim().startsWith('````')) {
      translated[i] = current
      translated4compare[i] = ''
      continue
    }
    if (current.trim() === '' || current.trim() === '\r' || current.trim() === '\n') {
      translated[i] = current
      translated4compare[i] = ''
      continue
    }
    if (current.trim().startsWith('```')) {
      isCode = !isCode
    }
    if (isCode) {
      translated[i] = current
      translated4compare[i] = ''
      continue
    }
    if (current.trim().startsWith('```')) {
      translated[i] = current
      translated4compare[i] = ''
      continue
    }
    let result = await translate(current, { to: 'zh-CN' })
    translated[i] = result
    translated4compare[i] = result


  }
  console.log(translated)
  fs.writeFile('./translated.md', translated.join(''), function (err) {
    if (err) console.log('写文件操作失败');
    else console.log('写文件操作成功');
  });
  let translated2 = array.map((val, index) => {
    return val + translated4compare[index]
  })
  fs.writeFile('./translated2.md', translated2, function (err) {
    if (err) console.log('写文件操作失败');
    else console.log('写文件操作成功');
  });
  // translated[0].then(res => {
  //   console.log('wwwww', res)
  // })
  //   .catch(err => {
  //     console.error(err)
  //   })
  // Promise.all(translated)
  //   .then(res => {
  //     console.log(res)
  //   })
  //   .catch(err => {
  //     console.error(err)
  //   })

})()