'use strict'

const schema = {
  tenLoaiKhachThue: {type: String, required: true, max: 30}
}

const options = {
  collection: 'loaikhachthues'
}

export {schema, options}