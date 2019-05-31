
'use strict'
module.exports = function (schema, options) {
  schema.statics.thongKeHD = async function(payload) {
    let Model = this
    let ngayBD = payload.ngayThongKe[0]
    let ngayKT = payload.ngayThongKe[1]
    if(payload.tieuChi === 'hdLap') {
      return await Model.find({
        ngayLap: {$gt: ngayBD, $lt: ngayKT}
      }).populate(['khachThueID','phongID' ])
    }
    if(payload.tieuChi === 'hdKT') {
      return await Model.find({
        ngayKetThuc: {$gt: ngayBD, $lt: ngayKT}
      }).populate([{path:'khachThueID'},{path:'phongID', populate:['khuPhongID']}])
    }
  }
}