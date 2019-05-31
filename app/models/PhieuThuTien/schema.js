'use strict'

import { Schema } from "mongoose";

const schema = {
  _id: {
    type: String,
    required: true,
    length:16
  },
  phongID: {
    type: Schema.Types.ObjectId,
    ref: 'Phong'
  },
  ngayLap: {
    type: Date,
    required: true,
    default: Date.now()
  },
  ngayHetHan: {
    type: Date,
    required: true
  },
  moTa: {
    type: String
  },
  tinhTrangPhieuThu: {
    type: String,
    required: true,
    enum: ['chưa đóng', 'đã đóng', 'quá hạn']
  }
}

const options= {
  collection: 'phieuthutiens'
}

export {schema, options}