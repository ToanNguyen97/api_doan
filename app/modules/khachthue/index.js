'use strict'

import KhachThueRoutes from './routes/index'

exports.register =  (server, options) => {
  server.route(KhachThueRoutes)
}

exports.name = 'khach-thue-admin'