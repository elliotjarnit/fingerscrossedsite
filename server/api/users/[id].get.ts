import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default eventHandler(async (event) => {
    let res = await prisma.user.findFirst({
        where: {
            id: Number(event.context.params.id)
        }
    })

    // Check if request contains correct authorization header
    if (getHeaders(event).authorization === undefined || getHeaders(event).authorization.split(' ')[0] !== 'Basic') {
        event.res.statusCode = 401
        event.res.end()
    }
    // Check if authorization header is correct
    let auth = Buffer.from(getHeaders(event).authorization.split(' ')[1], 'base64').toString('ascii').split(':')
    let pp = await prisma.permittedPurchase.findFirst({
        where: {
            id: auth[1]
        }
    })
    // If the permitted purchase dosent exist or the password is incorrect
    if (pp === null || pp.userId !== res.id) {
        event.res.statusCode = 401
        event.res.end()
    }

    return res
})