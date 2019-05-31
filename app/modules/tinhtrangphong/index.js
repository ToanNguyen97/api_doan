'use strict'

import Routes from './routes/index'

exports.register = async (server, options) => {
  server.route(Routes)
}

exports.name = 'admin-tinhtrangphong'