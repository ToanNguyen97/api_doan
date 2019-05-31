'use strict'

import HopDongThueController from '../controller'
import HopDongThueVal from '../validate'

export default [
  {
    method: 'GET',
    path: '/hopdongthuephong',
    handler: HopDongThueController.getAll,
    config: {
      tags: ['api'],
      description: 'xem danh sach hop dong',
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
    path: '/hopdong-thongke',
    handler: HopDongThueController.thongKeHD,
    config: {
      description: 'thống kê hợp đồng',
      validate: HopDongThueVal.thongKeHD,
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
    path: '/hopdongthuephong',
    handler: HopDongThueController.save,
    config: {
      tags: ['api'],
      description: 'them va sua thong tin hop dong',
      validate: HopDongThueVal.save,
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
    path: '/hopdong-baohethan',
    handler: HopDongThueController.BaoHetHanHD,
    config: {
      tags: ['api'],
      description: 'báo hết hạn hợp đồng',
      validate: HopDongThueVal.BaoHetHanHD,
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
    path: '/hopdongthuephong/{id}',
    handler: HopDongThueController.getById,
    config: {
      tags: ['api'],
      description: 'xem thong tin 1 hop dong',
      validate: HopDongThueVal.getById,
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]