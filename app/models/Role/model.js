import Mongoose , {Schema} from 'mongoose'
import {schema,options} from './schema.js'

const RoleSchema = new Schema(schema,options)

export default Mongoose.model('Role',RoleSchema)