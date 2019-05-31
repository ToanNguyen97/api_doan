import  Joi from 'joi'
Joi.ObjectId = require('joi-objectid')(Joi)

const cacKhoanThuVal = {
  save: {
    payload: {
      _id: Joi.string(),
      tenKhoanThu: Joi.string().required().max(30),
      giaKhoanThu: Joi.number(),
      donViTinh: Joi.string().required().max(30)
    },
    options: {
      allowUnknown: true
    }
  }
}

export default {...cacKhoanThuVal}