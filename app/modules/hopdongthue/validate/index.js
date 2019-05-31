'use strict'

import Joi from 'joi'
Joi.ObjectId = require('joi-objectid')(Joi)

const hopDongThueVal = {
  save: {
    payload: {
      _id: Joi.string(),
      khachThueID: Joi.ObjectId(),
      phongID: Joi.ObjectId(),
      ngayKetThuc: Joi.date(),
      ngayLap: Joi.date()
    },
    options: {
      allowUnknown: true
    }
  },
  get: {
    params: {
      id: Joi.string().required()
    }
  },
  delete: {
    params: {
      id: Joi.string().required()
    }
  },
  thongKeHD: {
    payload: {
      ngayThongKe: Joi.array().required(),
      tieuChi: Joi.string().required()
    }
  },
  BaoHetHanHD: {
    payload: {
      dsHD: Joi.array().required()
    }
  }
}


export default {
  ...hopDongThueVal
}