import {Schema} from 'mongoose'

const schema = {
  hoTenNguoiLienHe : {
    type: String,
    required: true,
    max: 50
  },
  email: {
    type: String, 
    required: true
  },
  soDienThoai: {
    type: String,
    required: true,
    max: 12
  },
  phongID: {
    type: Schema.Types.ObjectId,
    ref: 'Phong'
  }
}

const options = {
  collection: 'lienhes'
}

export {schema, options}