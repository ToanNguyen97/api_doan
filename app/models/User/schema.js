'use strict'
import {Schema} from 'mongoose'

const schema = {
  userName: {
    type: String,
    required: true
  },
  passWord: {
    type: String,
    required:true
  },
  email: {
    type: String,
    default: ''
  },
  status: {
    type: Boolean,
    default: true // true: active, false: inactive
  },
  rolesGroupID: {
    type: Schema.Types.ObjectId,
    ref: 'RoleGroup'
  },
  nhanVienID: {
    type: Schema.Types.ObjectId,
    ref: 'NhanVien'
  },
  khachThueID: {
    type: Schema.Types.ObjectId,
    ref: 'KhachThue'
  }
}

const options = {
  collection: 'users',
  timestamps: true,
  virtuals: true
}

export {schema, options}