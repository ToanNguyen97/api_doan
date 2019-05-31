import Mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema.js'

const RoleGroupSchema = new Schema(schema,options)

RoleGroupSchema.virtual('dsNhanVien', {
  ref: 'NhanVien', // The model to use
  localField: '_id', // Find people where `localField`
  foreignField: 'rolesGroupID',
})
export default Mongoose.model('RoleGroup',RoleGroupSchema)