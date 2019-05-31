import Mongoose from 'mongoose'
import Boom from 'boom'
const LienHe = Mongoose.model('LienHe')

const save = async (request, h) => {
  try {
    return await LienHe.create(request.payload)
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  save
}