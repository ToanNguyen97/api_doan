'use strict'
const fs = require('fs')
const path = require('path')
const mailLienHe = function (data) {
  let content = fs.readFileSync(path.join(__dirname, 'app', 'lib', 'basemail', 'teamplateLienHe.html'))
  content = String(content)
  content = content.replace('{{matenPhong}}', `${data.phongID.tenPhong}`)
  content = content.replace('{{maPhong}}', `${data.phongID._id}`)
return content
}
export default {
  mailLienHe
}