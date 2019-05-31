'use strict'

import LoaiKhachThueRoutes from './routes'

exports.register =  (server, options) => {
  server.route(LoaiKhachThueRoutes)
}

exports.name = 'loai-khach-thue-admin'