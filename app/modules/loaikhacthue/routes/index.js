'use strict'

import LoaiKhachThueController from '../controller'
import LoaiKhachThueVal from '../validate'

export default [
  {
    method: 'GET',
    path: '/loaikhachthue',
    handler: LoaiKhachThueController.getAll,
    config: {
      description: 'lay danh sach loai khach thue',
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
    path: '/loaikhachthue',
    handler: LoaiKhachThueController.save,
    config: {
      description: 'them va sua loai khach thue',
      tags: ['api'],
      validate: LoaiKhachThueVal.save,
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]