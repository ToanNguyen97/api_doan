import CTPhieuThuController from '../controller/index'
import CTPhieuThuVal from '../validate/index'

export default [
  {
    method: 'GET',
    path: '/chitietphieuthu',
    handler: CTPhieuThuController.getAll,
    config: {
      tags: ['api'],
      description: 'lay tat ca cac chi tiet phieu thu',
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
   path: '/chitietphieuthu/{id}',
   handler: CTPhieuThuController.getById,
   config: {
     tags: ['api'],
     description: 'xem chi tiet phieu thu cua mot phieu thu',
     validate: CTPhieuThuVal.getById,
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
   path: '/chitietphieuthu',
   handler: CTPhieuThuController.save,
   config: {
     tags: ['api'],
     description: 'them',
     validate: CTPhieuThuVal.save,
     plugins: {
      'hapi-swagger': {
        responses: {'400':{'description': 'Bad Request'}},
        payloadType: 'json'
      }
    }
   } 
  }
]