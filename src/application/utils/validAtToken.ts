


export function getTokenValid() {
    const today = new Date();
    const toHour = (Number(process.env.TOKEN_EXPIRATION) / 3600)
    const validDate = new Date(today.getTime());
    const valid = validDate.setHours(validDate.getHours() + toHour);

    return valid
}