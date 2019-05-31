import Mongoose from 'mongoose'
import Boom from 'boom'
const PhieuTraPhong = Mongoose.model('PhieuTraPhong')
const KhachThue = Mongoose.model('KhachThue')
const Phong = Mongoose.model('Phong')
const LienHe = Mongoose.model('LienHe')
import mailLienHe from '../../../lib/basemail/mailLienHe.js'
import sendMail from '../../../lib/basemail/sendMail.js'
const save = async (request, h) => {
  try {
    let data = request.payload
    let item = {}
    if(!data._id) {
      item = new PhieuTraPhong(data)
      // bắt đầu cập nhật khách thuê khi trả phòng nếu thuê 2 phòng trở lên thì trừ phòng này ra , còn k thì cập nhật trạng thái thành đã trả phòng
      let khachThue = await KhachThue.findById({_id:item.khachThueID})
      if(khachThue && khachThue.phongs && khachThue.phongs.length >0) {

        khachThue.phongs = khachThue.phongs.filter(key => String(key) != String(item.phongID))
      }
      if(khachThue.phongs &&  khachThue.phongs.length === 0)
      {
        khachThue.tinhTrangKhachThue = 'Đã trả phòng'
      }
      await khachThue.save()
      /* bắt đầu cập nhật tình trạng cho phòng, mặc định là nếu đã thuê phòng thì sẽ không chuyển thành cho ở ghép
        khách còn ở thì tự quyết định có muốn cho ở ghép hay không, còn nếu như phòng đó không ai ở nữa thì chuyển sang
        là còn trống,
        cách củ chuối, là lấy hết hợp đồng của phòng này ra và xem thử khách thuê đó còn ở phòng này k
      */
      let phong = await Phong.findById({_id: item.phongID}).populate({path: 'dsHopDong', populate:[{path:'khachThueID'}]})
      let countKhach = phong.dsHopDong.filter(item => {
        if(item.khachThueID.phongs && item.khachThueID.phongs.length > 0) {
          let a = false
          for(let i of item.khachThueID.phongs) {
            if(String(i) === String(item.phongID)) {
              a = true
              break
            }
          }
          if( a === true) {
            return item
          } else {
            return null
          }
        }
      })
      if(countKhach && countKhach.length === 0)
      {
        phong.tinhTrangPhongID = '5c88669ffcd238559ca25d13'
        await phong.save()
      }
    }
    else {
      item = await PhieuTraPhong.findById({_id:data._id})
      item = Object.assign(item, data)
    }
    await item.save()
    let phieu = await PhieuTraPhong.findById({_id:item._id}).populate('khachThueID')
    // check phòng này có ai để lại liên hệ hay không thì gởi mail liên hệ
     let lienHePhong = await LienHe.find({phongID: phieu.phongID}).populate('phongID')
    if(lienHePhong && lienHePhong.length > 0) {
      let emailKhach = lienHePhong.map(v => {return v.email})
      let stringEmail = "";
      for(let str of emailKhach) {
        stringEmail += str + ', '
      }
      let options = {
        content: mailLienHe.mailLienHe(lienHePhong[0]),
        subject: 'Thông báo phòng trống',
        text: 'Thông báo phòng trống'
      }
      console.log('email',stringEmail)
      sendMail.SenMail(options, stringEmail)
    } 
    return phieu  
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getAll = async (request, h) => {
  try {
    return await PhieuTraPhong.find()
  } catch (err) {
    return Boom.forbidden()
  }
}

const getById = async (request, h) => {
  try {
    return await PhieuTraPhong.findById({_id:request.params._id}) || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getByPhongId = async (request, h) => {
  try {
    return await PhieuTraPhong.find({phongID:request.params.idphong}).populate('khachThueID') || {}
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  save,
  getAll,
  getById,
  getByPhongId
}