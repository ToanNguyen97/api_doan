'use strict'
import { Schema } from "mongoose";

const schema = {
  phieuThuID: {
    type: String,
    ref: 'PhieuThuTien'
  },
  chiSoCu: {
    type: Number
  },
  chiSoMoi: {
    type: Number
  },
  donGia: {
    type: Number,
    required: true
  },
  cacKhoanThuID: {
    type: Schema.Types.ObjectId,
    ref: 'CacKhoanThu'
  }
}

const options = {
  collection: 'ctphieuthutiens'
}

export {schema, options}