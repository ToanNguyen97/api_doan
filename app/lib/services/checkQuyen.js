const isRoles = (request, h) => {
  try {
    let getRolesAllow = ['chủ trọ','nhân viên']
    let roles = request.auth.credentials.credentials.roles
    if(getRolesAllow.includes(roles))
    {
      return true
    }
    else {
      return false
    }
  } catch (err) {
    return Boom.forbidden(err)
  }
}

const isRolesCustomer = (request, h) => {
  try {
    let roles = request.auth.credentials.credentials.roles
    if(roles === 'khách thuê')
    {
      return true
    }
    else {
      return false
    }
  } catch (err) {

  }
}

const isRolesAdmin = (request, h) => {
  try {
    let roles = request.auth.credentials.credentials.roles
    if(roles === 'chủ trọ')
    {
      return true
    }
    else {
      return false
    }
  } catch (err) {

  }
}
export default {
  isRoles,
  isRolesCustomer,
  isRolesAdmin
}