import PhieuTraPhongRoutes from './routes/index.js'

exports.register =  (server, options) => {
  server.route(PhieuTraPhongRoutes)
}

exports.name = 'phieu-tra-phong-admin'