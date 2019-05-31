import bookingRoutes from './routes/index.js'

exports.register = (server, options) => {
  server.route(bookingRoutes)
}

exports.name = 'admin-booking'