import Mongoose, {Schema} from 'mongoose'
import {schema, options} from './schema'
import dao from './dao.js'
const PhieuThuTienSchema = new Schema(schema, options)
PhieuThuTienSchema.virtual('dsCTPT',{
  ref: 'CTPhieuThuTien', 
  localField: '_id', 
  foreignField: 'phieuThuID',
})

PhieuThuTienSchema.plugin(dao)
export default Mongoose.model('PhieuThuTien', PhieuThuTienSchema)