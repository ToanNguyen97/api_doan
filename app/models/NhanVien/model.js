import Mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const nhanVienSchema = new Schema(schema,options)

export default Mongoose.model('NhanVien',nhanVienSchema)