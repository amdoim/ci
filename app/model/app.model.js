const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient({
    log: ['warn', 'error'],
  })

export default prisma