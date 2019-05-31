import CacKhoanThuController from '../controller/index'
import CacKhoanThuVal from '../validate/index'

export default [
  {
    method: 'GET',
    path: '/cackhoanthu',
    handler: CacKhoanThuController.getAll,
    config: {
      auth:false,
      tags: ['api'],
      description: 'lay danh sach cac khoan thu',
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
    path: '/cackhoanthu',
    handler: CacKhoanThuController.save,
    config: {
      tags: ['api'],
      description: 'them hoac sua cac khoan thu',
      validate: CacKhoanThuVal.save,
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]