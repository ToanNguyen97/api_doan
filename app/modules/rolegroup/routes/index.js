import roleGroupVal from '../validate'
import roleGroupController from '../controller'

export default [
  {
    method:'GET',
    path: '/role-group',
    handler: roleGroupController.get,
    config: {
      auth: false,
      tags: ['api'],
      description: 'lay danh sach nhom quyen',
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  },
  {
    method:'POST',
    path: '/role-group',
    handler: roleGroupController.save,
    config: {
      auth: false,
      validate: roleGroupVal.save,
      tags: ['api'],
      description: 'them hoac sua nhom quyen',
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  },
  {
    method:'POST',
    path: '/role-group-add-role',
    handler: roleGroupController.addRole,
    config: {
      auth: false,
      validate: roleGroupVal.addRole,
      tags: ['api'],
      description: 'them quyen cho nhom',
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]