import { builder } from '../schemaBuilder';

const includeNodeSendBombAction = () => {
  builder.prismaNode('SendBombAction', {
    findUnique: (id) => ({ id }),
    id: { resolve: (action) => action.id },
    authScopes: {
      public: true,
    },
    fields: (t) => ({
      town: t.relation('town'),
      sender: t.relation('sender'),
      action: t.relation('action'),
    }),
  });
};

export default includeNodeSendBombAction;
