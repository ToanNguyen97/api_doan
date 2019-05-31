import Joi from 'joi'
Joi.ObjectId = require('joi-objectid')(Joi)

const bookVal = {
  book: {
    payload: {
      hoNguoiBook: Joi.string().required().max(20),
      tenNguoiBook: Joi.string().required().max(10),
      email: Joi.string().required().email(),
      soDienThoai: Joi.string().required().max(12),
      soCMND: Joi.string().required().max(11),
      diaChi: Joi.string().required().max(100),
      phongID: Joi.ObjectId(),
      ngayBookPhong: Joi.date().required(),
      ngayNhanPhong: Joi.date().required(),
      status: Joi.boolean().required()
    }
  },
  check: {
    params: {
      id: Joi.ObjectId()
    }
  },
  active: {
    params: {
      id: Joi.ObjectId()
    }
  }
}

export default {
  ...bookVal
}