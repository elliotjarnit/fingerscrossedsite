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
            zip: parseInt(body.zip) || null
        }})
    } catch (e) {
        console.log("error: " + e)
        return {error: e.code}
    }
    return mailinglist
})
