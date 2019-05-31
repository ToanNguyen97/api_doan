import {schema, options} from './schema'
import PhieuTraPhongDao from './dao'
import Mongoose, {Schema} from 'mongoose'

const PhieuTraPhongSchema = new Schema(schema, options)

PhieuTraPhongSchema.plugin(PhieuTraPhongDao)
export default Mongoose.model('PhieuTraPhong', PhieuTraPhongSchema)

