import { prisma } from '../lib/prisma'

async function main() {
  await prisma.court.createMany({
    data: [
      { name: 'Court 1' },
      { name: 'Court 2' },
      { name: 'Court 3' }
    ],
    skipDuplicates: true,
  })
  console.log('Courts seeded!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })