import lienHeController from '../controller/index.js'
import lienHeVal from '../validate/index.js'

export default [
  {
    method: 'POST',
    path:'/dat-lien-he',
    handler: lienHeController.save,
    config: {
      auth: false,
      tags: ['api'],
      validate: lienHeVal.save,
      description: 'lay danh sach cac khoan thu',
      plugins: {
        'hapi-swagger': {
          responses: {'400': {'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]