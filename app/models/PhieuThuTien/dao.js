
'use strict'
module.exports = function (schema, options) {
  schema.statics.thongKePT = async function(payload) {
    let Model = this
    let ngayBD = payload.ngayThongKe[0]
    let ngayKT = payload.ngayThongKe[1]
    if(payload.tieuChi === 'ptLap') {
      return await Model.find({
        ngayLap: {$gt: ngayBD, $lt: ngayKT}
      }).populate(['dsCTPT',{path:'phongID', populate:['khuPhongID']} ])
    }
    if(payload.tieuChi === 'ptKT') {
      return await Model.find({
        tinhTrangPhieuThu: 'quá hạn',
        ngayHetHan: {$gt: ngayBD, $lt: ngayKT}
      }).populate(['dsCTPT',{path:'phongID', populate:['khuPhongID']} ])
    }
  }
}