const Mongoose = require('mongoose')
import Boom from 'boom'
const CTPhieuThuTien = Mongoose.model('CTPhieuThuTien')

const getAll = async (request, h) => {
  try {
    return await CTPhieuThuTien.find().populate([{path: 'cacKhoanThuID'},{path: 'phieuThuID'}])
  } catch (err) {
    return Boom.forbidden(err)
  }
}
// lấy thông tin theo mã phiếu thuư
const getById = async (request, h) => {
  try {
    return await CTPhieuThuTien.find({phieuThuID: request.params.id}).populate([{path: 'cacKhoanThuID'},{path: 'phieuThuID'}]) || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const save = async (request, h) => {
  try {
    let data = request.payload
    let item = {}
    if(!data._id) {
      item = new CTPhieuThuTien(data)
    }
    else {
      item = await CTPhieuThuTien.findById({_id: data._id})
      item = Object.assign(item, data)
    }
    return await item.save()
  } catch (err) {
    return Boom.forbidden(err)
  }
}


export default {
  save,
  getAll,
  getById
}