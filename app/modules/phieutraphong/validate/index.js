const Joi = require('joi')
Joi.ObjectId = require('joi-objectid') (Joi)
 const PhieuTraPhongVal = {
   save: {
     payload: {
       phongID: Joi.ObjectId(),
       khachThueID: Joi.ObjectId(),
       ngayLap: Joi.date().required()
     }
   },
   get: {
     params: {
       id: Joi.ObjectId()
     }
   },
   getPhong: {
     params: {
      idphong: Joi.ObjectId()
     }
   }
 }

 export default {...PhieuTraPhongVal}