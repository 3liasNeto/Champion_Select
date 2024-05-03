import { Prisma } from "@prisma/client";
import { builder } from "../builder";

builder.prismaObject('Runes', {
    fields: (t) => ({
      id: t.exposeID('id'),
      runeID : t.exposeIntList('runeId'),
      name: t.exposeString('name'),
      image: t.exposeString('iconUrl'),
      shortDescription: t.exposeString('shortDesc'),
      longDescription: t.exposeString('longDesc'),
      description: t.exposeString('description'),
      tooltip: t.exposeString('tooltip'),
      endGameStats : t.exposeStringList('endOfGameStats'),
      recommendations : t.exposeStringList('recommendations'),

    })
  })

  builder.queryField('runes', (t) =>
    t.prismaConnection({
      type: 'Runes',
      cursor: 'id',
      resolve: (query, _parent, _args, _ctx, _info) =>
        prisma.runes.findMany({ ...query })
    })
  )

  builder.mutationField('findRunes', (t) =>
    t.prismaField({
      type: ['Runes'],
      nullable: true,
      
      args: {
        name: t.arg.intList({ required: true }),
      },
      resolve: async (query, _parent, _args, _ctx, _infos) => {
        const { name } = _args;
  
        return await prisma.runes.findMany({
          ...query,
          where: {
            runeId: {
              hasSome: name
            }
          }
        });
      }
    })
  );