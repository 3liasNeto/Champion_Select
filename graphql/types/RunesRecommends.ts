import { Prisma } from "@prisma/client";
import { builder } from "../builder";

builder.prismaObject('RunesRecommendations', {
    fields: (t) => ({
      id: t.exposeID('id'),
      championID: t.exposeInt('championId'),
      mapId : t.exposeString('mapId'),
      position: t.exposeString('position'),
      perkIds: t.exposeIntList('perkIds'),
      spellIDS: t.exposeIntList('summonerSpellIds'),
      perkStyleID : t.exposeInt('primaryPerkStyleId'),
    })
  })

  builder.queryField('runesRecommends', (t) =>
    t.prismaConnection({
      type: 'RunesRecommendations',
      cursor: 'id',
      resolve: (query, _parent, _args, _ctx, _info) =>
        prisma.runesRecommendations.findMany({ ...query })
    })
  )
