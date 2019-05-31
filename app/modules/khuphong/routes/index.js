import KhuPhongController from '../controller/index'
import KhuPhongVal from '../validate/index'
import { get } from 'https';

export default [
  {
    method: 'GET',
    path: '/khuphong',
    handler: KhuPhongController.getAll,
    config: {
      description: 'danh sach khu phong',
      tags:['api'],
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
    path: '/khuphong/{id}',
    handler: KhuPhongController.getById,
    config: {
      validate: KhuPhongVal.get,
      description: 'xem thong tin phong by id',
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
    path: '/khuphong',
    handler: KhuPhongController.create,
    config: {
      validate: KhuPhongVal.create,
      description: 'tao moi khu phong',
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
    path: '/khuphong/{id}',
    handler: KhuPhongController.update,
    config: {
      validate: KhuPhongVal.update,
      description: 'cap nhat khu phong',
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
    path: '/khuphong/{id}',
    handler: KhuPhongController.delete,
    config: {
      validate: KhuPhongVal.delete,
      description: 'xoa khu phong',
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