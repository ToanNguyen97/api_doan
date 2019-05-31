'use strict'

import Mongoose, { Schema } from 'mongoose'
import { schema, options } from './schema'

const KhuPhongSchema = new Schema(schema, options)

KhuPhongSchema.virtual('dsPhong', {
  ref: 'Phong',
  localField: '_id',
  foreignField: 'khuPhongID'
});


export default Mongoose.model('KhuPhong', KhuPhongSchema)