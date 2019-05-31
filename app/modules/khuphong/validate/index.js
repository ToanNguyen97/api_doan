const Joi = require('joi')
Joi.ObjectId = require('joi-objectid') (Joi)

const khuPhongVal = {
  create: {
    payload: {
      tenKhuPhong: Joi.string().required().max(20),
      anhKhuPhong: Joi.string(),
      moTa: Joi.string()
    }
  },
  update: {
    params: {
      id: Joi.ObjectId()
    },
    payload: {
      tenKhuPhong: Joi.string().required().max(20),
      anhKhuPhong: Joi.string(),
      moTa: Joi.string()
    }
  },
  delete: {
    params: {
      id: Joi.ObjectId()
    }
  },
  get: {
    params: {
      id: Joi.ObjectId()
    }
  }
}

export default {...khuPhongVal}