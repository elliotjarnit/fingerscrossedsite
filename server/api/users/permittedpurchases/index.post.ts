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

    // Check if bulk user or single user
    if (body.bulk !== true) {
        const res = await prisma.permittedPurchase.create({
            data: {
                user: {
                    connect: {
                        id: body.userId
                    }
                },
                wine: {
                    connect: {
                        id: body.wineId
                    }
                }
            }
        })
        return res
    } else {
        let res = []
        for (let user in body.users) {
            const tempres = await prisma.permittedPurchase.create({
                data: {
                    user: {
                        connect: {
                            id: user.id
                        }
                    },
                    wine: {
                        connect: {
                            id: body.wineId
                        }
                    }
                }
            })
            res.push(tempres)
        }
        return res
    }
});