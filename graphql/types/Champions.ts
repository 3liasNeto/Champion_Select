import { Prisma } from "@prisma/client";
import { builder } from "../builder";

builder.prismaObject('Champions', {
    fields: (t) => ({
      id: t.exposeID('id'),
      name: t.exposeString('name'),
      image: t.exposeString('image'),
      runes : t.relation('runesRecommends'),
    })
  })

  builder.queryField('champions', (t) =>
    t.prismaConnection({
      type: 'Champions',
      cursor: 'id',
      resolve: (query, _parent, _args, _ctx, _info) =>
        prisma.champions.findMany({ ...query })
    })
  )


  builder.mutationField('findChampion', (t) =>
    t.prismaField({
      type: ['Champions'],
      nullable: true,
      
      args: {
        name: t.arg.string({ required: true }),
        order: t.arg.string({ defaultValue: 'asc'}),
        lane: t.arg.string({defaultValue : ''})
      },
      resolve: async (query, _parent, _args, _ctx, _infos) => {
        const { name, order, lane } = _args;
        const laneVerify = lane === 'JG' ? 'JUNGLE' : lane === 'ADC' ? "BOTTOM" : lane === 'SUP' ? 'UTILITY' : lane
  
        return await prisma.champions.findMany({
          ...query,
          orderBy: [
            {
              name: order as Prisma.SortOrder
            }
          ],
          where: {
            name: {
              contains: name,
              mode: "insensitive"
            },
            runesRecommends: {
              some: {
                position : {
                  contains: laneVerify!,
                  mode: 'insensitive'
                }
              }
            }
          }
        });
      }
    })
  );
  
