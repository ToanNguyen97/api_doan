'use strict'
import Mongoose, {Schema} from 'mongoose'
const schema = {
  phongID: {
    type: Schema.Types.ObjectId,
    ref: 'Phong'
  },
  khachThueID: {
    type: Schema.Types.ObjectId,
    ref: 'KhachThue'
  },
  ngayLap: {
    type: Date
  }
}

const options = {
  collection: 'PhieuTraPhong'
}

export {schema, options}