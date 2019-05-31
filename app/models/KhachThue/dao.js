'use strict'

module.exports = function (schema, options) {
  schema.statics.searchMultiple = async function (payload) {
    let Model = this
    let queryString = {}
    if(payload.hoKhachThue)
    {
      queryString.hoKhachThue = { $regex: '.*' + payload.hoKhachThue + '.*' }
    }
    if(payload.tenKhachThue)
    {
      queryString.tenKhachThue = { $regex: '.*' + payload.tenKhachThue + '.*' }
    }
    if(payload.hoTenNguoiThan)
    {
      queryString.hoTenNguoiThan = { $regex: '.*' + payload.hoTenNguoiThan + '.*' }
    }
    if(payload.diaChi)
    {
      queryString.diaChi = { $regex: '.*' + payload.diaChi + '.*' }
    }
    if(payload.email)
    {
      queryString.email = { $regex: '.*' + payload.email + '.*' }
    }
    if (payload.loaiKhachThueID)
    {
      queryString.loaiKhachThueID = payload.loaiKhachThueID
    }
    if (payload.tinhTrangKhachThue)
    {
      queryString.tinhTrangKhachThue = payload.tinhTrangKhachThue
    }
    if (payload.soDienThoai)
    {
      queryString.soDienThoai = { $regex: '.*' + payload.soDienThoai + '.*' }
    }
    if (payload.soCMND)
    {
      queryString.soCMND = { $regex: '.*' + payload.soCMND + '.*' }
    }
    if (payload.gioiTinh)
    {
      queryString.gioiTinh = payload.gioiTinh
    }
    if (payload.ngaySinh)
    {
      queryString.ngaySinh = payload.ngaySinh
    }
    let data = await Model.find(queryString).lean().populate('loaiKhachThueID')
    return data
  }
}