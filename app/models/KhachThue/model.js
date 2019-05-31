import Mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'
import KhachThueDao from './dao.js'
const phongSchema = new Schema(schema,options)

phongSchema.plugin(KhachThueDao)
export default Mongoose.model('KhachThue', phongSchema)