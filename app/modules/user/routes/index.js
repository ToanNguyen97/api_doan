import UserController from '../controller/index'
import UserVal from '../validate/index'

export default [
  {
    method: 'POST',
    path: '/login',
    handler: UserController.login,
    config: {
      auth: false,
      description: 'check login',
      validate: UserVal.login,
      tags: ['api'],
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
    path: '/get-current-user',
    handler: UserController.getUser,
    config: {
      description: 'lay thong tin user',
      validate: UserVal.getuser,
      tags: ['api'],
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
    path: '/kich-hoat-tai-khoan-{id}',
    handler: UserController.active,
    config: {
      description: 'active tài khoản khách thuê',
      validate: UserVal.active,
      auth: false,
      tags: ['api'],
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
    path: '/sigin',
    handler: UserController.signin,
    config: {
      auth: false,
      description: 'sigin account',
      validate: UserVal.signin,
      tags: ['api'],
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
    path: '/editUser',
    handler: UserController.editUser,
    config: {
      description: 'cập nhật tài khoản',
      validate: UserVal.edit,
      tags: ['api'],
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
    path: '/backup',
    handler: UserController.backup,
    config: {
      auth: false,
      description: 'sao lưu',
      validate: UserVal.backup,
      tags: ['api'],
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
    path: '/restore',
    handler: UserController.restore,
    config: {
      auth: false,
      description: 'phục hồi',
      validate: UserVal.backup,
      tags: ['api'],
      plugins: {
        'hapi-swagger': {
          responses: {'400':{'description': 'Bad Request'}},
          payloadType: 'json'
        }
      }
    }
  }
]