import Mongoose, { Schema } from 'mongoose'
import {schema, options} from './schema'

const cTPhieuThuTienSchema = new Schema(schema, options)

export default Mongoose.model('CTPhieuThuTien', cTPhieuThuTienSchema)