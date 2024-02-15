
const bcrypt = require('bcrypt')

export function encodePassword(password: string) {

    const encodedPassword = bcrypt.hashSync(password, 10)

    return encodedPassword
}