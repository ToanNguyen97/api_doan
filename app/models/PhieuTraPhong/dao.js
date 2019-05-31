'use strict'
module.exports = function (schema, options) {
  schema.statics.getPhongById = async function (idphong) {
    let Model = this
    let phieutraphong = await Model.find({phongID: idphong})
    return phieutraphong[0]
  } 
}