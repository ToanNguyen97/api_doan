import {Schema} from 'mongoose'

const schema = {
  nameRoleGroup: {
    type: String,
    required: true,
    max: 30
  },
  roles: [{type: Schema.Types.ObjectId, ref: 'Role'}],
}

const options = {
  collections: 'rolegroups',
  virtuals: true
}

export {schema, options}