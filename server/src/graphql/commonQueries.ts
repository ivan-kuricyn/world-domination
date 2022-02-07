import { db } from '../database/db';
import { superpollingEvent } from './commonSubscriptions';
import { WDSchemaBuilder } from './schemaBuilder';

const includeCommonQueries = (builder: WDSchemaBuilder) => {
  builder.queryType({
    fields: (t) => ({
      users: t.prismaConnection({
        authScopes: {
          public: true,
        },
        type: 'User',
        cursor: 'id',
        resolve: async (query, _, __, ctx) => {
          superpollingEvent(ctx, 'qwe');
          return db.user.findMany({
            ...query,
          });
        },
      }),
      games: t.prismaConnection({
        authScopes: {
          public: true,
        },
        type: 'Game',
        cursor: 'id',
        resolve: async (query) => {
          return db.game.findMany({
            ...query,
          });
        },
      }),
    }),
  });
};

export default includeCommonQueries;
