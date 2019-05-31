import Boom from 'boom'
import Mongoose from 'mongoose'
import MailBooking from '../../../lib/basemail/mailBooking.js'
import sendMail from '../../../lib/basemail/sendMail.js';
const Booking = Mongoose.model('Booking')
const Phong   = Mongoose.model('Phong')
const get = async (request, h) => {
  try {
    return Booking.find().populate([{path:'phongID', populate:[{path:'loaiPhongID'},{path:'khuPhongID',populate:['dsPhong']},{path:'tinhTrangPhongID'}]}]).lean()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const book = async (request, h) => {
  try {
    let data = request.payload
    let booking = await Booking.create(data)
    let options = {
      subject: 'Kích hoạt đơn đặt phòng',
      text: 'Kích hoạt đơn đặt phòng',
      content: MailBooking.mailBooking(booking)
    }
    await sendMail.SenMail(options, booking.email)
    return booking
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const activeBooking = async (request, h) => {
  try {
    let booking = await Booking.findById(request.params.id)
    booking.status = true
    await booking.save()
    let activeBooking = await Booking.findById(booking._id).populate([{path:'phongID', populate:['khuPhongID','loaiPhongID']}])
    return activeBooking
  } catch (err) {
    return Boom.forbidden(err)
  }
}

// check số lượng khách đặt phòng theo id
const Check = async (request, h) => {
  try {
    let dsKhach = await Phong.findById({_id: request.params.id}).populate([{path: 'dsHopDong', populate: ['khachThueID']}]).lean()  
    let dsKhachThue = dsKhach.dsHopDong.map(item => {
      return item.khachThueID
    })
    let countPhong = dsKhachThue.filter((item) => {
      for(let key of item.phongs) {
        if(String(key) === String(request.params.id)) {
          return item
        }
      }
    })
    let dsBooking = await Booking.find({phongID: request.params.id, status: true})
    // check số lượng khách đang ở là bao nhiêu && số lượng đang book dc active la bao nhiêu
    if(countPhong && dsBooking && (dsBooking.length + countPhong.length) >= 4 ) {
      return true
    } else {
      return false
    }
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  get,
  book,
  activeBooking,
  Check
}