'use strict'

import {Schema} from 'mongoose'

const schema = {
  _id: {
    type: String,
    required:true
  },
  khachThueID: {
    type: Schema.Types.ObjectId,
    ref: 'KhachThue'
  },
  phongID: {
    type: Schema.Types.ObjectId,
    ref: 'Phong'
  },
  ngayLap: {
    type: Date
  },
  ngayKetThuc: {
    type: Date
  }
}

const options = {
  collection: 'hopdongs'
}

export {schema, options}