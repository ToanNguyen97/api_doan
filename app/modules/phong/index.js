'use strict'

import Routes from './routes/index.js'

exports.register =  (server, options) => {
  server.route(Routes)
}

exports.name = 'admin-phong'