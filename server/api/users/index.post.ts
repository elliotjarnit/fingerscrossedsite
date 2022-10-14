import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await useBody(event);
    let mailinglist
    try {
        mailinglist = await prisma.user.create({data: {
            firstName: body.firstName || null,
            lastName: body.lastName || null,
            email: body.email || null,
            phone: body.phone || null,
            address: body.address || null,
            apartment: body.apartment || null,
            city: body.city || null,
            zip: body.zip || null,
            state: body.state || null
        }})
    } catch (e) {
        console.log("error: " + e)
        event.res.statusCode = 400
        event.res.statusMessage = e.code
        event.res.end()
    }
    return mailinglist
})
