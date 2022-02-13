import { builder } from '../schemaBuilder';

const includeNodeTeamRoom = () => {
  builder.prismaNode('TeamRoom', {
    findUnique: (id) => ({ id }),
    id: { resolve: (teamRoom) => teamRoom.id },
    authScopes: {
      public: true,
    },
    fields: (t) => ({
      team: t.relation('team'),
      gues: t.relation('guest'),
    }),
  });
};

export default includeNodeTeamRoom;
