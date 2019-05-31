import RolesRoutes from './routes'

exports.register = (server, options) => {
  server.route(RolesRoutes)
}

exports.name = 'role-admin'