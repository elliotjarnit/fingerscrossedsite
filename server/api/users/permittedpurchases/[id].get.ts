import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const id = event.context.params.id;
    const res = await prisma.permittedPurchase.findFirst({
        where: {
            id: id
        }
    })
    if (res === null) {
        event.res.statusCode = 404
        event.res.end()
    }
    return res
});