import Mongoose, {Schema} from 'mongoose'
import { schema, options} from './schema'
import PhongDao from './dao'
import MongoosePaginate from 'mongoose-paginate'
const PhongSchema = new Schema(schema,options)
PhongSchema.virtual('dsPhieuThu',{
  ref: 'PhieuThuTien',
  localField: '_id',
  foreignField: 'phongID'
})

PhongSchema.virtual('dsHopDong', {
  ref:'HopDongThuePhong',
  localField: '_id',
  foreignField: 'phongID'
})

PhongSchema.plugin(PhongDao)
PhongSchema.plugin(MongoosePaginate)

export default Mongoose.model('Phong', PhongSchema)