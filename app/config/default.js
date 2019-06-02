'use strict'

let config = {}
const Pack = require('./../../package')

config.web = {
  name: Pack.name,
  connection: {
    host: 'localhost',
    port: 3002,
    router: {
      isCaseSensitive: false,
      stripTrailingSlash: true
    },
    routes: {
      cors: {
        origin: ['*'],
        credentials: true
      }
    }
  },
  db: {
    uri: 'mongodb://localhost/QuanLyPhongTro_57130724'
  },
  redisOptions: {
    host: '127.0.0.1', // 13.228.4.248
    port: 6379,
    detect_buffers: true,
    prefix: Pack.name + ':'
  },
  jwt: {
    secret: 'BbZJjyoXAdr8BUZUiKKARWimKfrSmQ6fv8kZ8OFfc'
  },
  paypal: {
    clientId: 'ARwGwhxb0Az-yi33FoBZzZRE6SAiGnIt5-VxcRJhLMXl4t_rDbKi4YLIJadR_6dH1q6W4DpmOoBjcvSw',
    secretPayPal: 'EGHbYdkjuc889C3oadHkDSLyRNhxLP--VHd4KLnc0P3G-NzbTNNUZvvvxve3fpbJ6caC-TBeIydEZ67g'
  },
  cookieOptions: {
    ttl: 365 * 24 * 60 * 60 * 1000, // expires a year from today
    encoding: 'none', // we already used JWT to encode
    isSecure: false, // warm & fuzzy feelings
    isHttpOnly: true, // prevent client alteration
    clearInvalid: false, // remove invalid cookies
    strictHeader: true, // don't allow violations of RFC 6265
    path: '/' // set the cookie for all routes
  }
}

module.exports = config
