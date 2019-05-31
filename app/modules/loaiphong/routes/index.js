'use strict'

import LoaiPhongController from '../controller/index'
import LoaiPhongVal from '../validate/index'

export default [
  {
    method: 'GET',
    path: '/loaiphong',
    handler: LoaiPhongController.getAll,
    config: {
      auth: false,
      description: 'xem danh sach loai phong',
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
    path: '/loaiphong/{id}',
    handler: LoaiPhongController.getById,
    config: {
      validate: LoaiPhongVal.get,
      description: 'xem thong tin loai phong',
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
    path: '/loaiphong',
    handler: LoaiPhongController.create,
    config: {
      validate: LoaiPhongVal.create,
      description: 'them loai phong',
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
    path: '/loaiphong/{id}',
    handler: LoaiPhongController.update,
    config: {
      validate: LoaiPhongVal.update,
      description: 'cap nhat thong tin loai phong',
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
    path: '/loaiphong/{id}',
    handler: LoaiPhongController.deleteLoaiPhong,
    config: {
      validate: LoaiPhongVal.delete,
      description: 'xoa loai phong',
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