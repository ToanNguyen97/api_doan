'use strict'
const fs = require('fs')
const path = require('path')
const mailBooking = function (data) {
  let content = fs.readFileSync(path.join(__dirname, 'app', 'lib', 'basemail', 'templateBooking.html'))
  content = String(content)
  content = content.replace('{{hoTenKhachThue}}', `${data.hoNguoiBook} ${data.tenNguoiBook}`)
  content = content.replace('{{maBooking}}', `${data._id}`)
  content = content.replace('{{maBooking}}', `${data._id}`)
return content
}
export default {
  mailBooking
}