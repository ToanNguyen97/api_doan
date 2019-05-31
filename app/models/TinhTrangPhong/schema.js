const schema = {
  tenTinhTrangPhong: {
    type: String,
    required: true,
    max: 20
  }
}

const options = {
  collection: 'tinhtrangphongs'
}

export { schema, options}