'use strict'

exports.register = async (server, options) => {
  server.route({
    method: 'GET',
    path: '/image/{file*}',
    handler: (request, h) => {
      try {
        return h.file('app/lib/images/' + request.params.file)
      } catch (err) {
        return err
      }
    },
    config: {
      auth: false
    }
  })
}

exports.name = 'route-image'