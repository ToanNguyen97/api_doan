'use strict'
const Joi = require('joi')
Joi.ObjectId = require('joi-objectid') (Joi)

const userVal = {
  signin: {
    payload: {
      userName: Joi.string().required().max(30),
      passWord: Joi.string().required(),
      email: Joi.string().email(),
      status: Joi.boolean().default(true),
      rolesGroupID: Joi.ObjectId(),
      nhanVienID: Joi.ObjectId()
    }
  },
  login: {
    payload: {
      userName: Joi.string().required().max(30),
      passWord: Joi.string().required()
    }
  },
  backup: {
    payload: {
      namefolder: Joi.string().required()
    }
  },
  edit: {
    payload: {
      userName: Joi.string().required().max(30),
      email: Joi.string().email().required(),
      oldPass: Joi.string(),
      newPass: Joi.string(),
      xacNhan: Joi.string(),
      khachThueID: Joi.string(),
      nhanVienID: Joi.string()
    },
    options: {
      allowUnknown: true
    }
  },
  active : {
    params: {
      id: Joi.ObjectId()
    }
  }
}

export default {...userVal}