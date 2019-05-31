import roleVal from '../validate'
import roleController from '../controller'

export default [
  {
    method: 'GET',
    path: '/role',
    handler: roleController.get,
    config: {
      auth: false,
      description: 'xem danh sách role',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/role',
    handler: roleController.save,
    config: {
      auth: false,
      validate: roleVal.create,
      description: 'them va sua role',
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]