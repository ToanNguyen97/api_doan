'use strict'

import Mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const cacKhoanThuSchema = new Schema(schema, options)

export default Mongoose.model('CacKhoanThu', cacKhoanThuSchema)