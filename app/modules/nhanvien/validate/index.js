'use strict'
const Joi = require('joi')
Joi.ObjectId = require('joi-objectid')(Joi)

const nhanVienVal = {
  save: {
    payload: {
      _id: Joi.string().length(24),
      hoNhanVien: Joi.string().required(),
      tenNhanVien: Joi.string().required().max(20),
      anhDaiDien: Joi.object(),
      ngaySinh: Joi.date().required(),
      gioiTinh: Joi.boolean().required(),
      soCMND: Joi.string().required().max(11),
      soDienThoai: Joi.string().required().max(11),
      hoTenNguoiThan: Joi.string().required().max(50),
      diaChi: Joi.string().required().max(80),
      rolesGroupID: Joi.ObjectId(),
      email: Joi.string().email(),
      status: Joi.boolean().default(true)
    },
    options: {
      allowUnknown: true
    }
  },
  put: {
    payload: {
      _id: Joi.string().length(24),
      hoNhanVien: Joi.string().required(),
      tenNhanVien: Joi.string().required().max(20),
      anhDaiDien: Joi.string(),
      ngaySinh: Joi.date().required(),
      gioiTinh: Joi.boolean().required(),
      soCMND: Joi.string().required().max(11),
      soDienThoai: Joi.string().required().max(11),
      hoTenNguoiThan: Joi.string().required().max(50),
      diaChi: Joi.string().required().max(80),
      ChucVu: Joi.ObjectId(),
      email: Joi.string().email(),
      status: Joi.boolean().default(true)
    },
    params: {
      id: Joi.string().length(24)
    },
    options: {
      allowUnknown: true
    }
  },
  get: {
    params: {
      id: Joi.ObjectId()
    }
  },
  delete: {
    params: {
      id: Joi.ObjectId()
    }
  },
  getByDT: {
    params: {
      sdt: Joi.string().required()
    }
  }
}

export default {
  ...nhanVienVal
}