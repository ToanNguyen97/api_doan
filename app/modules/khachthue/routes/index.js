'use strict'

import KhachThueController from '../controller/index'
import KhachThueVal from '../validate/index'

export default [
  {
    method: 'GET',
    path: '/khachthue',
    handler: KhachThueController.getAll,
    config: {
      tags: ['api'],
      description: 'lay danh sach khach thue',
      plugins: {
        'hapi-swagger': {
          responses: {'400':{'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/khachthue/sdt={sdt}',
    handler: KhachThueController.getByDT,
    config: {
      tags: ['api'],
      validate: KhachThueVal.getByDT,
      description: 'lay thong tin khach by so dien thoai',
      plugins: {
        'hapi-swagger': {
          responses: {'400':{'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/khachthue/id={id}',
    handler: KhachThueController.getByID,
    config: {
      tags: ['api'],
      validate: KhachThueVal.get,
      description: 'lay thong tin khach by so dien thoai',
      plugins: {
        'hapi-swagger': {
          responses: {'400':{'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/khachthue',
    handler: KhachThueController.save,
    config: {
      description: 'them va sua khach thue',
      tags: ['api'],
      validate: KhachThueVal.save,
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
    path: '/khachthue-them-book',
    handler: KhachThueController.themTuBook,
    config: {
      description: 'them từ đặt phòng',
      tags: ['api'],
      validate: KhachThueVal.themTuBook,
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
    path: '/khachthuetimkiem/chinhxac={isReal}',
    handler: KhachThueController.search,
    config: {
      description: 'im kiem khach thue',
      tags: ['api'],
      validate: KhachThueVal.search,
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
    path: '/khachthue/{id}',
    handler: KhachThueController.put,
    config: {
      description: 'cập nhật tình trạng',
      tags: ['api'],
      validate: KhachThueVal.put,
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
    path:'/khachthue/{id}',
    handler: KhachThueController.deleteKhachThue,
    config: {
      tags: ['api'],
      description: 'xoa thong tin khach thue',
      validate: KhachThueVal.delete,
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]