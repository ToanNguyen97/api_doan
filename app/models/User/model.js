import Mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const userSchema = new Schema(schema, options)

export default Mongoose.model('User',userSchema)