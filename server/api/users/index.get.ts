import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default eventHandler(async (event) => {
    console.log(getHeaders(event).authorization)
    // Check if request contains correct authorization header
    if (getHeaders(event).authorization === undefined || getHeaders(event).authorization.split(' ')[0] !== 'Basic') {
        event.res.statusCode = 401
        event.res.end()
    }
    // Check if authorization header is correct
    let auth = Buffer.from(getHeaders(event).authorization.split(' ')[1], 'base64').toString('ascii').split(':')
    if (auth[1] !== process.env.DASHBOARD_PASS) {
        event.res.statusCode = 401
        event.res.end()
    }
    let res = await prisma.user.findMany()
    return res
})