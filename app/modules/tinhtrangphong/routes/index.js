import TinhTrangPhongController from '../controller/index'
import TinhTrangPhongVal from '../validate/index'

export default [
  {
    method: 'GET',
    path: '/tinhtrangphong',
    handler: TinhTrangPhongController.getAll,
    config: {
      auth:false,
      description: 'xem danh sach tinh trang phong',
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
    method: 'GET',
    path: '/tinhtrangphong/{id}',
    handler: TinhTrangPhongController.getById,
    config: {
      validate: TinhTrangPhongVal.get,
      description: 'xem thong tin tinh trang phong',
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
    path: '/tinhtrangphong',
    handler: TinhTrangPhongController.create,
    config: {
      validate: TinhTrangPhongVal.create,
      description: 'tao moi tinh trang phong',
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
    method: 'PUT',
    path: '/tinhtrangphong/{id}',
    handler: TinhTrangPhongController.update,
    config: {
      validate: TinhTrangPhongVal.update,
      description: 'cap nhat thong tin tinh trang phong',
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
    method: 'DELETE',
    path: '/tinhtrangphong/{id}',
    handler: TinhTrangPhongController.deleteTinhTrangPhong,
    config: {
      validate: TinhTrangPhongVal.delete,
      description: 'xoa tinh trang phong',
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