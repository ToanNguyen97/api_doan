'use strict'
import Mongoose from 'mongoose'
import Boom from 'boom'
import formatCharacter from '../../../lib/services/translateCharacter.js'
import User from '../../user/controller/index.js'
const fs = require('fs')
const NhanVien = Mongoose.model('NhanVien')
const Account = Mongoose.model('User')
const save = async (request, h) => {
  try {
   // if(request.pre.isRoles) {
      let data = request.payload
      let item = {}
      if(!data._id)
      {
        let anhDaiDien64 = data.anhDaiDien.file64.replace(/^data(.*?)base64,/, "")
        fs.writeFile(`app/lib/images/${data.anhDaiDien.name}`, anhDaiDien64, 'base64', function (err) {
          return err
        })
        data.anhDaiDien = data.anhDaiDien.name
        item  = new NhanVien(data)
        // chỗ này chưa check trường hợp nếu nhân viên đó vừa là khách thì tài khoản sẽ trùng??
        let user = {
          userName: formatCharacter(`nhanvien${item.hoNhanVien}${item.tenNhanVien}${item.soDienThoai}`),
          passWord: item.soDienThoai,
          email: item.email,
          status: item.status,
          rolesGroupID: item.rolesGroupID,
          nhanVienID: item._id
        }
        await User.createAccountNV(user)
      }
      else
      {
        if(data.anhDaiDien.name === null || data.anhDaiDien.name === "" || data.anhDaiDien.name === undefined) {
          item = await NhanVien.findById({_id: data._id})
          // kiểm tra thử có sửa quyền của tài khoản nhân viên hay không
          if(String(data.rolesGroupID) !== String(item.rolesGroupID)) {
            let account = await Account.findOne({nhanVienID:item._id})
            if(account) {
              account.rolesGroupID = data.rolesGroupID
              await account.save()
            }
          }
          data.anhDaiDien = item.anhDaiDien
          item = Object.assign(item,data)
        }
        else {
          let anhDaiDien64 = data.anhDaiDien.file64.replace(/^data(.*?)base64,/, "")
          fs.writeFile(`app/lib/images/${data.anhDaiDien.name}`,anhDaiDien64, 'base64', function (err) {
            return err
          })
          data.anhDaiDien = data.anhDaiDien.name
          // kiểm tra thử có sửa quyền của tài khoản nhân viên hay không
          if(String(data.rolesGroupID) !== String(item.rolesGroupID)) {
            let account = await Account.findOne({nhanVienID:item._id})
            if(account) {
              account.rolesGroupID = data.rolesGroupID
              await account.save()
            }
          }
          item = await NhanVien.findById({_id: data._id})
          item = Object.assign(item, data)  
        }
        }   
        await item.save()    
        let nhanVien = await NhanVien.findById({_id: item._id}).populate('rolesGroupID')  || Boom.notFound()
        return nhanVien
    // }
    // else {
    //   return h.response({message:'Not allowed'})
    // }
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getAll = async (request, h) => {
  try {
   // if(request.pre.isRoles) {
      return await NhanVien.find().populate('rolesGroupID') || Boom.notFound()
    // }
    // else {
    //   return h.response({message:'Not allowed'})
    // }
  } catch (err) {
    return Boom.forbidden(err)
  }
}
export default {
  save,
  getAll
}