import bookingController from '../controller/index.js'
import bookingVal from '../validate/index.js'

export default [
  {
    method: 'GET',
    path:'/list-khach-dat-phong',
    handler: bookingController.get,
    config: {
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
    method: 'GET',
    path:'/check-so-luong-dat-{id}',
    handler: bookingController.Check,
    config: {
      tags: ['api'],
      auth:false,
      validate: bookingVal.check,
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
    method: 'GET',
    path:'/kich-hoat-phong-{id}',
    handler: bookingController.activeBooking,
    config: {
      tags: ['api'],
      auth:false,
      validate: bookingVal.active,
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
    path:'/book-phong',
    handler: bookingController.book,
    config: {
      tags: ['api'],
      auth: false,
      validate: bookingVal.book,
      description: 'dat phong',
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]