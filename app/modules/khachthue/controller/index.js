'use strict'
import Mongoose from 'mongoose'
import Boom from 'boom'
const fs = require('fs')
const KhachThue = Mongoose.model('KhachThue')
const Phong = Mongoose.model('Phong')
const save = async (request, h) => {
  try {
   let data = request.payload
   let item = {}
   if(!data._id)
   {
     if(data.anhDaiDien.name === null || data.anhDaiDien.name === "" || data.anhDaiDien.name === undefined) {
      data.anhDaiDien = "avatar.png"
     }
     else {
      let anhDaiDien64 = data.anhDaiDien.file64.replace(/^data(.*?)base64,/, "")
      fs.writeFile(`app/lib/images/${data.anhDaiDien.name}`, anhDaiDien64, 'base64', function (err) {
        return err
      })
      data.anhDaiDien = data.anhDaiDien.name
     }
     item  = new KhachThue(data)
   }
   else
   {
     if(data.anhDaiDien.name === null || data.anhDaiDien.name === "" || data.anhDaiDien.name === undefined) {
       item = await KhachThue.findById({_id: data._id})
       data.anhDaiDien = item.anhDaiDien
       item = Object.assign(item,data)
     }
     else {
       let anhDaiDien64 = data.anhDaiDien.file64.replace(/^data(.*?)base64,/, "")
       fs.writeFile(`app/lib/images/${data.anhDaiDien.name}`,anhDaiDien64, 'base64', function (err) {
         return err
       })
       data.anhDaiDien = data.anhDaiDien.name
       item = await KhachThue.findById({_id: data._id})
       item = Object.assign(item, data)
     }
    }   
    await item.save()
    let khachThue = await KhachThue.findById({_id: item._id}).populate('loaiKhachThueID') || Boom.notFound()
    return khachThue
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getAll = async (request, h) => {
  try {
    return await KhachThue.find().populate('loaiKhachThueID') || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const deleteKhachThue = async (request, h) => {
  try {
    return await KhachThue.findOneAndDelete({_id: request.params.id}) || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const search = async (request, h) => {
  try {
    let data = request.payload
    if(request.params.isReal === true) {
      let items = await KhachThue.find(data).populate('loaiKhachThueID')
      return items
    }
    else {
      let items = await KhachThue.searchMultiple(data)
      return items
    }
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getByDT = async (request, h) => {
  try {
    return await KhachThue.find({soDienThoai: request.params.sdt}).populate('loaiKhachThueID') || Boom.notFound()
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const getByID = async (request, h) => {
  try {
    let khachThue =  await KhachThue.findById({_id: request.params.id}).populate('loaiKhachThueID') || Boom.notFound()
    let dsPhong = []
    for(let item of khachThue.phongs) {
      let phong = await Phong.findById({_id:item}).populate(['loaiPhongID','khuPhongID','tinhTrangPhongID',{path: 'dsHopDong', populate:[{path:'khachThueID', populate:['loaiKhachThueID',]}]}, {path:'dsPhieuThu', populate:[{path:'dsCTPT', populate:['cacKhoanThuID']}]}]).lean()
      dsPhong.push(phong)
    }
    return {khachThue,phong:dsPhong}
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const put = async (request, h) => {
  try {
    let khachThue = await KhachThue.findById({_id: request.params.id})
    khachThue = Object.assign(khachThue,request.payload)
    return await khachThue.save()
  } catch (err) {
    return Boom.forbidden()
  }
}

const themTuBook = async (request, h) => {
  try {
    let data = request.payload
    data.tinhTrangKhachThue = 'Chưa thuê'
    data.anhDaiDien = 'avatar.png'
    return await KhachThue.create(data)
  } catch (err) {
    return Boom.forbidden(err)
  }
}

export default {
  save,
  getAll,
  deleteKhachThue,
  search,
  getByDT,
  put,
  getByID,
  themTuBook
}