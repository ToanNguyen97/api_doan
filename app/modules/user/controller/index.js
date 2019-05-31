import Mongoose, {Schema} from 'mongoose'
const PhieuThu = Mongoose.model('PhieuThuTien')
const Booking = Mongoose.model('Booking')
const Bcrypt = require('bcrypt')
const Boom = require('boom')
const User = Mongoose.model('User')
const Jwt = require('jsonwebtoken')
const Aguid = require('aguid')
const cmd = require('node-cmd')
const moment = require('moment')
const SALT_LENGTH= 10
const signin = async (request, h) => {
  try {
    let data = request.payload
    let listUsers = await User.find()
    let userNotDuplicate = listUsers.filter(item => {
      item.userName = data.userName
    })
    if(userNotDuplicate && userNotDuplicate.length === 0) {
      let newpass = Bcrypt.hashSync(data.passWord,SALT_LENGTH)
      let user = {userName: data.userName, passWord: newpass, email: data.email, status: data.status, rolesGroupID: data.rolesGroupID, nhanVienID:data.nhanVienID}
      // tao token
      let token = Jwt.sign(user, global.CONFIG.get('web.jwt.secret'))
      let userRegisted = await User.create(user)
      return {auth: true, token: token, userRegisted}
    }
    else {
      return Boom.badRequest('Lỗi lúc thêm rồi!')
    }
  } catch (err) {
    return Boom.forbidden(err)
  }
}
const createAccountNV = async (data) => {
  try {
    // tài khoản nhân viên sẽ không bao giờ trùng
      let newpass = Bcrypt.hashSync(data.passWord,SALT_LENGTH)
      let user = {userName: data.userName, passWord: newpass, email: data.email, status: data.status, rolesGroupID: data.rolesGroupID, nhanVienID:data.nhanVienID}
      let userRegisted = await User.create(user)
      return userRegisted
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const createAccountKT = async (data) => {
  try {
    // để phân biệt tài khoản của nhân viên hay khách thì nên lọc user kèm theo rolesGroupID
    let listUsers = await User.find({rolesGroupID: '5cc560ee21fd1c0d185cbd82'})
    let userNotDuplicate = listUsers.filter(item => {
      item.userName = data.userName
    })
    if(userNotDuplicate && userNotDuplicate.length === 0) {
      let newpass = Bcrypt.hashSync(data.passWord,SALT_LENGTH)
      let user = {userName: data.userName, passWord: newpass, email: data.email, status: data.status, rolesGroupID: data.rolesGroupID, khachThueID:data.khachThueID}
      let userRegisted = await User.create(user)
      return userRegisted
    }
    else {
      return Boom.badRequest('Lỗi trùng tài khoản!')
    }
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const login = async (request, h) => {
  try {
    let data = await User.findOne({userName: request.payload.userName})

    // check xem tài khoản này của khach hay của nhan vien
    let userInfo = {}
    if(data && data.nhanVienID) {
      data = await User.findById({_id:data._id}).populate(['nhanVienID',{path:'rolesGroupID', populate:['roles']}])
      userInfo = data.nhanVienID
    }
    if(data && data.khachThueID) {
      data = await User.findById({_id:data._id}).populate(['khachThueID',{path:'rolesGroupID', populate:['roles']}])
      userInfo= data.khachThueID
    }
    if(data === null) {
      return {credentials: null, isValid: false}
    }
    else {
      let isValid = await Bcrypt.compare(request.payload.passWord, data.passWord)
      if(isValid) {
        const credentials = {userName: data.userName, email: data.email, rolesGroupID: data.rolesGroupID, status: data.status, userInfo}
        let session = {
          valid: true,
          id: Aguid(),
          expires: new Date().getTime() + 30 * 60 * 1000,
          credentials
        }
        // đoạn này sẽ chèn thêm phần cập nhật phiếu thu hết hạn
        let dsPTQuaHan = await PhieuThu.find({ngayHetHan: {$lt: Date.now()}, tinhTrangPhieuThu: 'chưa đóng'})
        if(dsPTQuaHan && dsPTQuaHan.length > 0) {
          for(let item of dsPTQuaHan) {
              item.tinhTrangPhieuThu = 'quá hạn'
              await item.save()
          }
        }
        // chèn thêm cập nhật booking quá hạn, book không nhận phòng
        let dsBookingHetHan = await Booking.find({ngayNhanPhong: {$lt: Date.now()}})
        if(dsBookingHetHan && dsBookingHetHan.length > 0) {
          for(let item of dsBookingHetHan) {
            item.status = false
            await item.save()
          }
        }
        request.server.redis.set(session.id, JSON.stringify(session))
        let token = Jwt.sign(session, global.CONFIG.get('web.jwt.secret'))
        const response = h.response({auth: true, token, credentials, isValid})
        response.header("Authorization", token)
        response.state("token", token, global.CONFIG.get('web.cookieOptions'))
        return response
      }
      else {
        return {credentials: {userName: data.userName}, isValid: false}
      }
    }
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getUser = async (request, h) => {
  try {
    let userInfo = request.auth.credentials.credentials
    return userInfo
  } catch (err) {
    return err
  }
}

// cập nhật tài khoản

const editUser = async (request, h) => {
  try {
    // chưa check trùng tài khoản
    let data = request.payload
    console.log('data',data)
    let user = {}
    // nếu tài khoản cập nhật là khách
    if(data.khachThueID) {
      user = await User.findOne({khachThueID: data.khachThueID})
      // nếu cập nhật mật khẩu
      if(data.oldPass) {
        let isPassword = await Bcrypt.compare(data.oldPass, user.passWord)
        let newpass = Bcrypt.hashSync(data.newPass,SALT_LENGTH)
        if(isPassword === true) {
          let newUser = {
            _id: user._id,
            userName: data.userName,
            passWord: newpass,
            email: data.email,
            status: user.status,
            rolesGroupID: user.rolesGroupID,
            khachThueID: data.khachThueID
          }
          user = Object.assign(user,newUser)
          await user.save()
          return {user,isPassword}
        }
        else {
          return {user,isPassword}
        }
      } 
      else {
        // nếu cập nhật tài khoản
        let isPassword = true
        user.userName = data.userName
        await user.save()
        return {user,isPassword}
      }
    }
    // nếu tài khoản cập nhật là nhân viên
    if(data.nhanVienID) {
      user = await User.findOne({nhanVienID: data.nhanVienID})
       // nếu cập nhật mật khẩu
       if(data.oldPass) {
        let isPassword = await Bcrypt.compare(data.oldPass, user.passWord)
        let newpass = Bcrypt.hashSync(data.newPass,SALT_LENGTH)
        if(isPassword === true) {
          let newUser = {
            _id: user._id,
            userName: data.userName,
            passWord: newpass,
            email: data.email,
            status: user.status,
            rolesGroupID: user.rolesGroupID,
            nhanVienID: data.nhanVienID
          } 
          user = Object.assign(user,newUser)
          await user.save()
          return {user,isPassword}
        }
        else {
          return {user,isPassword}
        }
      }  
      else {
        // nếu cập nhật tài khoản
        let isPassword = true
        user.userName = data.userName
        await user.save()
        return {user,isPassword}
      } 
    }
    return false
  } catch (err) {
    return err
  }
}

// kích hoạt tài khoản
const active = async (request, h) => {
  try {
    let account = await User.findOne({khachThueID: request.params.id}).populate('khachThueID')
    if(account.status === false) {
      account.status = true
    }
    await account.save()
    return account
  } catch (err) {
    return Boom.forbidden(err)
  }
}

// sao luu tesst sao luu
const backup = async (request, h) => {
  try {
    let filename = 'QuanLyPhongTro-'+request.payload.namefolder + '-' + moment(new Date()).format('DD-MM-YYYY')
    cmd.run(`mongodump --out F:/DoAnTotNghiep/${request.payload.namefolder}/${filename} --db QuanLyPhongTro_57130724`);
    return true
  } catch (err) {
    return err
  }
}

// phục hồi
const restore = async (request, h) => {
  try {
    cmd.run(`mongorestore --port 27017 F:/DoAnTotNghiep/Backup/${request.payload.namefolder}`)
    return true
  } catch (err) {
    return err
  }
}
export default {
  signin,
  login,
  getUser,
  editUser,
  active,
  createAccountNV,
  createAccountKT,
  backup,
  restore
}