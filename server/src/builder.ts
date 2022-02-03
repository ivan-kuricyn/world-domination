import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import RelayPlugin from '@pothos/plugin-relay';
import PrismaTypes from '../prisma/generated';
import { db } from './db';

export const builder = new SchemaBuilder<{ PrismaTypes: PrismaTypes }>({
  plugins: [PrismaPlugin, RelayPlugin],
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'String',
    encodeGlobalID: (typename, id) =>
      Buffer.from(`${typename}\n${id}`).toString('base64'),
    decodeGlobalID: (globalId: string) => {
      const [typename, id] = Buffer.from(globalId, 'base64')
        .toString('ascii')
        .split('\n');
      return { typename, id };
    },
  },
  prisma: {
    client: db,
  },
});
