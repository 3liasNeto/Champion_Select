import prisma from '../lib/prisma'
export const resolvers = {
  Query: {
    champions: () => {
      return prisma.champions.findMany()
    },
    runesRecommendations: () => {
      return prisma.runesRecommendations.findMany()
    },
    runes: () => {
      return prisma.runes.findMany()
    }
  },
}