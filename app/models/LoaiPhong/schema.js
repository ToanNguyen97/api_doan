const schema = {
  tenLoaiPhong: {
    type: String,
    required: true,
    max: 30
  },
  giaPhong: {
    type: Number,
    required: true
  }
}

const options = {
  collections: 'loaiphongs'
}

export  {schema, options}