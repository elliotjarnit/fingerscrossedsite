// Dash auth required

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
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
    const body = await useBody(event);
    let wine
    try {
        wine = await prisma.wine.create({data: {
            name: body.name || null,
            description: body.description || null,
            price: body.price || null,
            quantityAvailable: body.quantity || null,
            image: body.image || null
        }})
    } catch (e) {
        console.log("error: " + e)
        event.res.statusCode = 400
        event.res.statusMessage = e.code
        event.res.end()
    }
    return wine
});