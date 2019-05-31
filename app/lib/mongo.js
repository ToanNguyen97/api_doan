'use strict'

import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

exports.register = async function (server, options) {
  await mongoose.connect(global.CONFIG.get('web.db.uri'), {useNewUrlParser: true})
  mongoose.set('useCreateIndex', true)
  mongoose.set('useFindAndModify', false)
  mongoose.plugin(mongoosePaginate)
  console.log('Register Mongo:', global.CONFIG.get('web.db.uri'))
}

exports.name = 'app-mongo'