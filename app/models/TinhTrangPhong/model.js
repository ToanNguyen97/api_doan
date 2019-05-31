'use strict'

import Mongoose, {Schema} from 'mongoose'
import { schema, options} from './schema'

const TinhTrangPhongSchema = new Schema(schema,options)

export default Mongoose.model('TinhTrangPhong', TinhTrangPhongSchema)