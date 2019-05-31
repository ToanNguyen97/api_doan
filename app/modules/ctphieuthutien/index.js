import CTPhieuThuTienRoutes from './routes/index'

exports.register = (server, option) => {
  server.route(CTPhieuThuTienRoutes)
}

exports.name = 'chi-tiet-phieu-thu-admin'