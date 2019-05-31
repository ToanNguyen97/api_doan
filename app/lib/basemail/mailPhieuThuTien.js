'use strict'


const fs = require('fs')
const moment = require('moment')
const path = require('path')

const formatCurrency = function (currency) {
  return currency.toLocaleString()
}

const mailPhieuThuTien = function (data) {
  let content = fs.readFileSync(path.join(__dirname, 'app', 'lib', 'basemail', 'templatePhieuThu.html'))
  content = String(content)
  content = content.replace('{{MaPT}}', data._id)
  content = content.replace('{{Thang}}', moment(data.ngayLap).format('MM/YYYY'))
  content = content.replace('{{TenPhong}}', data.phongID.tenPhong)  
  content = content.replace('{{NgayLap}}',moment(data.ngayLap).format('DD/MM/YYYY'))
  content = content.replace('{{ngayHetHan}}',moment(data.ngayHetHan).format('DD/MM/YYYY'))
  for(let item of data.dsCTPT) {
    if(item.chiSoMoi && item.chiSoMoi >0) {
      content = content.replace('{{ChiSoCu}}', item.chiSoCu)
      content = content.replace('{{ChiSoMoi}}', item.chiSoMoi)
      content = content.replace('{{SoLuong}}', (item.chiSoMoi - item.chiSoCu))
      content = content.replace('{{GiaChiSo}}', formatCurrency(item.donGia))
      content = content.replace('{{ThanhTienDV}}', formatCurrency((item.chiSoMoi - item.chiSoCu)*item.donGia))
    }
    else {
      content = content.replace('{{Gia}}', formatCurrency(item.donGia))
      content = content.replace('{{ThanhTien}}', formatCurrency(item.donGia))
    }
  }
  if(data.dsCTPT.length === 3) {
    content = content.replace('{{Gia}}', '0')
    content = content.replace('{{ThanhTien}}', '0')
  }
  let tongTien = data.dsCTPT.reduce((tongTien, x) => {
    if(x.chiSoMoi && x.chiSoMoi >0) {
      tongTien += (x.chiSoMoi - x.chiSoCu)* x.donGia
    } else {
      tongTien += x.donGia
    }
    return tongTien
  },0)
  content = content.replace('{{TongCong}}', formatCurrency(tongTien))
  return content
}

export default {
  mailPhieuThuTien
}