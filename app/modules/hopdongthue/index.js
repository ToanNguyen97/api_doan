'use strict'

import HopDongThuePhongRoutes from './routes'

exports.register =  (server, options) => {
  server.route(HopDongThuePhongRoutes)
}

exports.name = 'hop-dong-thue-phong-admin'