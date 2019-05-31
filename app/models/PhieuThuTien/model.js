import Mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'

const PhieuThuTienSchema = new Schema(schema, options)
PhieuThuTienSchema.virtual('dsCTPT',{
  ref: 'CTPhieuThuTien', 
  localField: '_id', 
  foreignField: 'phieuThuID',
})
export default Mongoose.model('PhieuThuTien', PhieuThuTienSchema)