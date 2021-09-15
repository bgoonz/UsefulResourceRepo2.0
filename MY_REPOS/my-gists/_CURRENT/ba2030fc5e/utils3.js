const bcrypt = require('bcryptjs')

/**
 * Compare password
 */
const comparePassword = (candidatePassword, trustedPassword) => {
    return bcrypt.compareSync(candidatePassword, trustedPassword)
}