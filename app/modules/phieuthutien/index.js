import PhieuThuTienRoutes from './routes/index'

exports.register =  (server, options) => {
   server.route(PhieuThuTienRoutes)
}

exports.name = 'phieu-thu-tien-admin'