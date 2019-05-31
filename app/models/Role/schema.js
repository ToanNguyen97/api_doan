
const schema = {
  roleName: {
    type: String,
    required: true,
    max: 30
  }
}

const options = {
  collection: 'roles',
  virtuals: true
}

export {schema, options}