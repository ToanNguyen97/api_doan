'use strict' 
const fs = require('fs')
const path = require('path')
const mailHetHanHopDong = function (data) {
  let content = fs.readFileSync(path.join(__dirname, 'app', 'lib', 'basemail', 'templateHetHanHopDong.html'))
  content = String(content)
  content = content.replace('{{hoTenKhachThue}}', `${data.khachThueID.hoKhachThue} ${data.khachThueID.tenKhachThue}`)
  return content
}

export default {
  mailHetHanHopDong
}