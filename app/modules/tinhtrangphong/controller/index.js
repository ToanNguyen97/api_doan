import Mongoose from 'mongoose'
import Boom from 'boom'
import { request } from 'https';
const TinhTrangPhong = Mongoose.model('TinhTrangPhong')

const getAll = async (request, h) => {
  try {
    return await TinhTrangPhong.find()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getById = async (request, h) => {
  try {
    return await TinhTrangPhong.findById({_id: request.params.id}) || Boom.notFound()
  } catch (err)
  {
    return Boom.forbidden(err)
  }
}

const create = async (request, h) => {
  try {
    return await TinhTrangPhong.create(request.payload)
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const update = async (request, h) => {
  try {
    let {tenTinhTrangPhong} = request.payload
    const item = await TinhTrangPhong.findOneAndUpdate({_id: request.params.id}, {tenTinhTrangPhong})
    return item || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const deleteTinhTrangPhong = async (request, h) => {
  try {
    return await TinhTrangPhong.findOneAndRemove({_id: request.params.id}) || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  getAll,
  getById,
  create,
  update,
  deleteTinhTrangPhong
}