const Mongoose = require('mongoose')
const LoaiPhong = Mongoose.model('LoaiPhong')
const Boom = require('boom')

const getAll = async (request, h) => {
  try {
    return await LoaiPhong.find()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getById = async (request, h) => {
  try {
    return await LoaiPhong.findById({_id: request.params.id}) || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const create = async (request, h) => {
  try {
    return await LoaiPhong.create(request.payload)
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const update = async (request, h) => {
  try {
    let {tenLoaiPhong, giaPhong} = request.payload
    const item = await LoaiPhong.findOneAndUpdate({_id: request.params.id}, {tenLoaiPhong, giaPhong})
    return item || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const deleteLoaiPhong = async (request, h) =>{
  try {
    return await LoaiPhong.findOneAndRemove({_id: request.params.id}) || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  getAll,
  getById,
  create,
  update,
  deleteLoaiPhong
}