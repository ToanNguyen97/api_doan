'use strict'

import Joi from 'joi'
Joi.ObjectId = require('joi-objectid') (Joi)

const loaiKhachThueVal = {
  get: {
    params: {
      id: Joi.ObjectId()
    }
  },
  save: {
    payload: {
      _id: Joi.string(),
      tenLoaiKhachThue: Joi.string().required().max(30)
    }
  }
}

export default {
  ...loaiKhachThueVal
}