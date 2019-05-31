const Mongoose = require('mongoose')
const Boom = require('boom')
const KhuPhong = Mongoose.model('KhuPhong')

exports.getAll = async (request, h) => {
  try {
    return await KhuPhong.find().populate([{path:'dsPhong', populate:['dsPhieuThu']}]).lean()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

exports.getById = async (request, h) => {
  try {
    return await KhuPhong.findById({_id: request.params.id}) || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

exports.create = async (request, h) => {
  try {
    return await KhuPhong.create(request.payload)
  } catch (err) {
    return Boom.forbidden(err)
  }
}

exports.update = async (request, h) => {
  try {
    let {tenKhuPhong, anhKhuPhong, moTa} = request.payload
    const item = await KhuPhong.findOneAndUpdate({_id: request.params.id}, {tenKhuPhong, anhKhuPhong, moTa})
    return item || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

exports.delete = async (request, h) => {
  try {
    return await KhuPhong.findOneAndRemove({_id: request.params.id}) || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}