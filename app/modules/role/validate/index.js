import Joi from 'joi'

Joi.ObjecId  = require('joi-objectid') (Joi)

const roleVal = {
  create: {
    payload: {
      _id: Joi.string(),
      roleName: Joi.string().required().max(30)
    },
    options: {
      allowUnknown: true
    }
  }
}

export default {...roleVal}