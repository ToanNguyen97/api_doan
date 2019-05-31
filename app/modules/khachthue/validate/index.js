'use strict'
const Joi = require('joi')
Joi.ObjectId = require('joi-objectid')(Joi)

const khachThueVal = {
  save: {
    payload: {
      _id: Joi.string().length(24),
      hoKhachThue: Joi.string().required().max(30),
      tenKhachThue: Joi.string().required().max(20),
      anhDaiDien: Joi.object(),
      ngaySinh: Joi.date().required(),
      gioiTinh: Joi.boolean().required(),
      soCMND: Joi.string().required().max(11),
      soDienThoai: Joi.string().required().max(13),
      hoTenNguoiThan: Joi.string().required().max(50),
      diaChi: Joi.string().required().max(80),
      loaiKhachThueID: Joi.ObjectId(),
      tinhTrangKhachThue: Joi.string().required(),
      email: Joi.string().email()
    },
    options: {
      allowUnknown: true
    }
  },
  put: {
    payload: {
      _id: Joi.string().length(24),
      hoKhachThue: Joi.string().required().max(30),
      tenKhachThue: Joi.string().required().max(20),
      anhDaiDien: Joi.string(),
      ngaySinh: Joi.date().required(),
      gioiTinh: Joi.boolean().required(),
      soCMND: Joi.string().required().max(11),
      soDienThoai: Joi.string().required().max(11),
      hoTenNguoiThan: Joi.string().required().max(50),
      diaChi: Joi.string().required().max(80),
      loaiKhachThueID: Joi.ObjectId(),
      tinhTrangKhachThue: Joi.string().required(),
      email: Joi.string().email()
    },
    params: {
      id: Joi.string().length(24)
    },
    options: {
      allowUnknown: true
    }
  },
  search: {
    params: {
      isReal: Joi.boolean()
    },
    payload: {
      hoKhachThue: Joi.string(),
      tenKhachThue: Joi.string(),
      ngaySinh: Joi.date(),
      gioiTinh: Joi.boolean(),
      soCMND: Joi.string(),
      soDienThoai: Joi.string(),
      hoTenNguoiThan: Joi.string(),
      diaChi: Joi.string(),
      loaiKhachThueID: Joi.ObjectId(),
      tinhTrangKhachThue: Joi.string(),
      email: Joi.string()
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
  },
  themTuBook: {
    payload : {
      hoKhachThue: Joi.string().required().max(30),
      tenKhachThue: Joi.string().required().max(20),
      email:  Joi.string().email(),
      soDienThoai: Joi.string().required().max(11),
      soCMND: Joi.string().required().max(11),
      diaChi: Joi.string().required().max(80)
    }
  }
}

export default {
  ...khachThueVal
}