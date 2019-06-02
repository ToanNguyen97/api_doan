import Mongoose, { Schema, Promise } from 'mongoose'
import Boom from 'boom'
import moment from 'moment'
import MailPhieuThuTien from '../../../lib/basemail/mailPhieuThuTien.js'
import Mail from '../../../lib/basemail/sendMail.js'
const paypal = require('paypal-rest-sdk')
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': global.CONFIG.get('web.paypal.clientId'),
  'client_secret': global.CONFIG.get('web.paypal.secretPayPal')
});
const PhieuThuTien = Mongoose.model('PhieuThuTien')
const Phong = Mongoose.model('Phong')
const CTPhieuThuTien = Mongoose.model('CTPhieuThuTien')
const CacKhoanThu = Mongoose.model('CacKhoanThu')
const HopDongThue = Mongoose.model('HopDongThuePhong')
let TotalCTPT = 0
const getAll = async (request, h) => {
  try {
    return await PhieuThuTien.find().populate(['phongID','dsCTPT']).lean()
  } catch (err) {
    return Boom.forbidden(err)
  }
}
// hàm lập phiếu thu và kèm theo là sửa phiếu thu
const save = async (request, h) => {
  try {
    let data = request.payload
    let item = {}
    if(!data._id) {
      let phong = await Phong.findById({_id: data.phongID}).populate('khuPhongID')
      let soKhuPhong = phong.khuPhongID.tenKhuPhong.split(' ')
      let soPhong = phong.tenPhong.split(' ')
      let ngaylap = new Date(data.ngayLap)//'04-28-2019')
      data.ngayLap = ngaylap    
      let getThangNam = moment(ngaylap).format('MMYYYY')   
      // ngày hết hạn là ngày 10 của tháng tiếp theo: số 11 ở cuối vì chênh lệch múi giờ sẽ giảm xuống 10
      data.ngayHetHan = new Date(`${ngaylap.getFullYear()}-${ngaylap.getMonth() + 2 > 12? '01':ngaylap.getMonth() + 2}-11`)
      // mã phiểu thu gồm: PT + số phòng + số khu phòng + tháng và năm tạo
      data._id = `PTP${soPhong[1]}KV${soKhuPhong[2]}${getThangNam}`
      data.tinhTrangPhieuThu = 'chưa đóng'
      phong.soDien = data.soDienMoi
      phong.soNuoc = data.soNuocMoi
      let {_id, phongID, ngayLap, ngayHetHan, moTa, tinhTrangPhieuThu} = data
      await phong.save()
      item = new PhieuThuTien({_id, phongID, ngayLap, ngayHetHan, moTa, tinhTrangPhieuThu})
      //tiếp theo sẽ tạo chi tiết phiếu thu và thêm vào DB
      let tienDien = await CacKhoanThu.findById({_id:'5c983b7d28aebc66041a45aa'})
      let tienNuoc = await CacKhoanThu.findById({_id:'5c983b9b28aebc66041a45ab'})
      let tienMang = await CacKhoanThu.findById({_id:'5c983bf228aebc66041a45ac'})
      let tienThu = [
        {
          phieuThuID: item.id,
          cacKhoanThuID:'5c9b3dc77e5bed22acc4811a',
          donGia: phong.giaPhong
        },      
        {
          phieuThuID: item.id,
          chiSoCu: data.soDien,
          chiSoMoi: data.soDienMoi,
          donGia: tienDien.giaKhoanThu,
          cacKhoanThuID:tienDien._id,   
        },
        {
          phieuThuID: item.id,
          chiSoCu: data.soNuoc,
          chiSoMoi: data.soNuocMoi,
          donGia: tienNuoc.giaKhoanThu,
          cacKhoanThuID: tienNuoc._id,   
        }
      ]
      if(phong.dKMang === true) {
        tienThu.push({
          phieuThuID: item.id,
          donGia: tienMang.giaKhoanThu,
          cacKhoanThuID: tienMang._id
        })
      }
      for(let ctPT of tienThu) {
        await CTPhieuThuTien.create(ctPT)
      }

    } else {
      item = await PhieuThuTien.findById({_id: data._id})
      item = Object.assign(item, data)
    }
    let phieuthu =  await item.save()
    let phieuthuMail = await PhieuThuTien.findById({_id: phieuthu._id}).populate(['phongID','dsCTPT'])
    // lấy ra hợp đồng của phòng có phiếu thu và lọc ra email khách thuê đang ở phòng này để gởi mail
    /*let hopDong = await HopDongThue.find({phongID: phieuthuMail.phongID}).populate('khachThueID')
    let mailKhachThues = hopDong.filter(item => {
      if(item.khachThueID.phongs && item.khachThueID.phongs.length > 0) {
        let a = false
        for( let i of item.khachThueID.phongs) {
          if(String(i) === String(item.phongID)) {
            a = true
            break
          }
        }
        if( a === true) {
          return item
        }
        else {
          return null
        }
      }
    }).map(key => {
      return key.khachThueID.email
    })
    let stringEmail = ""
    for(let str of mailKhachThues) {
      stringEmail += str + ', '
    }*/
    let options = {
      content: MailPhieuThuTien.mailPhieuThuTien(phieuthuMail),
      subject: phieuthuMail.tinhTrangPhieuThu === 'chưa đóng'? 'Phiếu Báo Hóa Đơn': 'Phiếu Thanh Toán',
      text: phieuthuMail.tinhTrangPhieuThu === 'chưa đóng'? 'Phiếu Báo Hóa Đơn': 'Phiếu Thanh Toán'
    }
    let stringEmail = await GetEmailOfKhach(phieuthuMail.phongID)
    Mail.SenMail(options, stringEmail)
    return phieuthu
  } catch (err) {
    return Boom.forbidden(err)
  }
}
// hàm gới mail thông tin của 1 phiếu thu
const sendMail = async (request, h) => {
  try {
    let phieuthuMail = await PhieuThuTien.findById({_id: request.params.id}).populate(['phongID','dsCTPT'])
   
    // let hopDong = await HopDongThue.find({phongID: phieuthuMail.phongID}).populate('khachThueID')
    // let mailKhachThues = hopDong.map(hd => hd.khachThueID.email)
    // let stringEmail = ""
    // for(let str of mailKhachThues) {
    //   stringEmail += str + ', '
    // }
    let options = {
      content: MailPhieuThuTien.mailPhieuThuTien(phieuthuMail),
      subject: 'Thông Tin Phiếu Thu Cần Xem',
      text: 'Thông Tin Phiếu Thu Cần Xem'
    }
     // lấy ra email của phòng có phiếu thu và lọc ra email khách thuê đang ở phòng này để gởi mail
    let stringEmail = await GetEmailOfKhach(phieuthuMail.phongID)
    Mail.SenMail(options, stringEmail)
    return true
  } catch (err) {
    return Boom.forbidden(err)
  }
}
// hàm lấy thông tin để thanh toán qua paypal
const thanhToanPayPal = async (request, h) => {
  try {
    let phieuthu = request.payload.phieuthuInfo
    let name = `Phiếu thu tiền ${moment(phieuthu.ngayLap).format('DD/MM/YYYY')}`
    let namePhong = phieuthu._id.substring(2,9)
    let tongTien = phieuthu.dsCTPT.reduce((tongTien, x) => {
      if(x.chiSoMoi && x.chiSoMoi >0) {
        tongTien += (x.chiSoMoi - x.chiSoCu)* x.donGia
      } else {
        tongTien += x.donGia
      }
      return tongTien
    },0)
    let convertUSD = (tongTien/23000).toFixed(2) // tạm thời quy ước 1 đô 22000
    TotalCTPT = convertUSD
    var create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:8080/success",
          "cancel_url": "http://localhost:8080/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": name,
                  "sku": phieuthu._id,
                  "price": convertUSD,
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": convertUSD
          },
          "description": `Thanh toán hóa đơn ${namePhong}`
      }]
    }
    return await processPaypal(create_payment_json)
  } catch (err) {
    return Boom.forbidden(err)
  }
}
// hàm chuyển link đến trang paypal
const processPaypal = (create_payment_json) => {
  return new Promise(resolve => {
    paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
          throw error;
      } else {
          for(let i = 0; i < payment.links.length; i++) {
            if(payment.links[i].rel === 'approval_url') {
              return resolve(payment.links[i].href)
            }
          }
      }
    })
  })
}
// hàm hoàn tất thanh toán qua paypal
const hoanTatPayPal = async (request, h) => {
  try {
    const payerId = request.query.PayerID
    const paymentId = request.query.paymentId
    const execute_payment_json = {
      "payer_id": payerId,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": TotalCTPT
          }
      }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
      if (error) {
          throw error;
      } 
      else {
          console.log("Success");
          let phieuthuId = payment.transactions.pop().item_list.items.pop().sku
          let phieuthu = await PhieuThuTien.findById({_id: phieuthuId}).populate(['phongID','dsCTPT'])
          if(phieuthu) {
            phieuthu.tinhTrangPhieuThu = 'đã đóng'
            let {phongID, ngayLap, ngayHetHan, moTa, tinhTrangPhieuThu} = phieuthu
            await PhieuThuTien.findByIdAndUpdate({_id:phieuthu._id}, {phongID, ngayLap, ngayHetHan, moTa, tinhTrangPhieuThu})      
          }
          let options = {
            content: MailPhieuThuTien.mailPhieuThuTien(phieuthu),
            subject: 'Thanh toán qua PayPal',
            text: 'Thanh toán qua PayPal'
          }
           // lấy ra email của phòng có phiếu thu và lọc ra email khách thuê đang ở phòng này để gởi mail
          let stringEmail = await GetEmailOfKhach(phieuthu.phongID)
          Mail.SenMail(options, stringEmail)
      }
    });
    return true
  } catch (err) {
    return Boom.forbidden(err)
  }
}
// báo hết hạn
const BaoHetHanPT = async (request, h) => {
  try {
    for(let item of request.payload.dsPT) {
      
      let phieuthuMail = await PhieuThuTien.findById({_id: item._id}).populate(['phongID','dsCTPT'])
      let options = {
        content: MailPhieuThuTien.mailPhieuThuTien(phieuthuMail),
        subject: 'Phiếu Báo Quá Hạn',
        text:'Phiếu Báo Quá Hạn'
      }
      let stringEmail = await GetEmailOfKhach(phieuthuMail.phongID)
      if(stringEmail && stringEmail != null ) {
        Mail.SenMail(options, stringEmail)
      } else {
        console.log('phòng không có khách')
      }
      
    }
    
    return true
  } catch (err) {
    return Boom.forbidden(err)
  }
}
// thống kê
const thongKePT = async (request, h) => {
  try {
    let data = await PhieuThuTien.thongKePT(request.payload)
    return data || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}
// hàm lọc ra những email của khách đang ở phòng để nhận mail
const GetEmailOfKhach = async (phongID) => {
  let hopDong = await HopDongThue.find({phongID: phongID}).populate('khachThueID')
  let mailKhachThues = hopDong.filter(item => {
    if(item.khachThueID.phongs && item.khachThueID.phongs.length > 0) {
      let a = false
      for( let i of item.khachThueID.phongs) {
        if(String(i) === String(item.phongID)) {
          a = true
          break
        }
      }
      if( a === true) {
        return item
      }
      else {
        return null
      }
    }
  }).map(key => {
    return key.khachThueID.email
  })
  let stringEmail = ""
  for(let str of mailKhachThues) {
    stringEmail += str + ', '
  }
  return stringEmail
}

export default {
  getAll,
  save,
  sendMail,
  thanhToanPayPal,
  hoanTatPayPal,
  thongKePT,
  BaoHetHanPT
}