import Mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema.js'

const bookingSchema = new Schema(schema, options)

export default Mongoose.model('Booking', bookingSchema)