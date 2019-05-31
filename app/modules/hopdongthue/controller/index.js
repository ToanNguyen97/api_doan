'use strict'

import Mongoose from 'mongoose'
import Boom from 'boom'
import Mail from '../../../lib/basemail/sendMail.js'
import MailHopDong from '../../../lib/basemail/mailHopDong.js'
import MailHetHanHopDong from '../../../lib/basemail/mailHetHanHopDong.js'
import formatCharacter from '../../../lib/services/translateCharacter.js'
import UserController from '../../user/controller/index.js'
const HopDongThuePhong = Mongoose.model('HopDongThuePhong')
const KhachThue = Mongoose.model('KhachThue')
const User = Mongoose.model('User')
const Phong = Mongoose.model('Phong')
//import translateCharacter from '../../../lib/services/translateCharacter.js'

const save = async (request, h) => {
  try {
    let data = request.payload
    let item = await HopDongThuePhong.findById(data._id)
    let khachThue = {}
    if(item) {
      item = Object.assign(item, data)
      await item.save()
    }
    else {
      item = new HopDongThuePhong(data)
      await item.save()
      // sau khi lập hợp đồng thì thêm phòng đó vào khách thuê và sửa tình trạng khách từ chưa thuê sang đã thuê
      khachThue = await KhachThue.findById({_id: item.khachThueID})
      if(khachThue && !khachThue.phongs) {
        khachThue.phongs = []
      }
      khachThue.phongs = khachThue.phongs.filter(key => key != String(item.phongID))
      khachThue.phongs = [...khachThue.phongs, ...[item.phongID]]
      khachThue.tinhTrangKhachThue = "Đang thuê"
      // check xem khách này là có tài khoản hay chưa
      let checkHasUser = await User.findOne({khachThueID: khachThue._id})
      if(!checkHasUser) {
        // tạo tài khoản sử dụng cho khách và check mail mới kích hoạt tài khoản
        let user = {
          userName: formatCharacter(`${khachThue.hoKhachThue}${khachThue.tenKhachThue}${khachThue.soDienThoai}`),
          passWord: khachThue.soDienThoai,
          email: khachThue.email,
          status: false,
          rolesGroupID: '5cc565b39f49904f20b6211f',
          khachThueID: khachThue._id
        }
        await UserController.createAccountKT(user)
      }      
      await khachThue.save()
      // cập nhật tình trạng phòng đã thuê
      let phong = await Phong.findById({_id: item.phongID}).populate('tinhTrangPhongID')
      // nếu chưa thuê sẽ đổi thành cho ở ghép
      if(phong.tinhTrangPhongID.id === "5c88669ffcd238559ca25d13") {
        phong.tinhTrangPhongID = "5c8866b6fcd238559ca25d15"
      }
      else if (phong.tinhTrangPhongID.id === "5c8866b6fcd238559ca25d15") 
      {
        // kiểm tra số người đang ở trong phòng có bằng 4 hay không, nếu bằng thì chuyển sang đã thuê, không thì cho ở ghép
        let countHopDong = await HopDongThuePhong.find({phongID: item.phongID}).populate('khachThueID')
        let countKhachCurrent = countHopDong.reduce((so,x) => {
          if(x.khachThueID.phongs && x.khachThueID.phongs.length > 0) {
            for(let i of x.khachThueID.phongs) {
              if(String(i) === String(x.phongID)) {
                return so +=1
              }
            }
          }
          return so
        }, 0)
        if(countKhachCurrent && countKhachCurrent === 4)  {
          phong.tinhTrangPhongID = "5c8866adfcd238559ca25d14"
        }
      }
      await phong.save()
    }
    // lấy hợp đồng để gởi mail
    let hopdong = await HopDongThuePhong.findById(item._id).populate([
      { path: 'khachThueID' },
      { path: 'phongID', populate: ['khuPhongID', 'tinhTrangPhongID', 'loaiPhongID'] }
    ])
    let options = {
      content: MailHopDong.mailHopDong(hopdong),
      subject: 'Hợp Đồng Thuê Phòng Trọ',
      text: 'Hợp Đồng Thuê Phòng Trọ'
    }
    Mail.SenMail(options, khachThue.email)
    return hopdong
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getAll = async (request, h) => {
  try {
    return await HopDongThuePhong.find().populate([{path:'khachThueID'},{path:'phongID', populate:['loaiPhongID','tinhTrangPhongID','khuPhongID']}])
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getById = async (request, h) => {
  try {
    return await HopDongThuePhong.find({_id: request.params.id}).populate('khachThueID').populate('phongID') || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const thongKeHD = async (request, h) => {
  try {
    let data = await HopDongThuePhong.thongKeHD(request.payload)
    return data || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const BaoHetHanHD = async (request, h) => {
  try {
    let data = request.payload.dsHD
    for(let item of data) {
      let options = {
        content: MailHetHanHopDong.mailHetHanHopDong(item),
        subject: 'Báo Hết Hạn Hợp Đồng Thuê Phòng Trọ',
        text: 'Báo Hết Hạn Hợp Đồng Thuê Phòng Trọ'
      }
      Mail.SenMail(options, item.khachThueID.email)
    }
    return true
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  getAll,
  getById,
  save,
  thongKeHD,
  BaoHetHanHD
}