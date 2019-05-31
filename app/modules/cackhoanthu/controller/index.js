const Mongoose = require('mongoose')
const CacKhoanThu = Mongoose.model('CacKhoanThu')
const Boom = require('boom')

const save = async (request, h) => {
  try {
    let data = request.payload
    let item = {}
    if(!data._id) {
      item = new CacKhoanThu(data)
    }else {
      item = await CacKhoanThu.findById({_id: data._id})
      item = Object.assign(item, data)
    }
    return await item.save()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getAll = async (request, h) => {
  try {
    return await CacKhoanThu.find() 
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  save,
  getAll
}