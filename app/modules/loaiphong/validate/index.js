const Joi = require('joi')
Joi.ObjectId = require('joi-objectid') (Joi)

const LoaiPhongVal = {
  create: {
    payload: {
      tenLoaiPhong: Joi.string().required().max(30),
      giaPhong: Joi.number().required()
    }
  },
  update: {
    params: {
      id: Joi.ObjectId()
    },
    payload: {
      tenLoaiPhong: Joi.string().required().max(30),
      giaPhong: Joi.number().required()
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
  }
}

export default {...LoaiPhongVal}