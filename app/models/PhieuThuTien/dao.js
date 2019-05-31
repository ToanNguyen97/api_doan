'use strict'

import Mongoose from 'mongoose'
const Schema = Mongoose.Schema

const cacKhoanThuSchema = new Schema({ 
  TenKhoanThu: {type: String, required: true},
  GiaKhoanThu: {type: Number, required: true},
  DVT: String
})

module.exports = Mongoose.model('CacKhoanThu', cacKhoanThuSchema)