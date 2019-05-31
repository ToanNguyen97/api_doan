'use strict'
import Mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const loaiKhachThueSchema = new Schema(schema, options)

export default Mongoose.model('LoaiKhachThue', loaiKhachThueSchema)