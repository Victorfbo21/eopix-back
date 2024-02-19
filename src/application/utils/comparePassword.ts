
const bcrypt = require('bcrypt')

export function comparePassword(password: string, userPassword: string) {

    const compare = bcrypt.compareSync(password, userPassword)

    return compare
}