import UserRoutes from './routes/index.js'

exports.register = (server, options) => {
  server.route(UserRoutes)
}

exports.name = 'auth-app'