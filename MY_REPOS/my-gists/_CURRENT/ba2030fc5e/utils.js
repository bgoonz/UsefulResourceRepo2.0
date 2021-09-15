const bcrypt = require('bcryptjs')

/**
 * Hash password
 * @param string password 
 */
const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}