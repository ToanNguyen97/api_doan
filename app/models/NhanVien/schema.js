import {Schema} from 'mongoose'
const schema = {
  hoNhanVien: {type: String, required: true, max: 30},
  tenNhanVien: {type: String, required: true, max: 20},
  anhDaiDien: {type: String, required: true},
  ngaySinh: {type: Date, required: true},
  gioiTinh: {type: Boolean, required: true, default: false},
  soCMND: {type: String, required: true, max: 11},
  soDienThoai: {type: String, max: 11},
  hoTenNguoiThan: {type: String, max: 50},
  diaChi: {type: String, required: true, max:80},
  rolesGroupID: {ref:'RoleGroup', type: Schema.Types.ObjectId},
  email: String,
  status: {type: Boolean, default:true}
}

const options = {
  collection: 'nhanviens'
}

export {schema, options}