import { prisma } from '../../../lib/prisma'
import bcrypt from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })

  const hashed = await bcrypt.hash(password, 10)

  try {
    const user = await prisma.user.create({
      data: { email, password: hashed },
      select: { id: true, email: true },
    })
    res.status(201).json({ user })
  } catch (e) {
    res.status(400).json({ error: 'User already exists' })
  }
}