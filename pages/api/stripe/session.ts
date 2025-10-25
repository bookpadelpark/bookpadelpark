import Stripe from 'stripe'
import { prisma } from '../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { bookingId } = req.body
  if (!bookingId) return res.status(400).json({ error: 'Missing bookingId' })

  const booking = await prisma.booking.findUnique({ where: { id: Number(bookingId) } })
  if (!booking) return res.status(404).json({ error: 'Booking not found' })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: { name: `Padel Court Booking (Court #${booking.courtId})` },
        unit_amount: 2000
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${process.env.BASE_URL}/success?booking=${booking.id}`,
    cancel_url: `${process.env.BASE_URL}/cancel`,
    metadata: { bookingId: String(booking.id) }
  })

  await prisma.booking.update({
    where: { id: booking.id },
    data: { stripeSessionId: session.id }
  })

  res.json({ url: session.url })
}