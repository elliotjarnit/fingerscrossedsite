export default eventHandler(async (event) => {
    // Check if request contains correct authorization header
    if (getHeaders(event).authorization === undefined || getHeaders(event).authorization.split(' ')[0] !== 'Basic') return false
    // Check if authorization header is correct
    let auth = Buffer.from(getHeaders(event).authorization.split(' ')[1], 'base64').toString('ascii').split(':')
    return auth[1] === process.env.DASHBOARD_PASS
})