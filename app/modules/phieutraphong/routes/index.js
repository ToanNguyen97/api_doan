import PhieuTraPhongController from '../controller/index.js'
import PhieuTraPhongVal from '../validate/index'

export default [
  {
    method: 'GET',
    path: '/phieutraphong',
    handler: PhieuTraPhongController.getAll,
    config: {
      tags: ['api'],
      description: 'Lay toan bo phieu tra phong',
      plugins: {
        'hapi-swagger': {
          responses: {'400':{'description':'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/phieutraphong/{id}',
    handler: PhieuTraPhongController.getById,
    config: {
      tags: ['api'],
      description: 'Lay thong tin phieu tra phong',
      validate: PhieuTraPhongVal.get,
      plugins: {
        'hapi-swagger': {
          responses: {'400':{'description':'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  },
  {
    method: 'GET',
    path: '/phieutraphongbyphong/{idphong}',
    handler: PhieuTraPhongController.getByPhongId,
    config: {
      tags: ['api'],
      description: 'Lay thong tin phieu tra phong theo phong',
      validate: PhieuTraPhongVal.getPhong,
      plugins: {
        'hapi-swagger': {
          responses: {'400':{'description':'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  },
  {
    method: 'POST',
    path: '/phieutraphong',
    handler: PhieuTraPhongController.save,
    config: {
      tags: ['api'],
      description: 'them sua phieu tra phong',
      validate: PhieuTraPhongVal.save,
      plugins: {
        'hapi-swagger': {
          responses: {'400':{'description':'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  },

]