import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: null,
  });

export default defineEventHandler(async (event) => {
    const body = await useBody(event);

    // Get the permitted purchase from database
    const ppurchase = await prisma.permittedPurchase.findFirst({
        where: {
            id: body.permittedPurchaseId
        }
    })

    // Get the wine from database
    const wine = await prisma.wine.findFirst({
        where: {
            id: ppurchase.wineId
        }
    })

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
        amount: Number(String(wine.price).replace(".", "")),
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
    });

    return {client_secret: paymentIntent.client_secret}
});