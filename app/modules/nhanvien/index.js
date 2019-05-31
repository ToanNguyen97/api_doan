import NhanVienRoutes from './routes/index.js'

exports.register = (server, options) => {
  server.route(NhanVienRoutes)
}

exports.name = "nhan-vien-app"