'use strict'
import {Schema} from 'mongoose'

const schema = {
  hoKhachThue: {type: String, required: true, max: 30},
  tenKhachThue: {type: String, required: true, max: 20},
  anhDaiDien: {type: String},
  ngaySinh: {type: Date},
  gioiTinh: {type: Boolean, default: false},
  soCMND: {type: String, required: true, max: 11},
  soDienThoai: {type: String, max: 11},
  hoTenNguoiThan: {type: String, max: 50},
  diaChi: {type: String, required: true, max:80},
  loaiKhachThueID: {type: Schema.Types.ObjectId, ref: 'LoaiKhachThue'},
  tinhTrangKhachThue: {type:String, required: true},
  phongs: [{type: Schema.Types.ObjectId, ref: 'Phong'}],
  email: String
}

const options = {
  collection: 'khacthues'
}

export {schema, options}