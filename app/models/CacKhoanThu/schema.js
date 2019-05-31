const schema = {
  tenKhoanThu: {
    type: String,
    required: true,
    max:30
  },
  giaKhoanThu: {
    type: Number
  },
  donViTinh: {
    type: String,
    required: true,
    max: 30
  }
}

const options = {
  collection: 'cackhoanthus'
}
export {schema, options}