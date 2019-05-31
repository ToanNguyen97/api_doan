import PhongController from '../controller/index.js'
import PhongVal from '../validate/index.js'
export default [
  {
    method: 'GET',
    path: '/phong',
    handler: PhongController.getAll,
    config: {
      auth: false,
      description: 'lay danh sach phong',
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
    path: '/timkiemphong/timchinhxac={isReal}',
    handler: PhongController.searchMultiple,
    config: {
      description: 'tim kiem nhieu tham so',
      validate: PhongVal.search,
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
    path: '/tracuuphong',
    handler: PhongController.tracuuphong,
    config: {
      auth:false,
      description: 'tra cuu phong',
      validate: PhongVal.tracuuphong,
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
    path: '/tracuuphong-admin',
    handler: PhongController.tracuuphongAdmin,
    config: {
      auth:false,
      description: 'tra cuu phong',
      validate: PhongVal.tracuuphong,
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
    path: '/get-all-client',
    handler: PhongController.getAllClient,
    config: {
      auth:false,
      description: 'load tat ca danh sach phan trang',
      validate: PhongVal.getallclient,
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
    path: '/phong/{id}',
    handler: PhongController.getById,
    config: {
      validate: PhongVal.get,
      description: 'xem thong tin phong',
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
    path: '/phong-client/{id}',
    handler: PhongController.getById,
    config: {
      auth: false,
      validate: PhongVal.get,
      description: 'xem thong tin phong',
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
    path:'/phong',
    handler: PhongController.save,
    config: {
      validate: PhongVal.create,
      description: 'vua them sua phong',
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
    path:'/phong/{id}',
    handler: PhongController.update,
    config: {
      validate: PhongVal.update,
      description: 'cập nhật thông tin phòng',
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
    path: '/phong/{id}',
    handler: PhongController.deletePhong,
    config: {
      validate: PhongVal.delete,
      description: 'Xoa phong',
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