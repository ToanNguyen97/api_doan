import lienHeRoutes from './routes/index.js'

exports.register = (server, options) => {
  server.route(lienHeRoutes)
}

exports.name = "lien-he"