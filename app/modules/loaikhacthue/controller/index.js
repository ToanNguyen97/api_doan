'use strict'

import Mongoose from 'mongoose'
import Boom from 'boom'
const LoaiKhachThue = Mongoose.model('LoaiKhachThue')

const getAll = async (request, h) => {
  try {
    return await LoaiKhachThue.find() || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const save = async (request, h) => {
  try {
    let data = request.payload
    let item = {}
    if(!data._id)
    {
      item = new LoaiKhachThue(data)
    }
    else
    {
      item = await LoaiKhachThue.findById(data._id)
      item  = Object.assign(item,data)
    }
    await item.save()
    return item
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  getAll,
  save
}