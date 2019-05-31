import Routes from './routes/index'

exports.register =  (server, options) => {
  server.route(Routes)
}

exports.name = 'admin-loaiphong'