'use strict'

const bluebird = require('bluebird')
const redis = require('redis')
bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

exports.register = async function (server, options) {
  let settings = global.CONFIG.get('web.redisOptions')
  global.client = redis.createClient(settings)

  server.decorate('server', 'redis', global.client)
  server.decorate('request', 'redis', global.client)
  server.expose('client', global.client)
}

exports.name = 'app-redis'
exports.dependencies = 'app-mongo'
