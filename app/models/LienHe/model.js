import Mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema.js'

const lienHeSchema = new Schema(schema, options)

export default Mongoose.model('LienHe', lienHeSchema)