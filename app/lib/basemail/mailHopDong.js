'use strict'
const fs = require('fs')
const moment = require('moment')
const path = require('path')
const mailHopDong = function (data) {
  let content = fs.readFileSync(path.join(__dirname, 'app', 'lib', 'basemail', 'templateHopDong.html'))
  content = String(content)
  content = content.replace('{{soHD}}', `${data._id}`)
  content = content.replace('{{hoTenKhachThue}}', `${data.khachThueID.hoKhachThue} ${data.khachThueID.tenKhachThue}`)
  content = content.replace('{{hoTenKhachThue}}', `${data.khachThueID.hoKhachThue} ${data.khachThueID.tenKhachThue}`)
  content = content.replace('{{hoTenKhachThue}}', `${data.khachThueID.hoKhachThue} ${data.khachThueID.tenKhachThue}`)
  content = content.replace('{{ngaySinh}}', `${moment(data.khachThueID.ngaySinh).format('DD/MM/YYYY')}`)
  content = content.replace('{{CMND}}', `${data.khachThueID.soCMND}`)
  content = content.replace('{{diaChi}}', `${data.khachThueID.diaChi}`)
  content = content.replace('{{tenPhong}}', `${data.phongID.tenPhong}`)
  content = content.replace('{{tenKhuPhong}}', `${data.phongID.khuPhongID.tenKhuPhong}`)
  content = content.replace('{{loaiPhong}}', `${data.phongID.loaiPhongID.tenLoaiPhong}`)
  content = content.replace('{{giaPhong}}', `${data.phongID.giaPhong.toLocaleString()}`)
  content = content.replace('{{ngayThue}}', `${moment(data.ngayLap).format('DD/MM/YYYY')} `)
  content = content.replace('{{ngayTra}}', `${moment(data.ngayKetThuc).format('DD/MM/YYYY')}`)
  content = content.replace('{{ngayKy}}', `${moment(Date.now()).format(`DD/MM/YYYY`)}`)
  content = content.replace('{{maKhachThue}}', `${data.khachThueID._id}`)
 
return content
}
export default {
  mailHopDong
}