const schema = {
  tenKhuPhong: {
    type: String,
    required: true,
    max: 20
  },
  anhKhuPhong: {
    type: String
  },
  moTa: String
}

const options = {
  collection: 'khuphongs',
  timestamps: true,
  virtuals: true
}

export { schema, options}