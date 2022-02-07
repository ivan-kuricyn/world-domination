import { WDSchemaBuilder } from '../schemaBuilder';

const includeNodeTownLevel = (builder: WDSchemaBuilder) => {
  builder.prismaNode('Town', {
    findUnique: (id) => ({ id }),
    id: { resolve: (townLevel) => townLevel.id },
    authScopes: {
      public: true,
    },
    fields: (t) => ({
      name: t.exposeString('name'),
      townLevel: t.relation('townLevel'),
      shield: t.exposeBoolean('shield'),
      destroyed: t.exposeBoolean('destroyed'),
      economicDepositActions: t.relation('economicDepositActions'),
      shieldCreationActions: t.relation('shieldCreationActions'),
      sendBombActions: t.relation('sendBombActions'),
    }),
  });
};

export default includeNodeTownLevel;
