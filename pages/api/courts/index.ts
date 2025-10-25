import { prisma } from '../../../lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const courts = await prisma.court.findMany()
    res.json({ courts })
  } else {
    res.status(405).end()
  }
}