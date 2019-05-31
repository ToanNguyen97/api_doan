import Joi from 'joi'
Joi.ObjectId = require('joi-objectid')(Joi)
const roleGroupVal = {
  save: {
    payload: {
      _id: Joi.string(),
      nameRoleGroup: Joi.string().required().max(30)
    },
    options: {
      allowUnknown: true
    }
  },
  addRole: {
    payload: {
      idGroup: Joi.ObjectId(),
      roles: Joi.array()
    },
    options: {
      allowUnknown: true
    }
  },
}

export default {...roleGroupVal}