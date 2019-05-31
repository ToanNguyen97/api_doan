import Joi from 'joi'
Joi.ObjectId = require('joi-objectid')(Joi)

const lienHeVal = {
  save: {
    payload: {
      hoTenNguoiLienHe: Joi.string().required().max(50),
      email: Joi.string().email().required(),
      soDienThoai: Joi.string(),
      phongID: Joi.ObjectId()
    }
  }
}

export default {
  ...lienHeVal
}