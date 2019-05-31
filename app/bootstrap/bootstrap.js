'use strict'

import { plugin } from 'mongoose';

const mongo = require('../lib/mongo.js')
const redis = require('../lib/redis.js')
const auth = require('../lib/auth.js')
const Inert = require('inert')
const Vision = require('vision')
const HapiCors = require('hapi-cors')
const HapiSwagger = require('hapi-swagger')
const RouteImage = require('../lib/routeimage')
export const loader = async function (server) {
  const Pack = require('./../../package')
  const swaggerOptions = {
    info: {
      title: 'Test API',
      version: Pack.version
    }
  }
  await server.register([
    /* Plugin lib */
    mongo,
    redis,
    auth,
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    },
    RouteImage,
    {
      plugin: HapiCors,
      options: {
          origins: ['*'],        
          methods: ['POST, GET, OPTIONS, PUT, DELETE'] 
      }
    }
  ])
    .then(async (err) => {
      if (err) {
        console.log(err)
      }
     /* Load models */
     require('../models/Phong/model')
     require('../models/KhuPhong/model')
     require('../models/LoaiPhong/model')
     require('../models/TinhTrangPhong/model')
     require('../models/KhachThue/model')
     require('../models/LoaiKhachThue/model')
     require('../models/HopDongThuePhong/model')
     require('../models/PhieuThuTien/model')
     require('../models/CTPhieuThuTien/model')
     require('../models/CacKhoanThu/model')
     require('../models/PhieuTraPhong/model')
     require('../models/User/model')
     require('../models/Booking/model')
     require('../models/LienHe/model')
     require('../models/NhanVien/model')
     require('../models/Role/model')
     require('../models/RoleGroup/model')
     require('../lib/services/translateCharacter.js')
     require('../lib/services/checkQuyen.js')

     /* Load Modules */
     let modules = []
     modules.push(require('../modules/phong'))
     modules.push(require('../modules/khuphong'))
     modules.push(require('../modules/loaiphong'))
     modules.push(require('../modules/tinhtrangphong'))
     modules.push(require('../modules/khachthue'))
     modules.push(require('../modules/loaikhacthue'))
     modules.push(require('../modules/hopdongthue'))
     modules.push(require('../modules/cackhoanthu'))
     modules.push(require('../modules/phieuthutien'))
     modules.push(require('../modules/ctphieuthutien'))
     modules.push(require('../modules/phieutraphong'))
     modules.push(require('../modules/user'))
     modules.push(require('../modules/nhanvien'))
     modules.push(require('../modules/role'))
     modules.push(require('../modules/rolegroup'))
     modules.push(require('../modules/booking'))
     modules.push(require('../modules/lienhe'))
     
     if (modules.length) {
       let options = {}
       options.routes = { prefix: '/api' }
       await server.register(modules, options, (err) => {
         if (err) {
           console.log(err)
         }
       })
     }
    })
}
