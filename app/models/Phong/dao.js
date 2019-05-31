'use strict'
module.exports = function (schema, options) {
  schema.statics.SearchMultiple = async function (payload) {
    let Model = this
    let queryString = {}
    if (payload.tenPhong)
    {
      queryString.tenPhong = { $regex: '.*' + payload.tenPhong + '.*' }
    }
    if (payload.khuPhongID)
    {
      queryString.khuPhongID = payload.khuPhongID
    }
    if (payload.loaiPhongID)
    {
      queryString.loaiPhongID = payload.loaiPhongID
    }
    if (payload.moTa) 
    {
      queryString.moTa = {$regex : `.*${payload.moTa}.*`}
    }
    if (payload.soDien)
    {
      queryString.soDien = payload.soDien
    }
    if (payload.soNuoc)
    {
      queryString.soNuoc = payload.soNuoc
    }
    if (payload.dKMang)
    {
      queryString.dKMang = payload.dKMang
    }
    if (payload.homeFlag)
    {
      queryString.homeFlag = payload.homeFlag
    }
    if (payload.hotFlag)
    {
      queryString.hotFlag = payload.hotFlag
    }
    if (payload.status)
    {
      queryString.status = payload.status
    }
    let data = await Model.find(queryString).lean().populate('loaiPhongID').populate('khuPhongID').populate('tinhTrangPhongID')
    return data
  }
  schema.statics.tracuuphongAdmin = async function (payload) {
    let Model = this
    let queryString = {}
    let arrayLoaiPhong = []
    if (payload.loaiPhong)
    {
      arrayLoaiPhong.push(payload.loaiPhong)
    }
    if (payload.giaPhong)
    {
      arrayLoaiPhong.push(payload.giaPhong)
    }
    if (payload.isMang)
    {
      queryString.dKMang = payload.isMang
    }
    if(arrayLoaiPhong && arrayLoaiPhong.length > 0) {
      queryString.loaiPhongID = { $in: arrayLoaiPhong }
    }
    if(payload.tinhTrangPhongSelect && payload.tinhTrangPhongSelect.length > 0) {
      // lọc ra phòng có tình trạng theo yêu cầu
      queryString.tinhTrangPhongID = {$in: payload.tinhTrangPhongSelect}
    }
    let data = await Model.find(queryString).populate([{path:'loaiPhongID'},{path:'khuPhongID',populate:['dsPhong']},{path:'tinhTrangPhongID'}]).lean()
    return data
  }
  schema.statics.tracuuphong = async function (payload) {
    let Model = this
    let queryString = {}
    let arrayLoaiPhong = []
    if (payload.loaiPhong)
    {
      arrayLoaiPhong.push(payload.loaiPhong)
    }
    if (payload.giaPhong)
    {
      arrayLoaiPhong.push(payload.giaPhong)
    }
    if (payload.isMang)
    {
      queryString.dKMang = payload.isMang
    }
    if(arrayLoaiPhong && arrayLoaiPhong.length > 0) {
      queryString.loaiPhongID = { $in: arrayLoaiPhong }
    }
    if(payload.tinhTrangPhongSelect && payload.tinhTrangPhongSelect.length > 0) {
      // lọc ra phòng có tình trạn theo yêu cầu
      queryString.tinhTrangPhongID = {$in: payload.tinhTrangPhongSelect}
    }
    let options = {
      populate: [{path:'loaiPhongID'},{path:'khuPhongID',populate:['dsPhong']},{path:'tinhTrangPhongID'}],
      lean: true,
      limit:payload.pagination.rowsPerPage,
      page: payload.pagination.page
    }
    let data = await Model.paginate(queryString, options) //find().populate([{path:'loaiPhongID'},{path:'khuPhongID',populate:['dsPhong']},{path:'tinhTrangPhongID'}]).lean()
    return data
  }
}