import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: null,
});

export default defineEventHandler(async (event) => {
    let body = await useBody(event);
    let stripeStatus = body.type || undefined;
    let webhook_secret = process.env.STRIPE_WEBHOOK_SECRET || undefined;
    let stripeHeader = getHeader(event, 'stripe-signature') || undefined;
    let webhook_event;

    console.log('stripeStatus', stripeStatus);

    if (process.env.DEV != "true") {
        try {
            webhook_event = stripe.webhooks.constructEvent(body, stripeHeader, webhook_secret);
        } catch (e) {
            event.res.statusCode = 400
            event.res.end()
        }
    }

    if (stripeStatus === "payment_intent.succeeded") {
        let data = body.data.object;

        // Update order
        let order = await prisma.order.update({
            where: {
                paymentIntentSecret: data.client_secret
            },
            data: {
                status: "paid"
            }
        })

        event.res.statusCode = 200
        event.res.end()
    } else if (stripeStatus === "payment_intent.payment_failed") {
        let data = body.data.object;

        // Update order
        let order = await prisma.order.update({
            where: {
                paymentIntentSecret: data.client_secret
            },
            data: {
                status: "failed"
            }
        })

        event.res.statusCode = 200
        event.res.end()
    }
});