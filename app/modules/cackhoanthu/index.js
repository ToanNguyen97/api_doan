import CacKhoanThuRoutes from './routes/index'

exports.register =  (server, options) => {
   server.route(CacKhoanThuRoutes)
}

exports.name = 'cac-khoan-thu-admin'