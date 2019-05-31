import RolesGroupRoute from './routes'

exports.register = (server, options) => {
  server.route(RolesGroupRoute)
}

exports.name = "rolegroup-admin"