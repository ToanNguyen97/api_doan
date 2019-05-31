const AuthJwt2 = require('hapi-auth-jwt2')

exports.register = async function (server, options) {
  const validate = async function (decoded, request) {
    const redisClient = server.redis
    let result = await redisClient.getAsync(decoded.id)
    if (result) {
      let session = JSON.parse(result)
      if(session.valid === true) {
        return {isValid: true}
      }
      return {isValid: false}
    }
    return {isValid: false}
  }

  await server.register(AuthJwt2)
  server.auth.strategy('jwt', 'jwt', {
    key: global.CONFIG.get('web.jwt.secret'),
    validate,
    verifyOptions: { ignoreExpiration: true, algorithms: ['HS256'] }
  })
  server.auth.default('jwt')
}

exports.name = 'app-auth-jwt2'
exports.dependencies = ['app-redis']