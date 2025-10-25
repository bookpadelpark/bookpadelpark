import { prisma } from '../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, courtId, date, slot } = req.body
    if (!userId || !courtId || !date || !slot) return res.status(400).json({ error: 'Missing fields' })

    // Prevent double-booking same court/date/slot
    const exists = await prisma.booking.findFirst({
      where: { courtId, date: new Date(date), slot }
    })
    if (exists) return res.status(400).json({ error: 'Slot taken' })

    const booking = await prisma.booking.create({
      data: { userId, courtId, date: new Date(date), slot }
    })
    res.status(201).json({ booking })
  } else if (req.method === 'GET') {
    const { courtId, date } = req.query
    const where: any = {}
    if (courtId) where.courtId = Number(courtId)
    if (date) where.date = new Date(String(date))

    const bookings = await prisma.booking.findMany({ where })
    res.json({ bookings })
  } else {
    res.status(405).end()
  }
}