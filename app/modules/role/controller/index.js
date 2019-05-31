import Boom from 'boom'
import Mongoose from 'mongoose'
const Role = Mongoose.model('Role')
const get = async (request, h) => {
  try {
    return await Role.find()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const save = async (request, h) => {
  try {
    let data = request.payload
    let item = {}
    if(!data._id) {
      item  = new Role(data)    
    } else {
      item = await Role.findById(data._id)
      item = Object.assign(item, data)   
    } 
    await item.save()
    return item
  } catch (err) {
    return Boom.forbidden(err)
  }
}
export default {
  get,
  save
}