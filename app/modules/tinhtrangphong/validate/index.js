import Joi from 'joi'
Joi.ObjectId = require('joi-objectid') (Joi)

const tinhTrangPhongVal = {
  create: {
    payload: {
      tenTinhTrangPhong: Joi.string().required().max(20)
    }
    },
  get: {
    params: {
      id: Joi.ObjectId()
    }
  },
  update: {
    params: {
      id: Joi.ObjectId()
    },
    payload: {
      tenTinhTrangPhong: Joi.string().required().max(20)
    }
  },
  delete: {
    params: {
      id: Joi.ObjectId()
    }
  }
}

export default {...tinhTrangPhongVal}