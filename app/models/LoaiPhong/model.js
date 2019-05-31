'use strict'

import Mongoose, { Schema } from 'mongoose'
import { schema, options } from './schema'

const LoaiPhongSchema = new Schema(schema, options)

export default Mongoose.model('LoaiPhong', LoaiPhongSchema)