'use strict'

import Mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'
import HopDongDao from './dao.js'

const hopDongSchema = new Schema(schema, options)

hopDongSchema.plugin(HopDongDao)

export default Mongoose.model('HopDongThuePhong', hopDongSchema)